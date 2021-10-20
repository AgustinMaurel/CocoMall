import React, { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '../../Scripts/constants.js';
import InputMaps from '../Inputs/InputMaps';
import { useForm } from 'react-hook-form';

function Address({
    address,
    placeSelected,
    setPlaceSelected,
    onSubmit,
    userAddressFunc,
    setAddressSelect,
}) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ mode: 'onTouched' });

    const handleChangeI = (e) => {
        userAddressFunc(e.target.value);
    };

    return (
        <div className='w-full h-full m-auto'>
            <form className='w-2/5 h-2/5 flex flex-col 2xl:w-2/5'>
                <h3>Select your address</h3>
                <fieldset>
                    {address.map((direc, i) => {
                        return (
                            <div className='flex'>
                                <input
                                    type='radio'
                                    name='address'
                                    value={i}
                                    onChange={handleChangeI}
                                />
                                <h3>{direc.directions}</h3>
                            </div>
                        );
                    })}
                </fieldset>
                <button onClick={(e) => handleChangeI(e)}></button>
            </form>
            <h3>New address</h3>
            <form
                className='w-3/5 h-3/5 flex flex-col 2xl:w-3/5'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='relative my-4'>
                    <Autocomplete
                        className={
                            'outline-none p-2 w-full rounded text-gray-500  text-sm border border-gray-200'
                        }
                        apiKey={GOOGLE_MAPS_API_KEY}
                        onPlaceSelected={(place) => {
                            setPlaceSelected({
                                place: place,
                                name: place.name,
                                address: place.formatted_address,
                                state: place.address_components[4]?.long_name,
                                country: place.address_components[5]?.long_name,
                                cp: place.address_components[6]?.long_name || 'C3100',
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
                            types: ['address'],
                            // componentRestrictions: { country: 'ar' },
                        }}
                        placeholder='Eg: Av. Belgrano 3200'
                    />
                </div>
                <button type='submit'>Add address</button>
                <div className='h-36 mb-8'>
                    <InputMaps coord={placeSelected.coord} />
                </div>
                <div>
                    <div className='flex align-center items-center  gap-2 content-center justify-center absolute -top-6 left-0'></div>
                </div>
            </form>
        </div>
    );
}

export default Address;
