import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/AuthService';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [validationError, setValidationError] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        setValidationError('');
        setError('');
        setSuccessMessage('');
    };

    const validateForm = () => {
        if (!formData.email.trim() || !formData.newPassword || !formData.confirmPassword) {
            setValidationError('All fields are required.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            setValidationError('Please enter a valid email address.');
            return false;
        }

        if (formData.newPassword.length < 6) {
            setValidationError('Password must be at least 6 characters.');
            return false;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setValidationError('New Password and Confirm Password must match.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            setError('');
            setSuccessMessage('');

            await authService.forgotPassword(formData.email.trim(), formData.newPassword);

            setSuccessMessage('Password updated successfully.');
            setFormData({
                email: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (err) {
            console.error('Password reset error:', err);
            if (err.response && err.response.status === 404) {
                setError('Email not found.');
            } else if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Failed to update password. Please check your network connection.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100 py-5">
            <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: '480px', width: '100%' }}>
                <div className="card-body">

                    {/* Header */}
                    <div className="text-center mb-4">
                        <span className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary p-3 mb-3">
                            <i className="bi bi-shield-lock-fill fs-2"></i>
                        </span>
                        <h2 className="fw-bold text-body-emphasis">Reset Password</h2>
                        <p className="text-secondary small">Enter your email and define a new password</p>
                    </div>

                    {/* Validation/Error Alerts */}
                    {(validationError || error) && (
                        <div className="alert alert-danger border-0 rounded-3 d-flex align-items-center gap-2 mb-3" role="alert" style={{ fontSize: '0.85rem' }}>
                            <i className="bi bi-exclamation-triangle-fill fs-5"></i>
                            <div>{validationError || error}</div>
                        </div>
                    )}

                    {/* Success Alert */}
                    {successMessage && (
                        <div className="alert alert-success border-0 rounded-3 d-flex align-items-center gap-2 mb-3" role="alert" style={{ fontSize: '0.85rem' }}>
                            <i className="bi bi-check-circle-fill fs-5"></i>
                            <div>{successMessage}</div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        {/* Email */}
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                            <label htmlFor="email">Registered Email Address</label>
                        </div>

                        {/* New Password */}
                        <div className="form-floating mb-3 position-relative">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                name="newPassword"
                                id="newPassword"
                                className="form-control pe-5"
                                placeholder="New Password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                            <label htmlFor="newPassword">New Password (min 6 characters)</label>
                            <button
                                type="button"
                                className="btn border-0 position-absolute end-0 top-50 translate-middle-y text-secondary z-3"
                                style={{
                                    padding: '0.75rem 1rem',
                                    transition: 'color 0.15s ease-in-out',
                                    background: 'transparent'
                                }}
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#0d6efd';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = '#6c757d';
                                }}
                                aria-label={showNewPassword ? "Hide password" : "Show password"}
                            >
                                <i className={`bi ${showNewPassword ? 'bi-eye-slash' : 'bi-eye'} fs-5`}></i>
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="form-floating mb-4 position-relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                id="confirmPassword"
                                className="form-control pe-5"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <button
                                type="button"
                                className="btn border-0 position-absolute end-0 top-50 translate-middle-y text-secondary z-3"
                                style={{
                                    padding: '0.75rem 1rem',
                                    transition: 'color 0.15s ease-in-out',
                                    background: 'transparent'
                                }}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#0d6efd';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = '#6c757d';
                                }}
                                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                            >
                                <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'} fs-5`}></i>
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-100 rounded-pill py-2.5 fw-bold mb-3 d-flex align-items-center justify-content-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm role-status me-2" aria-hidden="true"></span>
                                    Updating...
                                </>
                            ) : (
                                'Reset Password'
                            )}
                        </button>

                        {/* Back to Login Link */}
                        <div className="text-center">
                            <Link to="/login" className="text-primary text-decoration-none small fw-bold">
                                Back to Sign In
                            </Link>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
