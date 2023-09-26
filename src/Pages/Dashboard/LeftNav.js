import React from 'react';
import { Link } from 'react-router-dom';

const LeftNav = () => {
    return (
        <div className="bg-gray-800 text-white w-1/4 h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <ul>
                <li className="mb-2">
                    <Link to="/">Home</Link>
                </li>
                <li className="mb-2">
                    <Link to="/dashboard/messages">Messages</Link>
                </li>
                <li className="mb-2">
                    <Link to="/dashboard/orders">Orders</Link>
                </li>
            </ul>
        </div>
    );
};

export default LeftNav;
