import React from 'react';

const DeleteModal = ({ show, noteTitle, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1055 }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '1rem' }}>
                        <div className="modal-header border-bottom-0 pb-0">
                            <h5 className="modal-title fw-bold text-danger d-flex align-items-center gap-2">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                Delete Note
                            </h5>
                            <button type="button" className="btn-close shadow-none" aria-label="Close" onClick={onCancel}></button>
                        </div>
                        <div className="modal-body py-3">
                            <p className="m-0 text-secondary" style={{ fontSize: '0.95rem' }}>
                                Are you sure you want to permanently delete the note <strong>"{noteTitle}"</strong>? This action cannot be undone.
                            </p>
                        </div>
                        <div className="modal-footer border-top-0 pt-0 gap-2">
                            <button type="button" className="btn btn-light rounded-pill px-4 py-2 small fw-semibold" onClick={onCancel}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-danger rounded-pill px-4 py-2 small fw-semibold" onClick={onConfirm}>
                                Delete Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
        </>
    );
};

export default DeleteModal;
