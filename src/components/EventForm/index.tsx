// src/components/EventForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import DateInput from '../DateInput';
import LocationInput from '../LocationInput';
import { format } from 'date-fns';
import './EventForm.css';
import { toast } from 'react-toastify';
interface Event {
    id?: number;
    title: string;
    description: string;
    date: string;
    location: string;
    locationCoords?: string;
}

interface EventFormProps {
    event?: Event | null;
    onSuccess?: () => void;
}


const EventForm: React.FC<EventFormProps> = ({ event, onSuccess }) => {
    const [formData, setFormData] = useState<Event>(event || { title: '', description: '', date: format(new Date(), 'dd/MM/yyyy'), location: '', locationCoords: '' });
    const [date, setDate] = React.useState<Date>(event?.date ? new Date(event.date) : new Date());
    const [location, setLocation] = React.useState<string>(event?.location || '');


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleDateChange = (date: Date) => {
        const formattedDate = format(date, 'dd/MM/yyyy');
        setDate(date);
        setFormData({ ...formData, date: formattedDate });
    };

    const handleLocationChange = (newLocation: string) => {
        setLocation(newLocation);
        setFormData({ ...formData, location: newLocation });
    }

    const handleLocationCoordsChange = (newLocation: string) => {
        setFormData(prevFormData => {
            const updatedFormData = { ...prevFormData, locationCoords: newLocation };
            return updatedFormData;
        });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.title == '' || formData.description == '' || formData.location == '') {
            toast.error('Preencha todos os campos!');
            return;
        }


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
            <div className="field-row">
                <div style={{ width: '50%' }} >
                    <label className='title-container'>
                        Título do Evento
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Titulo"
                            className="form-input"
                        />
                    </label>
                </div>
                <div style={{ width: '50%' }} >
                    <DateInput label="Data do Evento" selectedDate={date} onChange={handleDateChange} />
                </div>

            </div>
            <label className='title-container'>
                Descrição do Evento
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    placeholder="Descrição do evento"
                    className="form-input description-textarea"
                />
            </label>
            <LocationInput
                label="Localização do evento"
                value={location}
                onChange={handleLocationCoordsChange}
                onAddressChange={(newAddress) => handleLocationChange(newAddress)}

            />
            <button type="submit" className="form-button">
                Submit
            </button>
        </form>
    );
};

export default EventForm;
