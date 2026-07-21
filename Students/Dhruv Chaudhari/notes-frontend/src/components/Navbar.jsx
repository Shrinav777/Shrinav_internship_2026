import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../App';

const Navbar = () => {
    const { user, logout } = useAuth();

    // Get user initials (e.g. "John Doe" -> "JD")
    const getInitials = (name) => {
        if (!name) return 'UN';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <nav className="navbar navbar-expand-lg border-bottom px-4 py-2 sticky-top bg-body-tertiary">
            <div className="container-fluid p-0">
                <Link to="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4 m-0 text-primary text-decoration-none">
                    <i className="bi bi-journal-text fs-3"></i>
                    <span>NotyNotes</span>
                </Link>

                {/* Mobile Toggle Button */}
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1 ms-lg-4">
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/dashboard" className={({ isActive }) => `nav-link px-3 rounded-pill ${isActive ? 'active bg-primary text-white fw-semibold' : 'text-body-emphasis'}`}>
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/notes" className={({ isActive }) => `nav-link px-3 rounded-pill ${isActive ? 'active bg-primary text-white fw-semibold' : 'text-body-emphasis'}`}>
                                        My Notes
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/add-note" className={({ isActive }) => `nav-link px-3 rounded-pill ${isActive ? 'active bg-primary text-white fw-semibold' : 'text-body-emphasis'}`}>
                                        Add Note
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/favorites" className={({ isActive }) => `nav-link px-3 rounded-pill ${isActive ? 'active bg-primary text-white fw-semibold' : 'text-body-emphasis'}`}>
                                        Favorites
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/archive" className={({ isActive }) => `nav-link px-3 rounded-pill ${isActive ? 'active bg-primary text-white fw-semibold' : 'text-body-emphasis'}`}>
                                        Archive
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/login" className={({ isActive }) => `nav-link px-3 rounded-pill ${isActive ? 'active bg-primary text-white fw-semibold' : 'text-body-emphasis'}`}>
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/register" className={({ isActive }) => `nav-link px-3 rounded-pill ${isActive ? 'active bg-primary text-white fw-semibold' : 'text-body-emphasis'}`}>
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                    <div className="d-flex align-items-center gap-3 ms-auto mt-2 mt-lg-0">
                        <ThemeToggle />
                        {user ? (
                            <>
                                <div className="d-none d-md-flex flex-column text-end small">
                                    <span className="fw-semibold text-body">{user.fullName}</span>
                                    <span className="text-secondary" style={{ fontSize: '0.75rem' }}>{user.email}</span>
                                </div>
                                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: '40px', height: '40px' }}>
                                    {getInitials(user.fullName)}
                                </div>
                                <button className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold" onClick={logout}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="text-secondary small">Visitor Workspace</div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
