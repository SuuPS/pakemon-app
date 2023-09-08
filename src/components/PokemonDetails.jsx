import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Typography, Grid, CircularProgress, List, ListItem, ListItemText, Paper, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchPokemonDetails } from '/src/services/pokemonService.js';

const PokemonDetails = ({ name, onClose }) => {
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        fetchPokemonDetails(name)
            .then((data) => {
                setPokemonData(data);
            })
            .catch((error) => {
                console.error('Ошибка при получении данных о покемоне', error);
            });
    }, [name]);

    if (!pokemonData) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <Typography variant="h4" component="div">
                        {pokemonData.name}
                    </Typography>
                    <Button variant="outlined" onClick={onClose} style={{ marginBottom: '10px' }}>
                        Закрыть
                    </Button>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Card>
                                <CardContent>
                                    <img
                                        src={pokemonData.sprites.front_default}
                                        alt={pokemonData.name}
                                        style={{ maxWidth: '100%' }}
                                    />
                                </CardContent>
                            </Card>
                            <Typography variant="h6" component="div">
                                Спрайты:
                            </Typography>
                            <Paper elevation={3} style={{ padding: '10px' }}>
                                <Box display="block">
                                    {Object.keys(pokemonData.sprites).map((spriteKey) => {
                                        const spriteUrl = pokemonData.sprites[spriteKey];
                                        return spriteUrl ? (
                                            <img
                                                key={spriteKey}
                                                src={spriteUrl}
                                                alt={spriteKey}
                                                style={{ maxWidth: '80px', marginRight: '10px' }}
                                            />
                                        ) : null;
                                    })}
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Типы: {pokemonData.types.map((type) => type.type.name).join(', ')}
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        Рост: {pokemonData.height / 10} м
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        Вес: {pokemonData.weight / 10} кг
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        Статистика:
                                    </Typography>
                                    <List>
                                        {pokemonData.stats.map((stat) => (
                                            <ListItem key={stat.stat.name}>
                                                <ListItemText
                                                    primary={stat.stat.name}
                                                    secondary={stat.base_stat}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PokemonDetails;
