import React from 'react';
import './AboutPage.css';
import Layout from '../../components/Layout';

const AboutPage = () => {

    return (
        <Layout>
            <div className="background-image-about"></div>
            <div className="about-content">
                <h1 className="about-title">Sobre Nós</h1>
                <p className="about-subtitle">Conheça mais sobre a "Eventualmente Seu" e nossa missão.</p>
                <p className="about-description">A "Eventualmente Seu" foi criada com o propósito de ajudar pessoas a gerenciar seus eventos de maneira eficiente e prática. Nossa visão é ser a plataforma líder em gestão de eventos, sempre priorizando a satisfação de nossos clientes. Acreditamos na importância de cada evento e em torná-los momentos inesquecíveis.</p>
                <p className="about-values">Valores: Comprometimento, Inovação, Excelência no atendimento, Integridade e Paixão pelo que fazemos.</p>
            </div>
        </Layout>
    );
};

export default AboutPage;
