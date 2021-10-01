import React, { useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import NavBar from '../Components/NavBar';

function ShopCreate() {
    //Hacer un useSelector para tomar el id del usuario y asi linkearlo con la tienda que cree
    const [image, setImage] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);

    const {
        handleSubmit,
        formState: { errors },
        register,
        setValue,
        // getValues,
    } = useForm();

    const handleImageChange = (e) => {
    
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = (e) => {
                setImage(e.target.result);
                setIsUploaded(true);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleRegister = (data) => {
        console.log(setImage);
        
        //despacho a ruta
        axios
            .post('http://localhost:3001/store/create', data)
            .then(() => {
                setValue('storeName', '');
                setValue('address', '');
                setValue('country', '');
                setValue('cp', '');
                setValue('description', '');
                setValue('image', '');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='flex flex-col text-center bg-primary-light h-screen py-3'>
            <div className='px-5'>
                <NavBar />
            </div>
            <form
                className='flex flex-col w-80 h-3/4 my-auto relative mx-auto '
                onSubmit={handleSubmit(handleRegister)}
            >
                <div className='relaitve bg-gray-200 rounded  shadow flex flex-col h-full justify-evenly px-8 '>
                    <i>Create Store</i>
                    <div className='relative'>
                        <input
                            {...register('storeName', {
                                required: { value: true, message: 'Store name is required' },
                                minLength: {
                                    value: 4,
                                    message: 'Store must contain at least 4 characters',
                                },
                                maxLength: {
                                    value: 15,
                                    message: 'Store must contain a maximum of 15 characters ',
                                },
                                pattern: {
                                    value: /([A-Z]|[a-z])/g,
                                    message: 'Store can only be letters',
                                },
                            })}
                            type='text'
                            placeholder='Name'
                            name='storeName'
                            autoComplete='off'
                            className='outline-none p-2 w-full rounded text-sm'
                        />
                        {errors.storeName && <p className='absolute text-xs text-red-500 -top-4 left-0'>{errors.storeName.message}</p>}
                    </div>

                    <div className='relative'>
                        <input
                            {...register('country', {
                                required: { value: true, message: 'Country is required' },
                                minLength: {
                                    value: 4,
                                    message: 'Country must contain at least 4 characters',
                                },
                                maxLength: {
                                    value: 15,
                                    message: 'Country must contain a maximum of 15 characters ',
                                },
                                pattern: {
                                    value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1](\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/gm,
                                    message: 'Country can only be letters',
                                },
                            })}
                            type='text'
                            placeholder='Country'
                            name='country'
                            autoComplete='off'
                            className='outline-none p-2 w-full rounded text-sm'
                        />
                        {errors.country && <p className='absolute text-xs text-red-500 -top-4 left-0'>{errors.country.message}</p>}
                    </div>

                    <div className='relative'>
                        <input
                            {...register('address', {
                                required: { value: true, message: 'Address is required' },
                                minLength: {
                                    value: 4,
                                    message: 'Address must contain at least 4 characters',
                                },
                                maxLength: {
                                    value: 15,
                                    message: 'Address must contain a maximum of 15 characters ',
                                },
                                pattern: {
                                    value: /[A-Za-zÀ-ÖØ-öø-ÿ]+[ ][0-9]+/i,
                                    message: 'Wrong adress type',
                                },
                            })}
                            type='text'
                            placeholder='Address (Eg: Nuñez 3805)'
                            name='address'
                            autoComplete='off'
                            className='outline-none p-2 w-full rounded text-sm'
                        />
                        {errors.address && <p className='absolute text-xs text-red-500 -top-4 left-0'>{errors.address.message}</p>}
                    </div>

                    <div className='relative'>
                        <input
                            {...register('cp', {
                                required: { value: true, message: 'Area Code is required' },
                                minLength: {
                                    value: 4,
                                    message: 'Area Code must contain at least 4 numbers',
                                },
                                maxLength: {
                                    value: 15,
                                    message: 'Area Code must contain a maximum of 15 numbers ',
                                },
                                pattern: {
                                    value: /^\d+$/gm,
                                    message: 'Wrong postal code',
                                },
                            })}
                            type='text'
                            placeholder='Area Code (Eg: 1430)'
                            name='cp'
                            autoComplete='off'
                            className='outline-none p-2 w-full rounded text-sm'
                        />
                        {errors.cp && <p className='absolute text-xs text-red-500 -top-4 left-0'>{errors.cp.message}</p>}
                    </div>

                    <div className='relative'>
                        <textarea
                            {...register('description', {
                                required: { value: true, message: 'Description is required' },
                                minLength: {
                                    value: 4,
                                    message: 'Description must contain at least 4 characters',
                                },
                                maxLength: {
                                    value: 255,
                                    message: 'Description must contain a maximum of 255 characters ',
                                },
                            })}
                            placeholder='Description'
                            name='description'
                            autoComplete='off'
                            className='resize-none outline-none p-2 w-full rounded text-sm'
                        />
                        {errors.description && (
                            <p className='absolute text-xs text-red-500 -top-4 left-0'>{errors.description.message}</p>
                        )}
                    </div>

                    <div className='relative'>
                        <input
                            {...register('image', {
                                required: { value: true, message: 'Image is required' },
                            })}
                            type='file'
                            name='image'
                            className='outline-none p-2 w-full rounded'
                            id='selectedFile'
                            accept='.png'
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <input
                            type='button'
                            value='Select Image'
                            onClick={() => document.getElementById('selectedFile').click()}
                            className='bg-white text-gray-400 outline-none p-2 w-full rounded'
                            onChange={handleImageChange}
                        />
                        {errors.image && <p className='absolute text-xs text-red-500 -top-4 left-0'>{errors.image.message}</p>}
                    </div>

                    <button type='submit' className='bg-secondary w-32 rounded h-8 text-white'>
                        Create store
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ShopCreate;
