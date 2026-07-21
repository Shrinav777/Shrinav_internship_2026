import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import noteService from '../services/NoteService';
import Loader from '../components/Loader';

const NoteEditorPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        content: '',
        favorite: false,
        archived: false
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (isEditMode) {
            fetchNoteDetails();
        }
    }, [id]);

    const fetchNoteDetails = async () => {
        try {
            setFetching(true);
            const data = await noteService.getNoteById(id);
            setFormData({
                title: data.title || '',
                category: data.category || '',
                content: data.content || '',
                favorite: data.favorite || false,
                archived: data.archived || false
            });
            setError(null);
        } catch (err) {
            console.error('Error fetching note details:', err);
            setError('Could not retrieve the note details. Please verify the ID or try again.');
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        // Clear validation error when typing
        if (validationErrors[name]) {
            setValidationErrors((prev) => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.title.trim()) {
            errors.title = 'Title is required';
        }
        if (!formData.category.trim()) {
            errors.category = 'Please select a category.';
        }
        if (!formData.content.trim()) {
            errors.content = 'Content is required';
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            setError(null);

            if (isEditMode) {
                await noteService.updateNote(id, formData);
                setSuccessMessage('Note updated successfully!');
            } else {
                await noteService.createNote(formData);
                setSuccessMessage('Note created successfully!');
            }

            // Show success message briefly then navigate to /notes
            setTimeout(() => {
                navigate('/notes');
            }, 1000);

        } catch (err) {
            console.error('Error saving note:', err);
            setError('Failed to save the note. Please check backend connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <Loader message="Loading note details..." />;
    }

    return (
        <div className="container-fluid p-0" style={{ maxWidth: '800px' }}>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                    <h2 className="fw-bold text-body-emphasis m-0">
                        {isEditMode ? 'Edit Note' : 'Add New Note'}
                    </h2>
                    <p className="text-secondary small">
                        {isEditMode ? 'Modify your note details below.' : 'Create a brand new note for your workspace.'}
                    </p>
                </div>
                <Link to="/notes" className="btn btn-outline-secondary rounded-pill px-3 py-1.5 fw-semibold d-flex align-items-center gap-2">
                    <i className="bi bi-arrow-left"></i>
                    Back to Notes
                </Link>
            </div>

            {/* Error alerts */}
            {error && (
                <div className="alert alert-danger border-0 rounded-3 d-flex align-items-center gap-2 mb-4" role="alert">
                    <i className="bi bi-exclamation-octagon-fill fs-5"></i>
                    <div>{error}</div>
                </div>
            )}

            {/* Success message alerts */}
            {successMessage && (
                <div className="alert alert-success border-0 rounded-3 d-flex align-items-center gap-2 mb-4" role="alert">
                    <i className="bi bi-check-circle-fill fs-5"></i>
                    <div>{successMessage}</div>
                </div>
            )}

            <div className="card border rounded-3 p-4 shadow-sm bg-body-tertiary">
                <form onSubmit={handleSubmit} noValidate>
                    {/* Title */}
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label fw-semibold">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className={`form-control ${validationErrors.title ? 'is-invalid' : ''}`}
                            placeholder="Enter a descriptive title..."
                            value={formData.title}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        {validationErrors.title && (
                            <div className="invalid-feedback">{validationErrors.title}</div>
                        )}
                    </div>

                    {/* Category */}
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label fw-semibold">Category</label>
                        <select
                            id="category"
                            name="category"
                            className={`form-select ${validationErrors.category ? 'is-invalid' : ''}`}
                            value={formData.category}
                            onChange={handleChange}
                            disabled={loading}
                        >
                            <option value="">Select Category</option>
                            <option value="General">General</option>
                            <option value="Work">Work</option>
                            <option value="Study">Study</option>
                            <option value="Personal">Personal</option>
                            <option value="Health">Health</option>
                            <option value="Programming">Programming</option>
                            <option value="Ideas">Ideas</option>
                            <option value="Tasks">Tasks</option>
                        </select>
                        {validationErrors.category && (
                            <div className="invalid-feedback">{validationErrors.category}</div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                        <label htmlFor="content" className="form-label fw-semibold">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            rows="8"
                            className={`form-control ${validationErrors.content ? 'is-invalid' : ''}`}
                            placeholder="Type details in your note..."
                            value={formData.content}
                            onChange={handleChange}
                            disabled={loading}
                        ></textarea>
                        {validationErrors.content && (
                            <div className="invalid-feedback">{validationErrors.content}</div>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div className="d-flex justify-content-end gap-3 border-top pt-3">
                        <Link to="/notes" className="btn btn-outline-secondary rounded-pill px-4" disabled={loading}>
                            Cancel
                        </Link>
                        <button type="submit" className="btn btn-primary rounded-pill px-4 d-flex align-items-center gap-2" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-save"></i>
                                    Save Note
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoteEditorPage;
