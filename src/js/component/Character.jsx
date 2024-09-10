// src/components/Character.jsx

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFlux } from "../store/flux.js"; // Asegúrate de importar el hook

export const Character = () => {
    const { store, actions } = useFlux();
    const { characters, loading, error, favorites } = store;

    useEffect(() => {
        actions.loadCharacters(); // Cargar personajes cuando el componente se monte
    }, [actions]);

    const handleFavorite = (character) => {
        actions.addFavorite(character);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container row mt-5">
            <div className="d-flex justify-content-evenly gap-3">
                {characters.map((character, index) => {
                    const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`;

                    return (
                        <div className="col-md-4 mb-3" key={character.name}>
                            <div className="card" style={{ width: '100%' }}>
                                <img src={imageUrl} className="card-img-top" alt={character.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{character.name}</h5>
                                    <p className="card-text">
                                        <strong>Height:</strong> {character.height} cm<br />
                                        <strong>Mass:</strong> {character.mass} kg<br />
                                        <strong>Hair Color:</strong> {character.hair_color}<br />
                                        <strong>Skin Color:</strong> {character.skin_color}
                                    </p>
                                    <Link to={`/character/${character.uid}`} className="btn btn-info">Read More</Link>
                                    <button 
                                        className={`btn ms-2 ${favorites.some(fav => fav.name === character.name) ? 'btn-danger' : 'btn-outline-primary'}`} 
                                        onClick={() => handleFavorite(character)}
                                    >
                                        <i className={`bi ${favorites.some(fav => fav.name === character.name) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
