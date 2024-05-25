import React from 'react';
import './App.css';
import { Weather } from './view/Weather';
import usePosition from './hook/positionHook';
import { Container } from '@mui/material';

function App() {
  const { lat, long } = usePosition();

  return (
    <div className="App">
      <header className="App-header">
      </header>
      {lat !== null && long !== null
        ? (
          <Container sx={{ justifyContent: "center", display: "flex", p: 1 }}>
            <Weather lat={lat} long={long} />
          </Container>
        ) 
        : null
      }
    </div>
  );
}

export default App;
