import React from 'react';
import { IoPieChart, IoPeople } from 'react-icons/io5';

export default function DashboardStatsGrid({ studentCount, courseCount }) {
    return (
        <div className="flex gap-4">
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                    <IoPeople className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Students</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{studentCount}</strong>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                    <IoPieChart className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Courses</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{courseCount}</strong>
                    </div>
                </div>
            </BoxWrapper>
        </div>
    );
}

function BoxWrapper({ children }) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>;
}
