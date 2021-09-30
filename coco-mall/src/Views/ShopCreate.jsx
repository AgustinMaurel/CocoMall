import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';


function ShopCreate() {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        formState: { errors },
        register,
        setValue,
        getValues,
    } = useForm();

    const handleRegister = (data) => {
        //despacho a ruta
        setValue('storeName', '');
        setValue('address', '');       

    };

    return (
        <>
            <div className='flex flex-col text-center bg-gray-300'>
                <h3>Register</h3>

                <form onSubmit={handleSubmit(handleRegister)}>
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
                    />
                    
                    {errors.storeName && <p>{errors.storeName.message}</p>}

                    <input
                        {...register('address', {
                            required: { value: true, message: 'address is required' },
                            minLength: {
                                value: 4,
                                message: 'address must contain at least 4 characters',
                            },
                            maxLength: {
                                value: 15,
                                message: 'address must contain a maximum of 15 characters ',
                            },
                            pattern: {
                                value: /([A-Z]|[a-z])/g,
                                message: 'address can only be letters',
                            },
                        })}
                        type='text'
                        placeholder='address'
                        name='address'
                        autoComplete='off'
                    />
                    
                    {errors.address && <p>{errors.address.message}</p>}


                    <input
                        {...register('lastname', {
                            required: { value: true, message: 'lastname is required' },
                            minLength: {
                                value: 4,
                                message: 'lastname must contain at least 4 characters',
                            },
                            maxLength: {
                                value: 15,
                                message: 'lastname must contain a maximum of 15 characters ',
                            },
                            pattern: {
                                value: /([A-Z]|[a-z])/g,
                                message: 'lastname can only be letters',
                            },
                        })}
                        type='text'
                        placeholder='lastname'
                        name='lastname'
                        autoComplete='off'
                    />
                    
                    {errors.lastname && <p>{errors.lastname.message}</p>}
                    
                    <button type='submit'>Create store</button>
                    
                    
                </form>
            </div>
        </>
    )
}

export default ShopCreate


