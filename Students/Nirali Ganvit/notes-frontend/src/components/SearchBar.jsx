import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories }) => {
    return (
        <div className="row g-3 align-items-center mb-4">
            <div className="col-12 col-md-8">
                <div className="input-group">
                    <span className="input-group-text bg-body border-end-0 text-muted">
                        <i className="bi bi-search"></i>
                    </span>
                    <input 
                        type="text" 
                        className="form-control bg-body border-start-0 ps-0 shadow-none" 
                        placeholder="Search notes by title or content..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button 
                            className="btn btn-outline-secondary border-start-0 border-end-0 bg-body text-muted"
                            onClick={() => setSearchQuery('')}
                            type="button"
                        >
                            <i className="bi bi-x-circle-fill"></i>
                        </button>
                    )}
                </div>
            </div>
            
            <div className="col-12 col-md-4">
                <div className="input-group">
                    <span className="input-group-text bg-body border-end-0 text-muted">
                        <i className="bi bi-filter"></i>
                    </span>
                    <select 
                        className="form-select bg-body border-start-0 ps-0 shadow-none fw-semibold"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
