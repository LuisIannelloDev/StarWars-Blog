import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const CharacterDetails = () => {
    const { id } = useParams();
    const [characterDetails, setCharacterDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                const response = await fetch(`https://swapi.dev/api/people/${id}/`);
                if (!response.ok) throw new Error("Failed to fetch character details");
                const data = await response.json();
                setCharacterDetails(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchCharacterDetails();
    }, [id]);

    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-5">
            {characterDetails ? (
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                            onError={(e) => e.target.src = "/path-to-default-image.jpg"} 
                            className="img-fluid" 
                            alt={characterDetails.name} 
                        />
                    </div>
                    <div className="col-md-6">
                        <h1>{characterDetails.name}</h1>
                        <p><strong>Height:</strong> {characterDetails.height || "N/A"} cm</p>
                        <p><strong>Mass:</strong> {characterDetails.mass || "N/A"} kg</p>
                        <p><strong>Hair Color:</strong> {characterDetails.hair_color || "N/A"}</p>
                        <p><strong>Skin Color:</strong> {characterDetails.skin_color || "N/A"}</p>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p>Loading character details...</p>
                </div>
            )}
        </div>
    );
};
