import React, { useState, useEffect } from 'react';
import StudentsData from 'Components/StudentsData';
import CourseData from 'Components/CourseData';
import DashboardStatsGrid from 'Components/DashboardStatsGrid';
import EnrollmentChart from 'Components/StudentChart';

export default function Dashboard() {
    const [studentCount, setStudentCount] = useState(0);
    const [courseCount, setCourseCount] = useState(0);

    useEffect(() => {
        // Update the counts when student or course data changes
        // You can use this approach if you want real-time updates
    }, [studentCount, courseCount]);

    return (
        <div className="flex flex-col gap-4">
            <DashboardStatsGrid studentCount={studentCount} courseCount={courseCount} />
            <div className="flex flex-row gap-4 w-full">
                <EnrollmentChart />
            </div>
            <div className="hidden">
                <StudentsData onStudentCountChange={setStudentCount} />
                <CourseData onCourseCountChange={setCourseCount} />
            </div>
        </div>
    );
}
