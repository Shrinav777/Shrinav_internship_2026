import React from 'react';

const Loader = ({ message = 'Loading notes...' }) => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center py-5 my-5 w-100">
            <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-secondary fw-semibold mb-0" style={{ fontSize: '0.95rem' }}>{message}</p>
        </div>
    );
};

export default Loader;
