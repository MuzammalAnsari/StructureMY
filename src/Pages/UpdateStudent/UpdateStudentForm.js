import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { firestore } from 'Config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function UpdateStudentForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        student_name: '',
        student_address: '',
        current_status: 'Present',
    });

    useEffect(() => {
        fetchStudentData();
    }, []);

    const fetchStudentData = async () => {
        try {
            const studentDocRef = doc(firestore, 'students', id);
            const studentDocSnapshot = await getDoc(studentDocRef);

            if (studentDocSnapshot.exists()) {
                const studentData = studentDocSnapshot.data();
                // Set the initial state of formData with existing data
                setFormData(studentData);
            } else {
                console.error('Student document does not exist.');
                // Handle error or navigate back to the student list page
                navigate('/students');
            }
        } catch (error) {
            console.error('Error fetching student data: ', error);
        }
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update the student document in Firestore
            await updateDoc(doc(firestore, 'students', id), formData);
            // Navigate back to the student list page after successful update
            navigate('/students');
        } catch (error) {
            console.error('Error updating student document: ', error);
            // Handle the error, display a message, or take appropriate action
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium text-3xl">Edit Student</strong>

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

                <div className="mb-4">
                    <label htmlFor="current_status" className="block text-gray-700 text-sm font-bold mb-2">
                        Student Status
                    </label>
                    <select
                        id="current_status"
                        name="current_status"
                        value={formData.current_status}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="On Leave">On Leave</option>
                    </select>
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
