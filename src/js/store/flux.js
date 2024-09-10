// src/store/flux.js

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            characters: [],  // Para guardar los datos de los personajes
            favorites: [],   // Para guardar los favoritos
            loading: false,  // Para manejar el estado de carga
            error: null       // Para manejar errores
        },
        actions: {
            loadCharacters: async () => {
                const store = getStore();
                setStore({ ...store, loading: true });

                try {
                    const response = await fetch('https://www.swapi.tech/api/people/');
                    if (!response.ok) throw new Error('Network response was not ok');
                    
                    const data = await response.json();
                    const fetchedCharacters = data.results;

                    // Actualiza el store con los personajes obtenidos
                    setStore({ characters: fetchedCharacters, loading: false });
                } catch (error) {
                    setStore({ error: error.message, loading: false });
                }
            },
            addFavorite: (character) => {
                const store = getStore();
                const updatedFavorites = [...store.favorites];
                const index = updatedFavorites.findIndex(fav => fav.name === character.name);

                if (index >= 0) {
                    updatedFavorites.splice(index, 1); // Eliminar de favoritos
                } else {
                    updatedFavorites.push(character); // Añadir a favoritos
                }

                setStore({ favorites: updatedFavorites });
            },
            fetchCharacterDetails: async (id) => {
                const store = getStore();

                try {
                    const response = await fetch(`https://www.swapi.tech/api/people/${id}/`);
                    if (!response.ok) throw new Error('Network response was not ok');
                    
                    const data = await response.json();
                    const characterDetails = data.result.properties;

                    // Actualiza el store con los detalles del personaje
                    setStore({ characterDetails });
                } catch (error) {
                    setStore({ error: error.message });
                }
            }
        }
    };
};

export default getState;
