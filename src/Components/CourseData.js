import { firestore } from 'Config/firebase';
import { message } from 'antd';
import { doc, deleteDoc, collection, getDocs, setDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { Edit } from 'react-feather';
import { IoTrashBinOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function CourseData({ onCourseCountChange }) {
    const navigate = useNavigate();
    const [isFormVisible, setFormVisible] = useState(false);
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        course_code: '',
        course_name: '',
        course_description: '',
    });

    const toggleFormVisibility = () => {
        setFormVisible(!isFormVisible);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const coursesRef = collection(firestore, 'courses');
            const querySnapshot = await getDocs(coursesRef);

            const coursesData = [];
            querySnapshot.forEach((doc) => {
                coursesData.push({ id: doc.id, ...doc.data() });
            });

            setCourses(coursesData);
            onCourseCountChange(coursesData.length);
        } catch (error) {
            console.error('Error fetching courses: ', error);
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            id: Math.random().toString(36).slice(2),
        };

        // Add a new document to 'courses' collection
        try {
            await setDoc(doc(collection(firestore, 'courses'), data.id), data);
            setCourses([...courses, data]);
            message.success('Course is added successfully');
        } catch (error) {
            console.error('Error adding course document: ', error);
            message.error('Failed to add course. Please try again.');
        }

        setFormData({
            course_code: '',
            course_name: '',
            course_description: '',
        });

        toggleFormVisibility();
    };

    const handleDeleteCourse = async (id) => {
        try {
            // Delete a document from 'courses' collection
            await deleteDoc(doc(collection(firestore, 'courses'), id));
            const updatedCourses = courses.filter((course) => course.id !== id);
            setCourses(updatedCourses);
            message.success('Course is deleted successfully');
        } catch (error) {
            console.error('Error deleting course document: ', error);
            message.error('Failed to delete course. Please try again.');
        }
    };

    const handleEditCourse = (id) => {
        navigate(`/updatecourse/${id}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <div className="flex justify-between">
                <strong className="text-gray-700 font-medium text-3xl">Courses</strong>
                <button className="bg-blue-500 p-2 rounded" onClick={toggleFormVisibility}>
                    Add Course
                </button>
            </div>

            {isFormVisible && (
                <div className="mt-3">
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label htmlFor="course_code" className="block text-gray-700 text-sm font-bold mb-2">
                                Course Code
                            </label>
                            <input
                                type="text"
                                id="course_code"
                                name="course_code"
                                value={formData.course_code}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Course Code"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="course_name" className="block text-gray-700 text-sm font-bold mb-2">
                                Course Name
                            </label>
                            <input
                                type="text"
                                id="course_name"
                                name="course_name"
                                value={formData.course_name}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Course Name"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="course_description" className="block text-gray-700 text-sm font-bold mb-2">
                                Course Description
                            </label>
                            <textarea
                                id="course_description"
                                name="course_description"
                                value={formData.course_description}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Course Description"
                                rows="4"
                                required
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="border-x border-gray-200 rounded-sm mt-3">
                <table className="w-full text-gray-700">
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Course Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="py-2">
                        {courses.map((course) => (
                            <tr key={course.id} className="border text-center py-2">
                                <td>{course.course_code}</td>
                                <td>{course.course_name}</td>
                                <td>{course.course_description}</td>
                                <td>
                                    <button onClick={() => handleEditCourse(course.id)} className="text-blue-500 mx-3">
                                        <Edit />
                                    </button>
                                    <button onClick={() => handleDeleteCourse(course.id)} className="text-red-500">
                                        <IoTrashBinOutline className='text-2xl' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
