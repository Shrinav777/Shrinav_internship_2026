import React, { useState, useEffect } from 'react';
import noteService from '../services/NoteService';
import NoteCard from '../components/NoteCard';
import SearchBar from '../components/SearchBar';
import DeleteModal from '../components/DeleteModal';
import Loader from '../components/Loader';

const Archive = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Search and filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Delete modal states
    const [deleteModal, setDeleteModal] = useState({ show: false, note: null });

    useEffect(() => {
        fetchArchived();
    }, []);

    const fetchArchived = async () => {
        try {
            setLoading(true);
            const data = await noteService.getArchivedNotes();
            setNotes(data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching archived notes:', err);
            setError('Failed to load archived notes. Please verify backend MongoDB connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleFavorite = async (id) => {
        try {
            const updatedNote = await noteService.favoriteNote(id);
            setNotes(prevNotes =>
                prevNotes.map(note => note.id === id ? updatedNote : note)
            );
        } catch (err) {
            console.error('Error toggling favorite:', err);
        }
    };

    const handleArchive = async (id) => {
        try {
            await noteService.archiveNote(id);
            // Since this is the Archive page, toggling un-archive should remove it from the page list
            setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
        } catch (err) {
            console.error('Error toggling archive:', err);
        }
    };

    const handleDeleteClick = (note) => {
        setDeleteModal({ show: true, note });
    };

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

    // Extract dynamic categories list
    const categories = [...new Set(notes.map(n => n.category).filter(Boolean))];

    // Apply filters (only archived notes)
    let filteredNotes = notes.filter(n => n.archived);

    // Apply category filter
    if (selectedCategory !== 'All') {
        filteredNotes = filteredNotes.filter(n => n.category === selectedCategory);
    }

    // Apply search query filter
    if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        filteredNotes = filteredNotes.filter(n =>
            (n.title && n.title.toLowerCase().includes(query)) ||
            (n.content && n.content.toLowerCase().includes(query))
        );
    }

    // Sort by recent updated first
    const sortedNotes = [...filteredNotes].sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.createdAt);
        const dateB = new Date(b.updatedAt || b.createdAt);
        return dateB - dateA;
    });

    if (loading) {
        return <Loader message="Loading your archived notes..." />;
    }

    return (
        <div className="container-fluid p-0">
            {/* Header title */}
            <div className="mb-4">
                <h2 className="fw-bold text-body-emphasis m-0">Archive</h2>
                <p className="text-secondary small">Stored and backed up notes.</p>
            </div>

            {/* Error handling alert */}
            {error && (
                <div className="alert alert-danger border-0 rounded-3 shadow-none d-flex align-items-center gap-2 mb-4" role="alert">
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    <div>{error}</div>
                </div>
            )}

            {/* Filter and Search Bar */}
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
            />

            {/* Notes Grid */}
            {sortedNotes.length === 0 ? (
                <div className="text-center py-5 border rounded-3 bg-body-tertiary">
                    <i className="bi bi-archive fs-1 text-muted mb-3 d-block"></i>
                    <h5 className="fw-bold text-secondary">Archive Empty</h5>
                    <p className="text-muted small">
                        {notes.length === 0
                            ? "Move active notes to the Archive to clear up your workspace."
                            : "No archived notes match your current search criteria."}
                    </p>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {sortedNotes.map((note) => (
                        <div key={note.id} className="col">
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

            {/* Deletion confirmation dialog overlay */}
            <DeleteModal
                show={deleteModal.show}
                noteTitle={deleteModal.note?.title || ''}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteModal({ show: false, note: null })}
            />
        </div>
    );
};

export default Archive;
