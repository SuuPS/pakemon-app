// pokemonService.js
import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async () => {
    return axios.get(`${API_BASE_URL}/pokemon`)
        .then((response) => response.data.results)
        .catch((error) => {
            console.error('Ошибка при получении списка покемонов', error);
            throw error;
        });
};

export const fetchPokemonDetails = async (name) => {
    return axios.get(`${API_BASE_URL}/pokemon/${name}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error('Ошибка при получении данных о покемоне', error);
            throw error;
        });
};
