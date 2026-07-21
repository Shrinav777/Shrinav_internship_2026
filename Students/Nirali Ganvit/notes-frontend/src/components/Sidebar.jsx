import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../App';

const Sidebar = () => {
    const { logout } = useAuth();

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary border-end h-100" style={{ width: '240px', minHeight: 'calc(100vh - 62px)' }}>
            <ul className="nav nav-pills flex-column mb-auto gap-2">
                <li className="nav-item">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center gap-3 py-2 px-3 rounded-3 transition ${isActive ? 'active bg-primary shadow-sm text-white' : 'text-body-emphasis hover-bg'}`
                        }
                    >
                        <i className="bi bi-grid-fill fs-5"></i>
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/notes"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center gap-3 py-2 px-3 rounded-3 transition ${isActive ? 'active bg-primary shadow-sm text-white' : 'text-body-emphasis hover-bg'}`
                        }
                    >
                        <i className="bi bi-file-earmark-text fs-5"></i>
                        <span>My Notes</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/add-note"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center gap-3 py-2 px-3 rounded-3 transition ${isActive ? 'active bg-primary shadow-sm text-white' : 'text-body-emphasis hover-bg'}`
                        }
                    >
                        <i className="bi bi-plus-square-fill fs-5"></i>
                        <span>Add Note</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/favorites"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center gap-3 py-2 px-3 rounded-3 transition ${isActive ? 'active bg-primary shadow-sm text-white' : 'text-body-emphasis hover-bg'}`
                        }
                    >
                        <i className="bi bi-star fs-5"></i>
                        <span>Favorites</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/archive"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center gap-3 py-2 px-3 rounded-3 transition ${isActive ? 'active bg-primary shadow-sm text-white' : 'text-body-emphasis hover-bg'}`
                        }
                    >
                        <i className="bi bi-archive fs-5"></i>
                        <span>Archive</span>
                    </NavLink>
                </li>
                <li className="mt-4 pt-3 border-top">
                    <button
                        onClick={logout}
                        className="nav-link d-flex align-items-center gap-3 py-2 px-3 rounded-3 transition text-danger w-100 border-0 bg-transparent hover-bg text-start"
                    >
                        <i className="bi bi-box-arrow-right fs-5"></i>
                        <span>Logout</span>
                    </button>
                </li>
            </ul>

            <div className="card border-0 bg-primary-subtle text-primary-emphasis p-3 rounded-3 shadow-none mt-4">
                <h6 className="fw-bold mb-1 small d-flex align-items-center gap-2">
                    <i className="bi bi-lightbulb-fill text-warning"></i>
                    Did you know?
                </h6>
                <p className="m-0 small text-secondary" style={{ fontSize: '0.8rem' }}>
                    Archiving clean keeps your active notes screen focused while preserving valuable archives.
                </p>
            </div>
        </div>
    );
};

export default Sidebar;
