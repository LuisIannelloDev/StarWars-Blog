import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from '../store/FavoriteContext.js'; // Asegúrate de que esté correctamente importado

export const Planets = () => {
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { favorites, addFavorite } = useFavorites(); // Usa el contexto de favoritos

    useEffect(() => {
        const fetchPlanets = async () => {
            try {
                const response = await fetch("https://swapi.dev/api/planets/");
                const data = await response.json();
                setPlanets(data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPlanets();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleFavorite = (planet) => {
        addFavorite(planet); // Llama a la función para añadir/quitar favoritos
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <div id="planetsCarousel" className="carousel slide">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="d-flex overflow-auto">
                                    {planets.map((planet, index) => {
                                        const imageUrl = `https://starwars-visualguide.com/assets/img/planets/${index + 1}.jpg`;

                                        return (
                                            <div className="card" key={planet.name} style={{ width: '18rem', flex: '0 0 auto' }}>
                                                <img 
                                                    src={imageUrl} 
                                                    className="card-img-top" 
                                                    alt={planet.name}
                                                    onError={(e) => e.target.src = "/path-to-default-image.jpg"} // Imagen de respaldo
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">{planet.name}</h5>
                                                    <p className="card-text">
                                                        <strong>Climate:</strong> {planet.climate || "N/A"}<br />
                                                        <strong>Terrain:</strong> {planet.terrain || "N/A"}<br />
                                                        <strong>Population:</strong> {planet.population || "N/A"}
                                                    </p>
                                                    <Link to={`/planet/${index + 1}`} className="btn btn-info">Read More</Link>
                                                    <button 
                                                        className={`btn ms-2 ${favorites.some(fav => fav.name === planet.name) ? 'btn-danger' : 'btn-outline-primary'}`} 
                                                        onClick={() => handleFavorite(planet)}
                                                    >
                                                        <i className={`bi ${favorites.some(fav => fav.name === planet.name) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#planetsCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#planetsCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
