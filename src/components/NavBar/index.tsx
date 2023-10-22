import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="logo">Logo da Aplicação</div>
            <div className="links">
                <Link to="/create-edit-event">Criar Evento</Link>
                <Link to="/">Visualizar Eventos</Link>
                <Link to="/about">Sobre</Link>
            </div>
        </nav>
    );
};

export default NavBar;
