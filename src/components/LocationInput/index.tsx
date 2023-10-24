import React, { useState, useCallback } from 'react';
import MapComponent from '../MapComponent';
import './LocationInput.css';

interface LocationInputProps {
    value: string;
    onChange: (location: string) => void;
    onAddressChange?: (address: string) => void;
    label: string;
}

const LocationInput: React.FC<LocationInputProps> = ({ value, onChange, onAddressChange, label }) => {
    const [mapLocation, setMapLocation] = useState({ lat: -16.6769, lng: -49.2534 });

    const handleMapLocationChange = useCallback((newLocation: { lat: number, lng: number }) => {
        const locationString = `${newLocation.lat}, ${newLocation.lng}`;
        onChange(locationString);
    }, [onChange]);
    return (
        <div className="location-input">
            <label>{label}</label>
            <MapComponent
                onPositionChange={handleMapLocationChange}
                initialPosition={mapLocation}
                onAddressChange={onAddressChange}
            />
        </div>
    );
};

export default LocationInput;
