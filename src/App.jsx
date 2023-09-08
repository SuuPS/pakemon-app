import React, { useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PokemonList from "./components/PokemonList.jsx";
import {CssBaseline, AppBar, Toolbar, Typography} from '@mui/material';

function App() {
    return (
        <div>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar className={'container'}>
                    <Typography variant="h6" component="div">
                        Pokemon App
                    </Typography>
                </Toolbar>
            </AppBar>
            <PokemonList/>
        </div>
    );
}

export default App;
