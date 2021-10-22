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
        <div className='w-full h-full m-auto flex items-center justify-around '>
            <form className='w-2/5 h-2/5 flex flex-col 2xl:w-2/6 2xl:h-full '>
                <h3 className='text-primary font-bold text-lg'>Select your address</h3>
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
                                <h3 className='text-sm pl-2 py-2'>{direc.directions}</h3>
                            </div>
                        );
                    })}
                </fieldset>
                <button onClick={(e) => handleChangeI(e)}></button>
            </form>

            <div className=' flex flex-col 2xl:w-4/6 2xl:h-full'>
                <h3 className='text-primary font-bold text-lg '>New address</h3>
                <form className='w-full  flex flex-col ' onSubmit={handleSubmit(onSubmit)}>
                    <div className='relative w-full flex gap-2 items-center my-4'>
                        <Autocomplete
                            className={
                                'outline-none p-2 w-3/4 rounded text-gray-500  text-sm border border-gray-200'
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
                        <div>
                            <button type='submit' className=' font-bold '>Add </button>
                        </div>
                    </div>

                    <div className='h-56  w-full '>
                        <InputMaps coord={placeSelected.coord} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Address;
