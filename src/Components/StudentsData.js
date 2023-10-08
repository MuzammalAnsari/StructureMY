import { firestore } from 'Config/firebase';
import { message } from 'antd';
import { doc, deleteDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { Edit } from 'react-feather';
import { IoTrashBinOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function StudentData({ onStudentCountChange }) {
    const navigate = useNavigate();
    const [isFormVisible, setFormVisible] = useState(false);
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        student_name: '',
        student_address: '',
    });

    const toggleFormVisibility = () => {
        setFormVisible(!isFormVisible);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const studentsRef = collection(firestore, 'students');
            const querySnapshot = await getDocs(studentsRef);

            const studentsData = [];
            querySnapshot.forEach((doc) => {
                studentsData.push({ id: doc.id, ...doc.data() });
            });

            setStudents(studentsData);
            onStudentCountChange(studentsData.length);
        } catch (error) {
            console.error('Error fetching students: ', error);
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = { ...formData };

        // Add a new document to 'students' collection
        try {
            const docRef = await addDoc(collection(firestore, 'students'), data);
            const newStudent = { id: docRef.id, ...data };
            setStudents([...students, newStudent]);
            message.success('Student is added successfully');
        } catch (error) {
            console.error('Error adding student document: ', error);
            message.error('Failed to add student. Please try again.');
        }

        setFormData({
            student_name: '',
            student_address: '',
        });

        toggleFormVisibility();
    };

    const handleDeleteStudent = async (id) => {
        try {
            // Delete a document from 'students' collection
            await deleteDoc(doc(collection(firestore, 'students'), id));
            const updatedStudents = students.filter((student) => student.id !== id);
            setStudents(updatedStudents);
            message.success('Student is deleted successfully');
        } catch (error) {
            console.error('Error deleting student document: ', error);
            message.error('Failed to delete student. Please try again.');
        }
    };

    const handleEditStudent = (id) => {
        navigate(`/updatestudent/${id}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <div className="flex justify-between">
                <strong className="text-gray-700 font-medium text-3xl">Students</strong>
                <button className="bg-blue-500 p-2 rounded" onClick={toggleFormVisibility}>
                    Add Student
                </button>
            </div>

            {isFormVisible && (
                <div className="mt-3">
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label htmlFor="student_name" className="block text-gray-700 text-sm font-bold mb-2">
                                Student Name
                            </label>
                            <input
                                type="text"
                                id="student_name"
                                name="student_name"
                                value={formData.student_name}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Student Name"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="student_address" className="block text-gray-700 text-sm font-bold mb-2">
                                Student Address
                            </label>
                            <input
                                type="text"
                                id="student_address"
                                name="student_address"
                                value={formData.student_address}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Student Address"
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
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Student Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="py-2">
                        {students.map((student) => (
                            <tr key={student.id} className="border text-center py-2">
                                <td>{student.id}</td>
                                <td>{student.student_name}</td>
                                <td>{student.student_address}</td>
                                <td>
                                    <button onClick={() => handleEditStudent(student.id)} className="text-blue-500 mx-3">
                                        <Edit />
                                    </button>
                                    <button onClick={() => handleDeleteStudent(student.id)} className="text-red-500">
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
