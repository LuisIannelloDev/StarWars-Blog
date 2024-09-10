// src/context/FavoriteContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const FavoriteContext = createContext();

export const useFavorites = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const addFavorite = (character) => {
        const updatedFavorites = [...favorites];
        const index = updatedFavorites.findIndex(fav => fav.name === character.name);

        if (index >= 0) {
            updatedFavorites.splice(index, 1);
        } else {
            updatedFavorites.push(character);
        }

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <FavoriteContext.Provider value={{ favorites, addFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};
