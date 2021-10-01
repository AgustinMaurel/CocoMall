import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { startRegisterWithEmailPasswordName } from '../../Redux/actions/auth';

const RegisterScreen = () => {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        formState: { errors },
        register,
        setValue,
        getValues,
    } = useForm();

    const handleRegister = (data) => {
        dispatch(
            startRegisterWithEmailPasswordName(data.email, data.password, data.name, data.lastName),
        );
        setValue('name', '');
        setValue('lastName', '');
        setValue('email', '');
        setValue('password', '');
        setValue('password2', '');
    };

    return (
        <>
            <div className='flex flex-col mt-20 md:mt-28 md:w-2/3 xl:w-2/4 items-center z-10'>
                <div className='flex-col m-8 font-bold'>
                    <h1>Register</h1>
                </div>
                <div className='flex relative w-100 content-center justify-between mx-auto items-center '>
                <div
                    className='h-16 w-16 bg-primary-light   rounded-full absolute z-0 left-10 top-10
                xl:h-28 xl:w-28 xl:left-52 xl:top-32'
                ></div>
                <div
                    className='h-10 w-10 bg-primary-light rounded-full absolute z-0 left-1/3
                                 xl:h-14 xl:w-14'
                ></div>
                <div className='h-24 w-24 bg-primary-light rounded-full absolute z-0 left-2/3 top-60 xl:h-60 xl:w-60'></div>
            </div>
                <form onSubmit={handleSubmit(handleRegister)} className='grid grid-col-1 m-10 z-10'>
                    <div className='flex flex-col text-left'>
                        <input
                            className='m-2 border border-gray-200 shadow-md rounded outline-none'
                            {...register('name', {
                                required: { value: true, message: 'name is required' },
                                minLength: {
                                    value: 4,
                                    message: 'name must contain at least 4 characters',
                                },
                                maxLength: {
                                    value: 15,
                                    message: 'name must contain a maximum of 15 characters ',
                                },
                                pattern: {
                                    value: /^[A-Za-z\s]+$/,
                                    message: 'name can only be letters',
                                },
                            })}
                            type='text'
                            placeholder='Name'
                            name='name'
                            autoComplete='off'
                        />
                        {errors.name && (
                            <span className=' m-1 text-red-600 text-xs bg-red-100 rounded p-0.5'>
                                {errors.name.message}
                            </span>
                        )}
                    </div>
                    <div className='flex flex-col text-left'>
                        <input
                            className='m-2 border border-gray-200 shadow-md rounded outline-none'
                            {...register('lastName', {
                                required: { value: true, message: 'lastName is required' },
                                minLength: {
                                    value: 4,
                                    message: 'lastName must contain at least 4 characters',
                                },
                                maxLength: {
                                    value: 15,
                                    message: 'lastName must contain a maximum of 15 characters ',
                                },
                                pattern: {
                                    value: /^[A-Za-z\s]+$/,
                                    message: 'lastName can only be letters',
                                },
                            })}
                            type='text'
                            placeholder='lastName'
                            name='lastName'
                            autoComplete='off'
                        />
                        {errors.lastName && (
                            <span className=' m-1 text-red-600 text-xs bg-red-100 rounded p-0.5'>
                                {errors.lastName.message}
                            </span>
                        )}
                    </div>
                    <div className='flex flex-col text-left'>
                        <input
                            className='m-2 border border-gray-200 shadow-md rounded outline-none'
                            {...register('email', {
                                required: { value: true, message: 'email is required' },
                                pattern: {
                                    value: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
                                    message: 'email is invalid',
                                },
                            })}
                            type='text'
                            placeholder='Email'
                            name='email'
                            autoComplete='off'
                        />
                        {errors.email && (
                            <span className=' m-1 text-red-600 text-xs bg-red-100 rounded p-0.5'>
                                {errors.email.message}
                            </span>
                        )}
                    </div>
                    <div className='flex flex-col text-left'>
                        <input
                            className='m-2 border border-gray-200 shadow-md rounded outline-none'
                            {...register('password', {
                                required: { value: true, message: 'password is required' },
                                minLength: {
                                    value: 6,
                                    message: 'password must contain at least 8 characters',
                                },
                                maxLength: {
                                    value: 16,
                                    message: 'password must contain a maximum of 16 characters ',
                                },
                                pattern: {
                                    value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                                    message:
                                        'Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters',
                                },
                            })}
                            type='password'
                            placeholder='Password'
                            name='password'
                        />
                        {errors.password && (
                            <span className=' m-1 text-red-600 text-xs bg-red-100 rounded p-0.5'>
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <div className='flex flex-col text-left'>
                        <input
                            className='m-2 border border-gray-200 shadow-md rounded outline-none'
                            {...register('password2', {
                                validate: (value) =>
                                    value === getValues('password') || 'Passwords do not match',
                            })}
                            type='password'
                            placeholder='Confirm password'
                            name='password2'
                        />

                        {errors.password2 && (
                            <span className=' m-1 text-red-600 text-xs bg-red-100 rounded p-0.5'>
                                {errors.password2.message}
                            </span>
                        )}
                    </div>

                    <div className='bg-secondary rounded text-white text-center mt-5'>
                                <button className="text-sm cursor-pointer" type="submit">Register</button>
                            </div>

                </form>
                    <Link className="text-secondary -mt-5 z-10" to='/auth/login'>Already registered?</Link>
            </div>
        </>
    );
};

export default RegisterScreen;
