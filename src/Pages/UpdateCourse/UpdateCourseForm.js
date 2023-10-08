import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { firestore } from 'Config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function UpdateCourseForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        course_code: '',
        course_name: '',
        course_description: '',
    });

    useEffect(() => {
        fetchCourseData();
    }, []);

    const fetchCourseData = async () => {
        try {
            const courseDocRef = doc(firestore, 'courses', id);
            const courseDocSnapshot = await getDoc(courseDocRef);

            if (courseDocSnapshot.exists()) {
                const courseData = courseDocSnapshot.data();
                // Set the initial state of formData with existing data
                setFormData(courseData);
            } else {
                console.error('Course document does not exist.');
                // Handle error or navigate back to the course list page
                navigate('/courses');
            }
        } catch (error) {
            console.error('Error fetching course data: ', error);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update the course document in Firestore
            await updateDoc(doc(firestore, 'courses', id), formData);
            // Navigate back to the course list page after successful update
            navigate('/courses');
        } catch (error) {
            console.error('Error updating course document: ', error);
            // Handle the error, display a message, or take appropriate action
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium text-3xl">Edit Course</strong>

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
    );
}
