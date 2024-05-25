import React from 'react';
import './App.css';
import { Weather } from './view/Weather';
import usePosition from './hook/positionHook';
import { Alert, Container } from '@mui/material';

function App() {
  const { lat, long, error } = usePosition();

  return (
    <div className="App">
      <header className="App-header">
        My Weather Widget - Camille INGOUF
      </header>
      {error && <Alert color='error'>{error}</Alert>}
      {lat !== null && long !== null
        ? (
          <Container sx={{ justifyContent: "center", display: "flex", p: 1 }}>
            <Weather lat={lat} long={long} />
          </Container>
        ) 
        : <Alert color='warning'>Aucune coordonnée</Alert>
      }
    </div>
  );
}

export default App;
