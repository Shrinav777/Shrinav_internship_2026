import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100 bg-body">
            <Navbar />
            <div className="container-fluid flex-grow-1 p-0">
                <div className="d-flex">
                    {/* Sidebar left navigation pane (hidden on mobile, visible on medium screens and above) */}
                    <div className="d-none d-md-block flex-shrink-0">
                        <Sidebar />
                    </div>
                    {/* Main content pane where pages are dynamically loaded */}
                    <main className="flex-grow-1 p-4" style={{ minWidth: 0 }}>
                        <Outlet />
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
