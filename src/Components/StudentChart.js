import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { firestore } from 'Config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function EnrollmentChart() {
    const [enrollmentData, setEnrollmentData] = useState([]);

    useEffect(() => {
        fetchEnrollmentData();
    }, []);
    <EnrollmentChart
        enrollmentData={[
            { name: 'Jan', StudentEnrollment: 20, CourseEnrollment: 10 },
            { name: 'Feb', StudentEnrollment: 25, CourseEnrollment: 12 },
            // Add more data points as needed
        ]}
    />

    const fetchEnrollmentData = async () => {
        try {
            const enrollmentsRef = collection(firestore, 'enrollments');
            const querySnapshot = await getDocs(enrollmentsRef);

            const enrollments = [];
            querySnapshot.forEach((doc) => {
                enrollments.push({ id: doc.id, ...doc.data() });
            });

            // Process your enrollment data here to structure it month-wise
            const monthlyData = groupEnrollmentsByMonth(enrollments);

            setEnrollmentData(monthlyData);
        } catch (error) {
            console.error('Error fetching enrollment data: ', error);
        }
    };

    const groupEnrollmentsByMonth = (enrollments) => {
        // Assuming enrollments have a "date" field
        const groupedData = {};

        enrollments.forEach((enrollment) => {
            const date = new Date(enrollment.date);
            const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

            if (!groupedData[monthYear]) {
                groupedData[monthYear] = {
                    name: monthYear,
                    StudentEnrollment: 0,
                    CourseEnrollment: 0,
                };
            }

            // Assuming you have properties like "isStudentEnrollment" and "isCourseEnrollment" to differentiate
            if (enrollment.isStudentEnrollment) {
                groupedData[monthYear].StudentEnrollment++;
            } else if (enrollment.isCourseEnrollment) {
                groupedData[monthYear].CourseEnrollment++;
            }
        });

        return Object.values(groupedData);
    };

    return (
        <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-medium">Enrollment Statistics</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={enrollmentData}
                        margin={{
                            top: 20,
                            right: 10,
                            left: -10,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="StudentEnrollment" fill="#0ea5e9" name="Student Enrollment" />
                        <Bar dataKey="CourseEnrollment" fill="#ea580c" name="Course Enrollment" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
