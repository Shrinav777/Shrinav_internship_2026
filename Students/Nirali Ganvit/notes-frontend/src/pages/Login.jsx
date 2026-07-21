import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/AuthService';
import { useAuth } from '../App';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [validationError, setValidationError] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        setValidationError('');
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic frontend verification
        if (!formData.email.trim() || !formData.password.trim()) {
            setValidationError('Email and password are required');
            return;
        }

        try {
            setLoading(true);
            setError('');

            // Login user via API service helper
            const userData = await authService.login(formData.email.trim(), formData.password);

            // Success: Update context (saves to storage & sets state)
            login(userData);

            // Redirect User to notes dashboard panel
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            if (err.response && err.response.status === 401) {
                setError('Invalid email or password.');
            } else if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Invalid email or password.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100 py-5">
            <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: '450px', width: '100%' }}>
                <div className="card-body">

                    {/* Header */}
                    <div className="text-center mb-4">
                        <span className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary p-3 mb-3">
                            <i className="bi bi-journal-text fs-2"></i>
                        </span>
                        <h2 className="fw-bold text-body-emphasis">Welcome Back</h2>
                        <p className="text-secondary small">Please enter your credentials to login</p>
                    </div>

                    {/* Alerts */}
                    {(validationError || error) && (
                        <div className="alert alert-danger border-0 rounded-3 d-flex align-items-center gap-2 mb-3" role="alert" style={{ fontSize: '0.85rem' }}>
                            <i className="bi bi-exclamation-triangle-fill fs-5"></i>
                            <div>{validationError || error}</div>
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
                            <label htmlFor="password">Password</label>
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

                        {/* Forgot Password link */}
                        <div className="text-end mb-4">
                            <Link to="/forgot-password" className="text-primary text-decoration-none small fw-semibold">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Sign in Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-100 rounded-pill py-2.5 fw-bold mb-3 d-flex align-items-center justify-content-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Signing In...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>

                        {/* Register Link */}
                        <div className="text-center">
                            <span className="text-secondary small">Don't have an account? </span>
                            <Link to="/register" className="text-primary text-decoration-none small fw-bold">
                                Create Account
                            </Link>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;
