import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../../Scripts/constants.js';

const InputMaps = ({ coord }) => {

    const containerStyle = {
        width: '100%',
        height: '100%',
    };

    const center = coord || {
        lat: -31.7190478,
        lng: -60.5368534
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: 'places',
    });

    const [map, setMap] = React.useState(null);
    
    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    console.log(map)

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {/* <Marker lat={coord.lat} lng={coord.lng} /> */}
        </GoogleMap>
    ) : (
        <></>
    );
};

export default InputMaps;
