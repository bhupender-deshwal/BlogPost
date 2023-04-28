import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import {
    Outlet
} from "react-router-dom";

const Dashboard = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Dashboard