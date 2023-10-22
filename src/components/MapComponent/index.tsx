import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';  // Importing Leaflet CSS
import './Map.css';
import L from 'leaflet';

interface MapComponentProps {
    initialPosition: { lat: number, lng: number };
    onPositionChange: (newPosition: { lat: number, lng: number }) => void;
}

const DraggableMarker: React.FC<{ onPositionChange: (newPosition: { lat: number, lng: number }) => void }> = ({ onPositionChange }) => {
    const [position, setPosition] = useState({ lat: -16.6769, lng: -49.2534 });
    const map = useMapEvents({
        click: (e) => {
            setPosition(e.latlng);
            onPositionChange(e.latlng);
        },
        // other map events can be handled here
    });
    const customIcon = L.icon({
        iconUrl: '/marker-icon.png',  // Caminho para a sua imagem
        iconSize: [38, 38],  // Tamanho do ícone
        iconAnchor: [19, 38],  // Ponto do ícone que corresponderá à localização do marcador no mapa
        popupAnchor: [0, -38]   // Ponto a partir do qual o popup será aberto, se necessário
    });
    return position === null ? null : (
        <Marker icon={customIcon} position={position} draggable={true}>
            {/* Additional marker content can go here */}
        </Marker>
    );
};

const MapComponent: React.FC<MapComponentProps> = ({ initialPosition, onPositionChange }) => {
    return (
        <MapContainer style={{ height: '400px', width: '100%' }} center={initialPosition} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker onPositionChange={onPositionChange} />
        </MapContainer>
    );
};

export default MapComponent;
