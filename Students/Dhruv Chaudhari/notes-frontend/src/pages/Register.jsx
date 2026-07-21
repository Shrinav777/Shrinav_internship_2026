import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/AuthService';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [validationError, setValidationError] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        setValidationError('');
        setError('');
    };

    const validateForm = () => {
        if (!formData.fullName.trim() || !formData.email.trim() || !formData.password || !formData.confirmPassword) {
            setValidationError('All fields are required.');
            return false;
        }

        // Email validity basic regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            setValidationError('Please enter a valid email address.');
            return false;
        }

        if (formData.password.length < 6) {
            setValidationError('Password must be at least 6 characters.');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setValidationError('Password and Confirm Password must match.');
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

            await authService.register(
                formData.fullName.trim(),
                formData.email.trim(),
                formData.password
            );

            setSuccessMessage('Account registered successfully! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (err) {
            console.error('Registration error:', err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Registration failed. Please check your network connection.');
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
                            <i className="bi bi-person-plus fs-2"></i>
                        </span>
                        <h2 className="fw-bold text-body-emphasis">Create Account</h2>
                        <p className="text-secondary small">Start managing your personal workspace</p>
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
                        {/* Name */}
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                className="form-control"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                            <label htmlFor="fullName">Full Name</label>
                        </div>

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
                            <label htmlFor="email">Email Address</label>
                        </div>

                        {/* Password */}
                        <div className="form-floating mb-3 position-relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                className="form-control pe-5"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                            <label htmlFor="password">Password (min 6 characters)</label>
                            <button
                                type="button"
                                className="btn border-0 position-absolute end-0 top-50 translate-middle-y text-secondary z-3"
                                style={{
                                    padding: '0.75rem 1rem',
                                    transition: 'color 0.15s ease-in-out',
                                    background: 'transparent'
                                }}
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#0d6efd';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = '#6c757d';
                                }}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} fs-5`}></i>
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
                            <label htmlFor="confirmPassword">Confirm Password</label>
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
                                    Registering...
                                </>
                            ) : (
                                'Register'
                            )}
                        </button>

                        {/* Login Link */}
                        <div className="text-center">
                            <span className="text-secondary small">Already have an account? </span>
                            <Link to="/login" className="text-primary text-decoration-none small fw-bold">
                                Sign In
                            </Link>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Register;
