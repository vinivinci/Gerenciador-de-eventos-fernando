import React from 'react';
import './HomePage.css';
import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="background-image"></div>
            <div className="home-content">
                <h1 className="home-title">"Eventualmente Seu"</h1>
                <p className="home-subtitle">O sistema perfeito para você gerenciar seus eventos.</p>
                <p className="home-invitation">Venha descobrir como tornar seus eventos ainda mais inesquecíveis com a nossa plataforma. Organize, gerencie e aproveite ao máximo cada momento.</p>
                <button onClick={() => navigate('/create-event')} className="create-event-btn">Criar Evento</button>
            </div>
        </Layout>
    );
};

export default HomePage;
