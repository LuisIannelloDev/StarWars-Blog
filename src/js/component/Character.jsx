import React, { useEffect, useState } from "react";


export const Character = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const storedCharacters = localStorage.getItem('characters');
            
            if (storedCharacters) {
                setCharacters(JSON.parse(storedCharacters));
                setLoading(false);
            } else {
                try {
                    const response = await fetch('https://www.swapi.tech/api/people/');
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    const fetchedCharacters = data.results;
                    localStorage.setItem('characters', JSON.stringify(fetchedCharacters));
                    setCharacters(fetchedCharacters);
                } catch (err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container  row mt-5">
            <div className="d-flex justify-content-evenly gap-3" >
                {characters.map((character) => (
                    <div className="col-md-4 mb-3" key={character.name}>
                        <div className="card" style={{ width: '100%' }}>
                            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Character" />
                            <div className="card-body">
                                <h5 className="card-title">{character.name}</h5>
                                <p className="card-text">
                                    <strong>Height:</strong> {character.height} cm<br />
                                    <strong>Mass:</strong> {character.mass} kg<br />
                                    <strong>Hair Color:</strong> {character.hair_color}<br />
                                    <strong>Skin Color:</strong> {character.skin_color}
                                </p>
                                <a href="#" className="btn btn-primary">More Info</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
