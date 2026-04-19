import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Menu = () => {
  return (
    <div className="menu-container">
      <h1>Sistema Reservas Hotel</h1>
      <Link to="/reservas">Reservas</Link>
    </div>
  );
}

export default Menu;
