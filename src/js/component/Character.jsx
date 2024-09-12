import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from '../store/FavoriteContext.js'; // Asegúrate de que esté correctamente importado

export const Character = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { favorites, addFavorite } = useFavorites(); // Usa el contexto de favoritos

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch("https://swapi.dev/api/people/");
                const data = await response.json();
                setCharacters(data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCharacters();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleFavorite = (character) => {
        addFavorite(character); // Llama a la función para añadir/quitar favoritos
    };

    return (
        <div className="container mt-2">
            <div className="d-flex overflow-auto">
                <div className="d-flex flex-nowrap gap-3">
                    {characters.map((character, index) => {
                        const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`;

                        return (
                            <div className="card" style={{ width: '18rem' }} key={character.name}>
                                <img 
                                    src={imageUrl} 
                                    className="card-img-top" 
                                    alt={character.name}
                                    onError={(e) => e.target.src = "/path-to-default-image.jpg"} // Imagen de respaldo
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{character.name}</h5>
                                    <p className="card-text">
                                        <strong>Height:</strong> {character.height ? `${character.height} cm` : "N/A"}<br />
                                        <strong>Mass:</strong> {character.mass ? `${character.mass} kg` : "N/A"}<br />
                                        <strong>Hair Color:</strong> {character.hair_color || "N/A"}<br />
                                        <strong>Skin Color:</strong> {character.skin_color || "N/A"}
                                    </p>
                                    <Link to={`/character/${index + 1}`} className="btn btn-info">Read More</Link>
                                    <button 
                                        className={`btn ms-2 ${favorites.some(fav => fav.name === character.name) ? 'btn-danger' : 'btn-outline-primary'}`} 
                                        onClick={() => handleFavorite(character)}
                                    >
                                        <i className={`bi ${favorites.some(fav => fav.name === character.name) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
