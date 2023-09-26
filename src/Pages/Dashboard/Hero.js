import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Messages from './Messages';
import Orders from './Orders';
import LeftNav from './LeftNav';

const Hero = () => {
    return (
        <div className="flex">
            <LeftNav />
            <main className="flex-grow p-4 ms-[200px]">
                <Routes>
                    <Route path="/dashboard/messages" element={<Messages />} />
                    <Route path="/dashboard/orders" element={<Orders />} />
                </Routes>
            </main>
        </div>
    );
};

export default Hero;
