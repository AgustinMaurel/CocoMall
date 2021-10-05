import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
//import Autocomplete from 'react-google-autocomplete';

import InputDefault from '../Inputs/InputDefault';
import validate from '../../Scripts/validate';
import { postStore } from '../../Scripts/post';
import InputFile from '../Inputs/InputFile';
import { IMG_DEFAULT } from '../../Scripts/constants';

//const GOOGLE_MAPS_API_KEY = 'AIzaSyBFiLTvogLQJxloGNs-gSm6f9kL4NKot_U';

function ShopCreate({setIsTrue}) {
    //Hacer un useSelector para tomar el id del usuario y asi linkearlo con la tienda que cree
    const auth = useSelector((state) => state.auth);
    const userId = auth.uid;

    //--HOOKS--
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ mode: 'onTouched' });

    //STATES
    const [image, setImage] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);

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

    //POST DATA PRODUCT & ID STORE
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

                        <InputDefault
                            register={register}
                            errors={errors}
                            name='storeName'
                            placeholder='Eg: Chilli King'
                            validate={validate.storeName}
                            watch={watch}
                        />
                        <InputDefault
                            register={register}
                            errors={errors}
                            name='country'
                            placeholder='Eg: Argentina'
                            validate={validate.country}
                            watch={watch}
                        />

                        <InputDefault
                            register={register}
                            errors={errors}
                            name='state'
                            placeholder='Eg: Buenos Aires'
                            validate={validate.state}
                            watch={watch}
                        />

                        <InputDefault
                            register={register}
                            errors={errors}
                            name='address'
                            placeholder='Eg: Nuñez 3800'
                            validate={validate.address}
                            watch={watch}
                        />

                        <InputDefault
                            register={register}
                            errors={errors}
                            name='cp'
                            placeholder='Eg: 1430'
                            validate={validate.cp}
                            watch={watch}
                        />

                        <div className='relative'>
                            <textarea
                                {...register('description', validate.descriptionStore)}
                                placeholder='Vegan food shop...'
                                name='description'
                                autoComplete='off'
                                className={
                                    errors.description
                                        ? 'border border-red-200 resize-none outline-none p-2 w-full rounded text-sm'
                                        : 'resize-none outline-none p-2 w-full rounded text-sm border border-gray-200'
                                }
                            />
                            {errors.description ? (
                                <p className='absolute text-xs text-red-500 -top-4 left-0 font-semibold'>
                                    {errors.description.message}
                                </p>
                            ) : (
                                <p className='absolute text-xs  min-w-max  -top-4 left-0 font-semibold'>
                                    Description*
                                </p>
                            )}
                        </div>

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

/*

                    <Autocomplete
                        apiKey={GOOGLE_MAPS_API_KEY}
                        style={{ width: '90%' }}
                        onPlaceSelected={(place) => {
                            console.log(place);
                        }}
                        options={{
                            types: ['(regions)'],
                            componentRestrictions: { country: 'ar' },
                        }}
                        defaultValue='Paraná'
                    />

*/
