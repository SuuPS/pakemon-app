import React, { useState, useEffect } from 'react';
import { TextField, Card, CardContent, Typography, Grid, Dialog, DialogContent, DialogTitle } from '@mui/material';
import PokemonDetails from "./PokemonDetails.jsx";
import { fetchPokemonList } from '/src/services/pokemonService.js';

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const handlePokemonClick = (name) => {
        setSelectedPokemon(name);
    };

    const handleCloseModal = () => {
        setSelectedPokemon(null); // Закрываем модальное окно
    };

    useEffect(() => {
        // Загрузка списка покемонов при монтировании компонента
        fetchPokemonList()
            .then((results) => {
                setPokemonList(results);
            })
            .catch((error) => {
                console.error('Ошибка при получении списка покемонов', error);
            });
    }, []);

    return (
        <div style={{padding: '10px'}}>
            <Dialog open={Boolean(selectedPokemon)} onClose={handleCloseModal}>
                <DialogTitle>Подробная информация</DialogTitle>
                <DialogContent>
                    {selectedPokemon && (
                        <PokemonDetails name={selectedPokemon} onClose={handleCloseModal} />
                    )}
                </DialogContent>
            </Dialog>
            <TextField
                style={{margin: '10px 0px'}}
                label="Поиск по имени"
                variant="outlined"
                fullWidth
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <Grid container spacing={2}>
                {pokemonList
                    .filter((pokemon) =>
                        pokemon.name.toLowerCase().includes(searchText.toLowerCase())
                    )
                    .map((pokemon) => (
                        <Grid item key={pokemon.name} xs={12} sm={6} md={4} lg={3}>
                            <Card
                                onClick={() => handlePokemonClick(pokemon.name)}
                                style={{ cursor: 'pointer' }}
                            >
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {pokemon.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
};

export default PokemonList;
