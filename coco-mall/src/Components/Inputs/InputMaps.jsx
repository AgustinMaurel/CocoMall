import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
//import { GOOGLE_MAPS_API_KEY } from '../../Scripts/constants.js';


const InputMaps = ({ coord }) => {
    const containerStyle = {
        width: '100%',
        height: '100%',
    };
    
    const center = coord || {
        lat: -31.7190478,
        lng: -60.5368534,
    };

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
            <Marker onLoad={(marker) => marker} position={center} />
        </GoogleMap>
    );
};

export default InputMaps;
