import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../store/FavoriteContext.js";

export const Navbar = () => {
    const { favorites, addFavorite } = useFavorites();

    const handleRemoveFavorite = (name) => {
        const updatedFavorites = favorites.filter(fav => fav.name !== name);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        addFavorite({ name });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img 
                        src="https://img.icons8.com/?size=100&id=21576&format=png&color=ffffff" 
                        alt="Logo" 
                        style={{ width: '40px' }} 
                    />
                </Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <div className="dropdown">
                        <button 
                            className="btn btn-primary dropdown-toggle" 
                            type="button" 
                            id="dropdownMenuButton" 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                        >
                            Favorites ({favorites.length})
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            {favorites.length === 0 ? (
                                <li className="dropdown-item">No favorites yet</li>
                            ) : (
                                favorites.map((favorite) => (
                                    <li key={favorite.name} className="dropdown-item d-flex justify-content-between align-items-center">
                                        <Link to={`/character/${favorite.name}`} className="text-decoration-none">
                                            {favorite.name}
                                        </Link>
                                        <button 
                                            className="btn btn-outline-danger btn-sm ms-2" 
                                            onClick={() => handleRemoveFavorite(favorite.name)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};
