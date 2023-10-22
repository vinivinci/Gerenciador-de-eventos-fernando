// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import EventCard from '../../components/EventCard';
import './HomePage.css';
import Layout from '../../components/Layout';

interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
}

const HomePage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8089/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the events!', error);
            });
    }, []);

    return (
        <Layout>
            <button className="create-button">Criar Novo Evento</button>
            <div className="events-list">
                {events.map(event => (
                    <EventCard
                        key={event.id}
                        title={event.title}
                        date={event.date}
                        location={event.location}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default HomePage;
