import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div onClick={() => navigate('/')} className="logo">
                <img src='/logo.png' alt='logo' width={180} />
            </div>

            <div className={`links ${isMobileMenuOpen ? 'active' : ''}`}>
                <Link to="/create-event">Criar Evento</Link>
                <Link to="/show-events">Visualizar Eventos</Link>
                <Link to="/about">Sobre</Link>
            </div>

            <div className="hamburger" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                ☰
            </div>
        </nav>
    );
};

export default NavBar;
