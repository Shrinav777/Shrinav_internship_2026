import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button 
            className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-2 border-0"
            onClick={toggleTheme}
            style={{ width: '40px', height: '40px' }}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
            {theme === 'light' ? (
                <i className="bi bi-moon-stars-fill fs-5 text-dark"></i>
            ) : (
                <i className="bi bi-sun-fill fs-5 text-warning"></i>
            )}
        </button>
    );
};

export default ThemeToggle;
