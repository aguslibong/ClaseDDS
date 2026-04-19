import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Menu from './components/Menu';
import Registro from './components/ReservaHijos/Registro';
import Consulta from './components/ReservaHijos/Consulta';
import Reservas from './components/Reservas';
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Menu />} />
          <Route path='/reservas' element={<Reservas />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
