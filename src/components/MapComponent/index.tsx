import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

import L from 'leaflet';

interface MapComponentProps {
    initialPosition: { lat: number, lng: number };
    onPositionChange: (newPosition: { lat: number, lng: number }) => void;
    onAddressChange?: (newAddress: string) => void;
}

interface DraggableMarkerProps {
    onPositionChange: (newPosition: { lat: number, lng: number }) => void;
    onAddressChange?: (newAddress: string) => void;
    initialPosition: { lat: number, lng: number };
}

const DraggableMarker: React.FC<DraggableMarkerProps> = ({ onPositionChange, onAddressChange, initialPosition }) => {
    const [position, setPosition] = useState(initialPosition);
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            handlePositionChange(e.latlng);
        },
    });

    const handlePositionChange = async (newPosition: { lat: number, lng: number }) => {
        const provider = new OpenStreetMapProvider({ params: { addressdetails: 1 } });
        const results = await provider.search({ query: `${newPosition.lat}, ${newPosition.lng}` });
        if (results && results[0]) {
            const address = (results[0].raw as any).address;
            const street = address.road || '';
            const neighborhood = address.suburb || '';
            const city = address.city || address.town || '';
            const formattedAddress = [street, neighborhood, city].filter(Boolean).join(', ');
            if (onAddressChange) {
                onAddressChange(formattedAddress);
            }
        }
        onPositionChange(newPosition);
    };

    useEffect(() => {
        setPosition(initialPosition);
    }, [initialPosition]);

    const customIcon = L.icon({
        iconUrl: '/marker-icon.png',
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38]
    });
    return position === null ? null : (
        <Marker
            icon={customIcon}
            position={position}
            draggable={true}
        />
    );
};

const MapComponent: React.FC<MapComponentProps> = ({ initialPosition, onPositionChange, onAddressChange }) => {
    return (
        <MapContainer style={{ height: '400px', width: '100%' }} center={initialPosition} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker onPositionChange={onPositionChange} onAddressChange={onAddressChange} initialPosition={initialPosition} />
        </MapContainer>
    );
};

export default MapComponent;
