import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import InputDefault from '../Inputs/InputDefault';
import validate from '../../Scripts/validate';
import InputFile from '../Inputs/InputFile';
import Textarea from '../Inputs/Textarea';

import Autocomplete from 'react-google-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '../../Scripts/constants.js';
import { postStore } from '../../Redux/actions/post';
//import InputMaps from '../Inputs/InputMaps';

function ShopCreate({ setIsTrue }) {
    //STATES
    const auth = useSelector((state) => state.auth);
    const userId = auth.uid;
    const [image, setImage] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const [placeSelected, setPlaceSelected] = useState('');
    //useSelector para traerme el idStore Creado "storeCreated"

    //--HOOKS--
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ mode: 'onTouched' });

    //LOAD IMAGE
    const handleImageChange = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
            setIsUploaded(true);
        };
    };

    //POST DATA STORE & ID USER
    const handleRegister = (data) => {
        console.log(placeSelected.place);
        let store = {
            storeName: data.storeName,
            description: data.description,
            address: placeSelected.name,
            country: placeSelected.country,
            cp: placeSelected.cp,
            state: placeSelected.state,
            coord: placeSelected.coord,
        };
        let storeCreated = { store: store, idUser: userId, idImage: image };
        setIsTrue(false);
        alert('Store Created!');
        console.log(storeCreated);
        dispatch(postStore(storeCreated));
    };

    return (
        <div
            className='h-full w-full flex justify-center items-center m-auto
                        xl:w-1/2'
        >
            <form className='w-4/5 flex flex-col 2xl:w-3/5' onSubmit={handleSubmit(handleRegister)}>
                <h3 className='sm:mb-10 text-2xl md:text-3xl'>Create your Store</h3>
                <br />

                <InputDefault
                    register={register}
                    errors={errors}
                    name='storeName'
                    placeholder='Eg: Chilli King'
                    validate={validate.storeName}
                />

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
                    <div>
                        <div className='flex align-center items-center  gap-2 content-center justify-center absolute -top-6 left-0'>
                            <p className='min-w-max'> Address</p>
                        </div>
                    </div>
                </div>

                {/* <InputMaps coord={placeSelected.coord} /> */}

                <Textarea
                    register={register}
                    errors={errors}
                    name='description'
                    placeholder='Vegan food shop...'
                    validate={validate.descriptionStore}
                />

                <InputFile
                    register={register}
                    errors={errors}
                    name='logo'
                    type='file'
                    validate={validate.image}
                    watch={watch}
                    onChange={handleImageChange}
                    isUploaded={isUploaded}
                />

                <button type='submit' className='w-full bg-secondary rounded my-4 p-2 text-white'>
                    Next
                </button>
            </form>
        </div>
    );
}

export default ShopCreate;

// {/* <div
//             className='h-20 w-20 bg-primary-light rounded-full absolute z-0 left-12 -top-10
//             xl:h-28 xl:w-28 xl:left-52 xl:top-32'
//         ></div>
//         <div
//             className='h-40 w-40 bg-primary-light rounded-full absolute z-0 -left-12 -bottom-12
//             xl:h-28 xl:w-28 xl:left-52 xl:top-32'
//         ></div>
//         <div
//             className='h-52 w-52 bg-primary-light rounded-full absolute z-0 -right-12 top-40
//             xl:h-28 xl:w-28 xl:left-52 xl:top-32'
//         ></div> */}

// {/* <InputDefault
//     register={register}
//     errors={errors}
//     name='country'
//     placeholder='Eg: Argentina'
//     validate={validate.country}
// />

// <InputDefault
//     register={register}
//     errors={errors}
//     name='state'
//     placeholder='Eg: Buenos Aires'
//     validate={validate.state}
// />

// <InputDefault
//     register={register}
//     errors={errors}
//     name='address'
//     placeholder='Eg: Nuñez 3800'
//     validate={validate.address}
// />

// <InputDefault
//     register={register}
//     errors={errors}
//     name='cp'
//     placeholder='Eg: 1430'
//     validate={validate.cp}
// /> */}
