// src/components/EventForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import DateInput from '../DateInput';
import LocationInput from '../LocationInput';
import './EventForm.css';

interface Event {
    id?: number;
    title: string;
    date: string;
    location: string;
}

interface EventFormProps {
    event?: Event | null;
    onSuccess?: () => void;
}


const EventForm: React.FC<EventFormProps> = ({ event, onSuccess }) => {
    const [formData, setFormData] = useState<Event>(event || { title: '', date: '', location: '' });
    const [date, setDate] = React.useState<Date>(event?.date ? new Date(event.date) : new Date());
    const [location, setLocation] = React.useState<string>(event?.location || '');


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleDateChange = (date: Date) => {
        setDate(date);
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (event) {
            axios.put(`http://localhost:8089/events/${event.id}`, formData)
                .then(() => {
                    if (onSuccess) onSuccess();
                })
                .catch(error => {
                    console.error('There was an error updating the event!', error);
                });
        } else {
            axios.post('http://localhost:8089/events', formData)
                .then(() => {
                    if (onSuccess) onSuccess();
                })
                .catch(error => {
                    console.error('There was an error creating the event!', error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <label>
                Título do Evento
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className="form-input"
                />
            </label>
            <DateInput label="Data do Evento" selectedDate={date} onChange={handleDateChange} />
            <LocationInput label="Localização do evento" value={location} onChange={setLocation} />
            <button type="submit" className="form-button">
                Submit
            </button>
        </form>
    );
};

export default EventForm;
