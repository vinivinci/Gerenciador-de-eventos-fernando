import React from 'react';
import './EventCard.css';
const EventCard: React.FC<{ title: string, date: string, location: string }> = ({ title, date, location }) => {
    return (
        <div className="event-card">
            <h3 className="event-title">{title}</h3>
            <p className="event-date">{date}</p>
            <p className="event-location">{location}</p>
            <a href="/event-details" className="view-more">Ver Mais</a>
        </div>
    );
};

export default EventCard;
