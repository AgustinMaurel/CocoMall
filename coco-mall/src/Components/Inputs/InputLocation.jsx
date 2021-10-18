import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '../../Scripts/constants';

const InputLocation = ({ setPlaceSelected, defaultValue }) => {
    return (
        <div className='mt-1'>
            <label className='text-gray-500 text-xs sm:text-sm lg:text-base 2xl:text-lg'>Location</label>
            <div className='flex justify-between border bg-white border-gray-200 shadow-md rounded z-10'>
                <Autocomplete
                    defaultValue={defaultValue}
                    className={'outline-none text-xs z-10 p-2 w-full'}
                    apiKey={GOOGLE_MAPS_API_KEY}
                    onPlaceSelected={(place) => {
                        setPlaceSelected({
                            state: place.address_components[0]?.long_name,
                            country:
                                place.address_components[place.address_components.length - 1]
                                    ?.long_name,
                            coord: {
                                lat: place.geometry.location.lat(),
                                lng: place.geometry.location.lng(),
                            },
                        });
                    }}
                    options={{
                        fields: [
                            'name',
                            'address_component',
                            'adr_address',
                            'formatted_address',
                            'geometry',
                        ],
                        // componentRestrictions: { country: 'ar' },
                    }}
                    placeholder=''
                />
            </div>
        </div>
    );
};

export default InputLocation;
