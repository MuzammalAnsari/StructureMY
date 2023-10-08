import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';
import { firestore } from 'Config/firebase';
import { message } from 'antd';

export default function Attendance() {
    const [students, setStudents] = useState([]);

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
        } catch (error) {
            console.error('Error fetching students: ', error);
        }
    };

    const markAttendance = async (studentId, status) => {
        try {
            // Update the status of a student
            const studentDocRef = doc(firestore, 'students', studentId);
            await updateDoc(studentDocRef, {
                status: status,
            });

            // Update the local state
            const updatedStudents = students.map((student) =>
                student.id === studentId ? { ...student, status: status } : student
            );
            setStudents(updatedStudents);
        } catch (error) {
            console.error('Error updating student attendance: ', error);
        }
    };

    const pushAttendanceToFirestore = async () => {
        try {
            const attendanceData = students.map((student) => ({
                student_id: student.id,
                student_name: student.student_name,
                attendance_status: student.status,
                // You can add more fields as needed
            }));

            // Add the attendance data to the "attendance" collection
            const attendanceRef = collection(firestore, 'attendance');
            await Promise.all(
                attendanceData.map(async (attendance) => {
                    await addDoc(attendanceRef, attendance);
                })
            );
            message.success("Attendance Submitted")
            console.log('Attendance data pushed to Firestore.');
        } catch (error) {
            console.error('Error pushing attendance data to Firestore: ', error);
        }
    };

    return (
        <div className="attendance-container">
            <h1>Attendance</h1>
            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Attendance Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id} className='text-center'>
                            <td>{student.id}</td>
                            <td>{student.student_name}</td>
                            <td>{student.status}</td>
                            <td>
                                <button className='bg-blue-500 p-2 rounded mx-2' onClick={() => markAttendance(student.id, 'present')}>
                                    Present
                                </button>
                                <button className='bg-red-500 p-2 rounded' onClick={() => markAttendance(student.id, 'absent')}>
                                    Absent
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                className='bg-green-500 p-2 rounded mt-4'
                onClick={pushAttendanceToFirestore}
            >
                Submit Attendance
            </button>
        </div>
    );
}
