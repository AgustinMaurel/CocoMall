import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import InputDefault from '../Inputs/InputDefault';
import validate from '../../Scripts/validate';
import { postStore } from '../../Scripts/post';
import InputFile from '../Inputs/InputFile';
import { IMG_DEFAULT } from '../../Scripts/constants';
import Textarea from '../Inputs/Textarea';

import Autocomplete from 'react-google-autocomplete';
const GOOGLE_MAPS_API_KEY = 'AIzaSyBFiLTvogLQJxloGNs-gSm6f9kL4NKot_U';

function ShopCreate({ setIsTrue }) {
    //STATES
    const auth = useSelector((state) => state.auth);
    const userId = auth.uid;
    const [image, setImage] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);

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
        let storeCreated = { store: data, idUser: userId, idImage: image };
        setIsTrue(false);
        alert('Store Created!');
        console.log(storeCreated);
        dispatch(postStore(storeCreated));
    };

    return (
        <div className='flex flex-col text-center h-screen py-3 overflow-hidden relative'>
            <div className=' flex justify-center items-center m-auto p-8 z-10 '>
                <form
                    className='flex flex-col w-80 h-full p-8 focus-within:relative'
                    onSubmit={handleSubmit(handleRegister)}
                >
                    <div className='relative flex flex-col h-full justify-evenly   '>
                        <i>Create Store</i>
                        <Autocomplete
                            className={
                                'outline-none p-2 w-full rounded text-sm border border-gray-200'
                            }
                            apiKey={GOOGLE_MAPS_API_KEY}
                            onPlaceSelected={(place) => {
                                console.log('name: ', place.name);
                                console.log('adress: ', place.formatted_address);
                                console.log('lat: ', place.geometry.location.lat());
                                console.log('lon: ', place.geometry.location.lng());
                            }}
                            options={{
                                fields: ['formatted_address', 'geometry', 'name'],
                                types: ['establishment'],
                                componentRestrictions: { country: 'ar' },
                            }}
                            placeholder='Eg: Av. Belgrano 3200'
                        />
                        <InputDefault
                            register={register}
                            errors={errors}
                            name='storeName'
                            placeholder='Eg: Chilli King'
                            validate={validate.storeName}
                        />
                        <InputDefault
                            register={register}
                            errors={errors}
                            name='country'
                            placeholder='Eg: Argentina'
                            validate={validate.country}
                        />

                        <InputDefault
                            register={register}
                            errors={errors}
                            name='state'
                            placeholder='Eg: Buenos Aires'
                            validate={validate.state}
                        />

                        <InputDefault
                            register={register}
                            errors={errors}
                            name='address'
                            placeholder='Eg: Nuñez 3800'
                            validate={validate.address}
                        />

                        <InputDefault
                            register={register}
                            errors={errors}
                            name='cp'
                            placeholder='Eg: 1430'
                            validate={validate.cp}
                        />

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
                            name='image'
                            type='file'
                            validate={validate.image}
                            watch={watch}
                            onChange={handleImageChange}
                        />

                        <button type='submit' className='bg-secondary w-32 rounded h-8 text-white'>
                            Next
                        </button>
                    </div>
                </form>

                {/* --PREVIEW-- */}
                <div
                    className='hidden bg-white shadow-md rounded p-8 m-4 w-80 text-center
                                lg:block overflow-hidden'
                >
                    <img src={isUploaded ? image : IMG_DEFAULT} alt='img' />
                </div>
            </div>
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
