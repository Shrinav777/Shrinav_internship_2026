import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import noteService from '../services/NoteService';
import NoteCard from '../components/NoteCard';
import SearchBar from '../components/SearchBar';
import DeleteModal from '../components/DeleteModal';
import Loader from '../components/Loader';

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Search and filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('newest');
    const [viewMode, setViewMode] = useState('grid');

    // Delete modal states
    const [deleteModal, setDeleteModal] = useState({ show: false, note: null });

    // Fetch notes on component mount
    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const data = await noteService.getAllNotes();
            setNotes(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching notes:', err);
            setError('Could not fetch notes. Please check if the backend server is running.');
        } finally {
            setLoading(false);
        }
    };

    // Toggle favorite state
    const handleFavorite = async (id) => {
        try {
            const updatedNote = await noteService.favoriteNote(id);
            setNotes(prevNotes =>
                prevNotes.map(note => note.id === id ? updatedNote : note)
            );
        } catch (err) {
            console.error('Error favoriting note:', err);
        }
    };

    // Toggle archive state
    const handleArchive = async (id) => {
        try {
            const updatedNote = await noteService.archiveNote(id);
            setNotes(prevNotes =>
                prevNotes.map(note => note.id === id ? updatedNote : note)
            );
        } catch (err) {
            console.error('Error archiving note:', err);
        }
    };

    // Delete trigger
    const handleDeleteClick = (note) => {
        setDeleteModal({ show: true, note });
    };

    // Delete confirm
    const handleDeleteConfirm = async () => {
        const { note } = deleteModal;
        if (!note) return;
        try {
            await noteService.deleteNote(note.id);
            setNotes(prevNotes => prevNotes.filter(n => n.id !== note.id));
            setDeleteModal({ show: false, note: null });
        } catch (err) {
            console.error('Error deleting note:', err);
        }
    };

    // Calculate stats
    const totalActiveNotes = notes.filter(n => !n.archived).length;
    const totalFavorites = notes.filter(n => n.favorite && !n.archived).length;
    const totalArchived = notes.filter(n => n.archived).length;

    // Filter active notes
    let filteredNotes = notes.filter(n => !n.archived);

    // Apply category filter (case-insensitive block)
    if (selectedCategory !== 'All') {
        filteredNotes = filteredNotes.filter(n => n.category && n.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Apply search query filter
    if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        filteredNotes = filteredNotes.filter(n =>
            (n.title && n.title.toLowerCase().includes(query)) ||
            (n.content && n.content.toLowerCase().includes(query)) ||
            (n.category && n.category.toLowerCase().includes(query))
        );
    }

    // Sort and filter active notes list
    const sortedNotes = [...filteredNotes].sort((a, b) => {
        if (sortBy === 'newest') {
            const dateA = new Date(a.updatedAt || a.createdAt);
            const dateB = new Date(b.updatedAt || b.createdAt);
            return dateB - dateA;
        } else if (sortBy === 'oldest') {
            const dateA = new Date(a.updatedAt || a.createdAt);
            const dateB = new Date(b.updatedAt || b.createdAt);
            return dateA - dateB;
        } else if (sortBy === 'az') {
            const titleA = (a.title || '').trim().toLowerCase();
            const titleB = (b.title || '').trim().toLowerCase();
            return titleA.localeCompare(titleB);
        } else if (sortBy === 'za') {
            const titleA = (a.title || '').trim().toLowerCase();
            const titleB = (b.title || '').trim().toLowerCase();
            return titleB.localeCompare(titleA);
        }
        return 0;
    });

    if (loading) {
        return <Loader message="Fetching notes from MongoDB..." />;
    }

    return (
        <div className="container-fluid p-0">
            {/* Header section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-body-emphasis m-0">Dashboard</h2>
                    <p className="text-secondary small">Manage and organize your personal notes collection.</p>
                </div>
                <Link to="/add-note" className="btn btn-primary rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 shadow-sm">
                    <i className="bi bi-plus-lg"></i>
                    Add Note
                </Link>
            </div>

            {/* Error banner */}
            {error && (
                <div className="alert alert-danger border-0 rounded-3 shadow-none d-flex align-items-center gap-2 mb-4" role="alert">
                    <i className="bi bi-exclamation-octagon-fill fs-5"></i>
                    <div>{error}</div>
                </div>
            )}

            {/* Statistics Cards */}
            <div className="row g-4 mb-4">
                <div className="col-12 col-sm-4">
                    <div className="card border-0 bg-primary-subtle text-primary-emphasis rounded-3 h-100">
                        <div className="card-body p-4 d-flex align-items-center justify-content-between">
                            <div>
                                <h6 className="card-title fw-bold text-secondary text-uppercase mb-1 small" style={{ letterSpacing: '0.5px' }}>Total Notes</h6>
                                <h2 className="m-0 fw-bold">{totalActiveNotes}</h2>
                            </div>
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                                <i className="bi bi-file-earmark-text fs-3"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-4">
                    <div className="card border-0 bg-warning-subtle text-warning-emphasis rounded-3 h-100">
                        <div className="card-body p-4 d-flex align-items-center justify-content-between">
                            <div>
                                <h6 className="card-title fw-bold text-secondary text-uppercase mb-1 small" style={{ letterSpacing: '0.5px' }}>Favorites</h6>
                                <h2 className="m-0 fw-bold">{totalFavorites}</h2>
                            </div>
                            <div className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                                <i className="bi bi-star-fill fs-3 text-white"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-4">
                    <div className="card border-0 bg-secondary-subtle text-secondary-emphasis rounded-3 h-100">
                        <div className="card-body p-4 d-flex align-items-center justify-content-between">
                            <div>
                                <h6 className="card-title fw-bold text-secondary text-uppercase mb-1 small" style={{ letterSpacing: '0.5px' }}>Archived</h6>
                                <h2 className="m-0 fw-bold">{totalArchived}</h2>
                            </div>
                            <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                                <i className="bi bi-archive-fill fs-3"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter and Search Actions Toolbar */}
            <div className="card border-0 shadow-sm p-3 mb-4 bg-body rounded-3">
                <div className="row g-3 align-items-center">
                    {/* Search Input */}
                    <div className="col-12 col-lg">
                        <div className="input-group">
                            <span className="input-group-text bg-transparent border-end-0 text-muted rounded-start-pill py-2.5">
                                <i className="bi bi-search"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control border-start-0 rounded-end-pill py-2.5 shadow-none"
                                placeholder="Search notes by title or content..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="col-12 col-md-4 col-lg-3">
                        <div className="input-group">
                            <span className="input-group-text bg-transparent border-end-0 text-secondary rounded-start-pill py-2.5">
                                <i className="bi bi-folder2-open"></i>
                            </span>
                            <select
                                className="form-select border-start-0 rounded-end-pill py-2.5 shadow-none"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="All">All Categories</option>
                                <option value="General">General</option>
                                <option value="Work">Work</option>
                                <option value="Study">Study</option>
                                <option value="Personal">Personal</option>
                                <option value="Health">Health</option>
                                <option value="Programming">Programming</option>
                                <option value="Ideas">Ideas</option>
                                <option value="Tasks">Tasks</option>
                            </select>
                        </div>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="col-12 col-md-4 col-lg-3">
                        <div className="input-group">
                            <span className="input-group-text bg-transparent border-end-0 text-secondary rounded-start-pill py-2.5">
                                <i className="bi bi-arrow-down-up"></i>
                            </span>
                            <select
                                className="form-select border-start-0 rounded-end-pill py-2.5 shadow-none"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="az">A-Z</option>
                                <option value="za">Z-A</option>
                            </select>
                        </div>
                    </div>

                    {/* View Switcher Toggle */}
                    <div className="col-12 col-md-4 col-lg-auto d-flex justify-content-center justify-content-md-end">
                        <div className="btn-group p-1 bg-light rounded-pill border" role="group" aria-label="Layout view mode switch">
                            <button
                                type="button"
                                className={`btn rounded-pill px-3 py-1.5 border-0 transition d-flex align-items-center gap-1 ${viewMode === 'grid' ? 'btn-primary text-white shadow-sm' : 'btn-link text-secondary text-decoration-none'}`}
                                onClick={() => setViewMode('grid')}
                                style={{ fontSize: '0.9rem' }}
                                aria-label="Grid View"
                            >
                                <i className="bi bi-grid-3x3-gap-fill"></i>
                            </button>
                            <button
                                type="button"
                                className={`btn rounded-pill px-3 py-1.5 border-0 transition d-flex align-items-center gap-1 ${viewMode === 'list' ? 'btn-primary text-white shadow-sm' : 'btn-link text-secondary text-decoration-none'}`}
                                onClick={() => setViewMode('list')}
                                style={{ fontSize: '0.9rem' }}
                                aria-label="List View"
                            >
                                <i className="bi bi-list-ul"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Notes Listing dynamic wrapper */}
            <h4 className="fw-bold mb-3 text-body-emphasis">Recent Notes</h4>
            {sortedNotes.length === 0 ? (
                <div className="text-center py-5 border rounded-3 bg-body-tertiary">
                    <i className="bi bi-journal-x fs-1 text-muted mb-3 d-block"></i>
                    <h5 className="fw-bold text-secondary">No Notes Found</h5>
                    <p className="text-muted small">
                        {notes.length === 0
                            ? "You don't have any notes yet. Click 'Add Note' to create your first note!"
                            : "No active notes match your query or category filters."}
                    </p>
                    {notes.length === 0 && (
                        <Link to="/add-note" className="btn btn-primary rounded-pill px-4 mt-3">
                            Create First Note
                        </Link>
                    )}
                </div>
            ) : (
                <div className={viewMode === 'grid' ? 'row g-4' : 'row g-3'}>
                    {sortedNotes.map((note) => (
                        <div key={note.id} className={viewMode === 'grid' ? 'col-12 col-md-6 col-lg-4 animate-fade-in' : 'col-12 animate-fade-in'}>
                            <NoteCard
                                note={note}
                                onFavorite={handleFavorite}
                                onArchive={handleArchive}
                                onDelete={handleDeleteClick}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Modal Confirmation dialog */}
            <DeleteModal
                show={deleteModal.show}
                noteTitle={deleteModal.note?.title || ''}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteModal({ show: false, note: null })}
            />
        </div>
    );
};

export default Dashboard;
