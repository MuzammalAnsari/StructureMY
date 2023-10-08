import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiUser,
    HiBookOpen,
} from 'react-icons/hi'
import { IoPencilOutline } from 'react-icons/io5'

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'students',
        label: 'Students',
        path: '/Students',
        icon: <HiUser />
    },
    {
        key: 'courses',
        label: 'Courses',
        path: '/courses',
        icon: <HiBookOpen />
    },
    {
        key: 'attendance',
        label: 'Attendance',
        path: '/attendance',
        icon: <IoPencilOutline />
    },

]
