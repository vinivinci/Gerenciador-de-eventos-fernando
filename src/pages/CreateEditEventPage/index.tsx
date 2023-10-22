// src/pages/CreateEditEventPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import EventForm from '../../components/EventForm';

import axios from 'axios';

interface Event {
    id?: number;
    title: string;
    date: string;
    location: string;
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
        navigate('/');
    };

    return (
        <Layout>
            <EventForm event={event} onSuccess={handleSuccess} />
        </Layout>
    );
};

export default CreateEditEventPage;
