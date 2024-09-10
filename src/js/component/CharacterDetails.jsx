// src/components/CharacterDetails.jsx

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFlux } from "../store/flux.js";

export const CharacterDetails = () => {
    const { id } = useParams();
    const { store, actions } = useFlux();
    const { characterDetails, error } = store;

    useEffect(() => {
        actions.fetchCharacterDetails(id); // Obtener detalles del personaje
    }, [id, actions]);

    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-5">
            {characterDetails ? (
                <div className="row">
                    <div className="col-md-6">
                        <img 
                            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} 
                            className="img-fluid" 
                            alt={characterDetails.name} 
                        />
                    </div>
                    <div className="col-md-6">
                        <h1>{characterDetails.name}</h1>
                        <p><strong>Height:</strong> {characterDetails.height} cm</p>
                        <p><strong>Mass:</strong> {characterDetails.mass} kg</p>
                        <p><strong>Hair Color:</strong> {characterDetails.hair_color}</p>
                        <p><strong>Skin Color:</strong> {characterDetails.skin_color}</p>
                        {/* Agrega más detalles según sea necesario */}
                    </div>
                </div>
            ) : (
                <p>Loading character details...</p>
            )}
        </div>
    );
};
