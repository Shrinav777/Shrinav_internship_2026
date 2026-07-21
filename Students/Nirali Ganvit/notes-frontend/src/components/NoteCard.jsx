import React from 'react';
import { Link } from 'react-router-dom';

const NoteCard = ({ note, onFavorite, onArchive, onDelete }) => {

    // Select styling color badges and icons based on Note category
    const getCategoryStyles = (category) => {
        const cat = (category || '').toLowerCase();
        switch (cat) {
            case 'work':
                return {
                    badgeClass: 'bg-primary-subtle text-primary border border-primary-subtle',
                    iconClass: 'bi-briefcase'
                };
            case 'study':
                return {
                    badgeClass: 'bg-success-subtle text-success border border-success-subtle',
                    iconClass: 'bi-book'
                };
            case 'personal':
                return {
                    badgeClass: 'bg-warning-subtle text-warning-emphasis border border-warning-subtle',
                    iconClass: 'bi-person'
                };
            case 'health':
                return {
                    badgeClass: 'bg-danger-subtle text-danger border border-danger-subtle',
                    iconClass: 'bi-heart-pulse'
                };
            case 'programming':
                return {
                    badgeClass: 'bg-dark-subtle text-dark-emphasis border border-dark-subtle',
                    iconClass: 'bi-code-slash'
                };
            case 'ideas':
                return {
                    badgeClass: 'bg-info-subtle text-info-emphasis border border-info-subtle',
                    iconClass: 'bi-lightbulb'
                };
            case 'tasks':
                return {
                    badgeClass: 'bg-purple-subtle text-purple border border-purple-subtle',
                    iconClass: 'bi-check2-square'
                };
            case 'general':
            default:
                return {
                    badgeClass: 'bg-secondary-subtle text-secondary-emphasis border border-secondary-subtle',
                    iconClass: 'bi-tag'
                };
        }
    };

    // Format LocalDateTime string to user friendly presentation format
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="card h-100 shadow-sm border transition position-relative note-card">
            <div className="card-body d-flex flex-column p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    {(() => {
                        const { badgeClass, iconClass } = getCategoryStyles(note.category);
                        return (
                            <span className={`badge rounded-pill px-2.5 py-1 text-uppercase fw-bold d-flex align-items-center gap-1 ${badgeClass}`} style={{ fontSize: '0.75rem' }}>
                                <i className={`bi ${iconClass}`} style={{ fontSize: '0.85rem' }}></i>
                                <span>{note.category || 'General'}</span>
                            </span>
                        );
                    })()}
                    <div className="d-flex gap-1">
                        <button
                            className="btn btn-link p-1 text-decoration-none border-0"
                            onClick={() => onFavorite(note.id)}
                            title={note.favorite ? "Remove from Favorites" : "Mark as Favorite"}
                        >
                            <i className={`bi ${note.favorite ? 'bi-star-fill text-warning' : 'bi-star text-muted'} fs-5`}></i>
                        </button>
                        <button
                            className="btn btn-link p-1 text-decoration-none border-0"
                            onClick={() => onArchive(note.id)}
                            title={note.archived ? "Unarchive Note" : "Archive Note"}
                        >
                            <i className={`bi ${note.archived ? 'bi-archive-fill text-primary' : 'bi-archive text-muted'} fs-5`}></i>
                        </button>
                    </div>
                </div>

                <h5 className="card-title fw-bold text-body-emphasis mb-2">{note.title}</h5>
                <p className="card-text text-secondary mb-4 flex-grow-1" style={{ whiteSpace: 'pre-line', fontSize: '0.9rem' }}>
                    {note.content && note.content.length > 150
                        ? `${note.content.substring(0, 150)}...`
                        : note.content}
                </p>

                <div className="d-flex justify-content-between align-items-center mt-auto border-top pt-3">
                    <small className="text-muted d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                        <i className="bi bi-clock"></i>
                        {formatDate(note.updatedAt || note.createdAt)}
                    </small>

                    <div className="d-flex gap-2">
                        <Link to={`/edit/${note.id}`} className="btn btn-sm btn-outline-primary rounded-pill px-3" title="Edit Note">
                            <i className="bi bi-pencil-square"></i>
                            <span className="ms-1 d-none d-sm-inline">Edit</span>
                        </Link>
                        <button
                            className="btn btn-sm btn-outline-danger rounded-pill px-3"
                            onClick={() => onDelete(note)}
                            title="Delete Note"
                        >
                            <i className="bi bi-trash"></i>
                            <span className="ms-1 d-none d-sm-inline">Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
