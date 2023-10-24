import React from 'react';
import './EventCard.css';



const EventCard: React.FC<{
    id: number;
    title: string;
    date: string;
    location: string;
    onClick: (id: number) => void;
}> = ({ id, title, date, location, onClick }) => {
    return (
        <div className="event-card">
            <h3 className="event-title">{title}</h3>
            <p className="event-date">{date}</p>
            <p className="event-location">{location}</p>
            <button onClick={() => onClick(id)} className="view-more">Ver Mais</button>
        </div>
    );
};

export default EventCard;
