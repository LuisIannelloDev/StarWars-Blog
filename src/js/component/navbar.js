
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
        <nav className="navbar navbar-light bg-light mb-3">
            <Link to="/">
                <img 
                    src="https://img.icons8.com/?size=100&id=21576&format=png&color=000000" 
                    alt="Logo" 
                    className="navbar-brand mb-0 h1" 
                />
            </Link>
            <div className="ml-auto">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
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
        </nav>
    );
};
