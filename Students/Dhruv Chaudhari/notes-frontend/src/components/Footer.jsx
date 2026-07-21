import React from 'react';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-body-tertiary border-top text-center text-muted">
            <div className="container">
                <span className="small">&copy; {new Date().getFullYear()} NotyNotes. All rights reserved. Built with React & Spring Boot.</span>
            </div>
        </footer>
    );
};

export default Footer;
