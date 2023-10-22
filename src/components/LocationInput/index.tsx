// src/components/LocationInput/LocationInput.tsx
import React, { useState, useCallback } from 'react';
import MapComponent from '../MapComponent';
import './LocationInput.css';

interface LocationInputProps {
    value: string;
    onChange: (location: string) => void;
    label: string;
}

const LocationInput: React.FC<LocationInputProps> = ({ value, onChange, label }) => {
    const [manualEntry, setManualEntry] = useState(value);
    const [mapLocation, setMapLocation] = useState({ lat: -16.6769, lng: -49.2534 });

    const handleManualEntryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setManualEntry(event.target.value);
        onChange(event.target.value);
    };

    const handleMapLocationChange = useCallback((newLocation: { lat: number, lng: number }) => {
        const locationString = `${newLocation.lat}, ${newLocation.lng}`;
        setManualEntry(locationString);
        onChange(locationString);
    }, [onChange]);

    return (
        <div className="location-input">
            <label>{label}</label>
            <input
                type="text"
                value={manualEntry}
                onChange={handleManualEntryChange}
                placeholder="Enter location or select on map"
            />
            <MapComponent onPositionChange={handleMapLocationChange} initialPosition={mapLocation} />
        </div>
    );
};

export default LocationInput;
