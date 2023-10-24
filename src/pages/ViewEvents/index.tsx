import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../../components/EventCard';
import './ViewEvents.css';
import Layout from '../../components/Layout';
import EventModal from '../../components/EventModal';
import { toast } from 'react-toastify';

interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
    description: string;
    locationCoords: string;
}


const ViewEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null | undefined>();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = (id: number) => {
        axios.get(`http://localhost:8089/events/${id}`)
            .then(response => {
                setSelectedEvent(response.data);
                setIsModalOpen(true);
            })
            .catch(error => {
                toast.error(`Houve um erro ao buscar o evento com ID ${id}!`);
            });
    };


    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    useEffect(() => {
        axios.get('http://localhost:8089/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                toast.error('Houve um erro ao buscar os eventos!');
            });
    }, []);

    return (
        <Layout>
            <h2 className="events-title">Seus eventos marcados:</h2>
            <div className="events-list">
                {events.map(event => (
                    <EventCard
                        id={event.id}
                        key={event.id}
                        title={event.title}
                        date={event.date}
                        location={event.location}
                        onClick={(id) => openModal(id)}
                    />
                ))}
            </div>
            {isModalOpen && selectedEvent && <EventModal event={selectedEvent} onClose={closeModal} />}
        </Layout>
    );
};

export default ViewEvents;
