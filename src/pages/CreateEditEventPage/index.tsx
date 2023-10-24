// src/pages/CreateEditEventPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import EventForm from '../../components/EventForm';
import './CreateEditEvent.css'

import axios from 'axios';
import { toast } from 'react-toastify';

interface Event {
    id?: number;
    title: string;
    description: string;
    date: string;
    location: string;
    locationCoords?: string;
}


const CreateEditEventPage: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const [event, setEvent] = React.useState<Event | null>(null);

    React.useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8089/events/${id}`)
                .then(response => {
                    setEvent(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the event!', error);
                });
        }
    }, [id]);

    const handleSuccess = () => {
        toast.success('Evento salvo com sucesso!');
        navigate('/');
    };

    return (
        <Layout>
            <div className='container'>
                <EventForm event={event} onSuccess={handleSuccess} />
            </div>

        </Layout>
    );
};

export default CreateEditEventPage;
