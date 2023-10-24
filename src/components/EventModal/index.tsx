import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import './EventModal.css'
import L from 'leaflet';


interface EventModalProps {
    event: {
        title: string;
        description: string;
        date: string;
        location: string;
        locationCoords: string;
        id: number;
    };
    onClose: () => void;
}

const customIcon = L.icon({
    iconUrl: '/marker-icon.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
});

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
    const [lat, lng] = event.locationCoords.split(',').map(coord => parseFloat(coord.trim()));

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                <h2>{event.title}</h2>
                <p><strong>Descrição:</strong> {event.description}</p>
                <p><strong>Data do evento:</strong> {event.date}</p>
                <p><strong>Localização:</strong> {event.location}</p>
                <div className="map-container">
                    <MapContainer center={[lat, lng]} zoom={15} style={{ width: '100%', height: '300px' }} scrollWheelZoom={false} dragging={false} zoomControl={false}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[lat, lng]} icon={customIcon} />
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};


export default EventModal;
