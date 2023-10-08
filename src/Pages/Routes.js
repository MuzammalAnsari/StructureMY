import { Routes, Route } from 'react-router-dom'
import Layout from 'Components/shared/Layout'
import Dashboard from './Dashboard/Dashboard'
import UpdateStudent from './UpdateStudent'
import UpdateCourse from './UpdateCourse'
import Students from './Dashboard/Students'
import Courses from './Dashboard/Courses'
import Attendance from './Dashboard/Attendance'

function Index() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="students" element={<Students />} />
                    <Route path="courses" element={<Courses />} />
                    <Route path="attendance" element={<Attendance />} />
                    <Route path="updatecourse/:id" element={<UpdateCourse />} />
                    <Route path="updatestudent/:id" element={<UpdateStudent />} />
                </Route>
            </Routes>
        </>
    )
}

export default Index