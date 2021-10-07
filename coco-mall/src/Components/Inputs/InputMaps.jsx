import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../../Scripts/constants.js';

const InputMaps = ({ coord }) => {
    const containerStyle = {
        width: '100%',
        height: '200px',
        marginBottom: '15px',
    };

    const center = coord;

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: 'places',
    });

    const [map, setMap] = React.useState(null);

    console.log(map);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={18}
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
