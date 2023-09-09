import React from 'react'
import { Route, Routes } from 'react-router-dom'


import Home from "./Home"
import About from "./About"

import Header from 'Components/Header'
import Footer from 'Components/Footer'

export default function Index() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
            <Footer />
        </>
    )
}
