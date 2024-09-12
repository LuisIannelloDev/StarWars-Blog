import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from '../store/FavoriteContext.js'; // Asegúrate de que esté correctamente importado

export const Starships = () => {
    const [starships, setStarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { favorites, addFavorite } = useFavorites(); // Usa el contexto de favoritos

    useEffect(() => {
        const fetchStarships = async () => {
            try {
                const response = await fetch("https://www.swapi.tech/api/starships");
                const data = await response.json();
                // Ajustar el índice para que las imágenes comiencen desde el 2
                const starshipsWithImages = data.results.map((starship, index) => ({
                    ...starship,
                    imageIndex: index + 2 // Ajusta el índice de las imágenes
                }));
                setStarships(starshipsWithImages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStarships();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleFavorite = (starship) => {
        addFavorite(starship); // Llama a la función para añadir/quitar favoritos
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <div id="starshipsCarousel" className="carousel slide">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="d-flex overflow-auto">
                                    {starships.map((starship) => {
                                        const imageUrl = `https://starwars-visualguide.com/assets/img/starships/${starship.imageIndex}.jpg`;

                                        return (
                                            <div className="card" key={starship.name} style={{ width: '18rem', flex: '0 0 auto' }}>
                                                <img 
                                                    src={imageUrl} 
                                                    className="card-img-top" 
                                                    alt={starship.name}
                                                    onError={(e) => e.target.src = "/path-to-default-image.jpg"} // Imagen de respaldo
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">{starship.name}</h5>
                                                    <p className="card-text">
                                                        <strong>Model:</strong> {starship.model || "N/A"}<br />
                                                        <strong>Manufacturer:</strong> {starship.manufacturer || "N/A"}<br />
                                                        <strong>Cost in Credits:</strong> {starship.cost_in_credits || "N/A"}
                                                    </p>
                                                    <Link to={`/starship/${starship.uid}`} className="btn btn-info">Read More</Link>
                                                    <button 
                                                        className={`btn ms-2 ${favorites.some(fav => fav.name === starship.name) ? 'btn-danger' : 'btn-outline-primary'}`} 
                                                        onClick={() => handleFavorite(starship)}
                                                    >
                                                        <i className={`bi ${favorites.some(fav => fav.name === starship.name) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#starshipsCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#starshipsCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
