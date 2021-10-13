import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router';
import {AiOutlineLine} from 'react-icons/ai'

import {
    startFacebookLogin,
    startGoogleLogin,
    startRegisterWithEmailPasswordName,
} from '../../Redux/actions/auth';
import NavBar from '../../Components/NavBar/NavBar';
import LoginGoogleFacebook from './LoginGoogleFacebook';

const RegisterScreen = () => {
    const dispatch = useDispatch();

    const history = useHistory();

    const [viewPass, setViewPass] = useState('password');
    const [viewPassConfirm, setViewPassConfirm] = useState('password');
    const renderCond = useSelector((state) => state.auth);

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

        history.push('/home');

        setValue('name', '');
        setValue('lastName', '');
        setValue('email', '');
        setValue('password', '');
        setValue('password2', '');
    };

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    };

    const handleFacebookLogin = () => {
        dispatch(startFacebookLogin());
    };

    return (
        <div className='overflow-hidden h-screen '>
            <NavBar />

            {/* BACKGROUND */}
            <div className='absolute right-0 -top-72 md:-top-10 lg:top-28  '>
                <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96  bg-primary-light rounded-tl-full border border-primary-light z-0 '></div>
                <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96  bg-primary-light rounded-bl-full border border-primary-light z-0 '></div>
            </div>
            <div
                className='h-14 w-14 z-0 hi bg-primary-light rounded-full absolute left-16 top-3/4
                                                xl:h-28 xl:w-28 xl:left-52 xl:top-32'
            ></div>
            <div
                className='h-10 w-10 hidden bg-primary-light rounded-full absolute z-0 left-1/3 top-3/4
                                xl:flex xl: xl:h-16 xl:w-16'
            ></div>

            {/* CONTENT */}
            <div className='flex flex-col  z-1  items-center md:mt-28 sm:w-9/12 lg:w-8/12 xl:w-8/12'>
                <div className='flex-col text-2xl text-left  font-bold z-10'>
                    <h1>Register</h1>
                </div>

                <form
                    className='grid grid-col-1 m-5 z-10 w-9/12 sm:w-9/12 lg:w-6/12 xl:w-3/12'
                    onSubmit={handleSubmit(handleRegister)}
                >
                    <div className='flex flex-col text-left'>
                        <label className='text-gray-500 text-base ml-1 '>Name</label>

                        <div className='flex m-1 border bg-white border-gray-200 shadow-md rounded z-10'>
                            <input
                                className='outline-none text-xs z-10 p-2 w-full'
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
                                name='name'
                                autoComplete='off'
                            />
                        </div>

                        {errors.name && (
                            <span className=' m-1 text-red-600 text-xs bg-red-100 rounded p-0.5'>
                                {errors.name.message}
                            </span>
                        )}
                    </div>

                    <div className='flex flex-col text-left'>
                        <label className='text-gray-500 text-base ml-1 '>LastName</label>

                        <div className='flex m-1 border bg-white border-gray-200 shadow-md rounded z-10'>
                            <input
                                className='outline-none text-xs z-10 p-2 w-full'
                                {...register('lastName', {
                                    required: { value: true, message: 'lastName is required' },
                                    minLength: {
                                        value: 4,
                                        message: 'lastName must contain at least 4 characters',
                                    },
                                    maxLength: {
                                        value: 15,
                                        message:
                                            'lastName must contain a maximum of 15 characters ',
                                    },
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,
                                        message: 'lastName can only be letters',
                                    },
                                })}
                                type='text'
                                name='lastName'
                                autoComplete='off'
                            />
                        </div>
                        {errors.lastName && (
                            <span className=' m-1 text-red-600 text-xs bg-red-100 rounded p-0.5'>
                                {errors.lastName.message}
                            </span>
                        )}
                    </div>

                    <div className='flex flex-col text-left'>
                        <label className='text-gray-500 text-base ml-1 '>Email Address</label>

                        <div className='flex m-1 border bg-white border-gray-200 shadow-md rounded z-10'>
                            <input
                                className='outline-none text-xs z-10 p-2 w-full'
                                {...register('email', {
                                    required: { value: true, message: 'email is required' },
                                    pattern: {
                                        value: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
                                        message: 'email is invalid',
                                    },
                                })}
                                type='text'
                                name='email'
                                autoComplete='off'
                            />
                        </div>
                        {errors.email && (
                            <span className=' m-1 text-red-600 text-xs bg-red-100 rounded p-0.5'>
                                {errors.email.message}
                            </span>
                        )}
                    </div>
                    <div className='flex flex-col text-left'>
                        <label className='text-gray-500 text-base ml-1 '>Password</label>

                        <div className='flex justify-between m-1 border bg-white border-gray-200 shadow-md rounded z-10'>
                            <input
                                className='outline-none text-xs z-10 p-2 w-full'
                                {...register('password', {
                                    required: { value: true, message: 'password is required' },
                                    minLength: {
                                        value: 6,
                                        message: 'password must contain at least 8 characters',
                                    },
                                    maxLength: {
                                        value: 16,
                                        message:
                                            'password must contain a maximum of 16 characters ',
                                    },
                                    pattern: {
                                        value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                                        message:
                                            'Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters',
                                    },
                                })}
                                type={viewPass}
                                name='password'
                            />
                            <div
                                onClick={() =>
                                    viewPass === 'text'
                                        ? setViewPass('password')
                                        : setViewPass('text')
                                }
                                className='flex flex-col justify-center text-center cursor-pointer z-10 pr-2'
                            >
                                {viewPass === 'text' ? (
                                    <svg
                                        className='w-5 h-5 text-gray-400'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                        ></path>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                        ></path>
                                    </svg>
                                ) : (
                                    <svg
                                        className='w-5 h-5 text-gray-400'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                                        ></path>
                                    </svg>
                                )}
                            </div>
                        </div>

                        {errors.password && (
                            <span className=' m-1 text-red-600 text-xs bg-red-100 rounded p-0.5'>
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    <div className='flex flex-col text-left'>
                        <label className='text-gray-500 text-base ml-1 '>Confirm Password</label>

                        <div className='flex justify-between m-1 border bg-white border-gray-200 shadow-md rounded z-10'>
                            <input
                                className='outline-none text-xs z-10 p-2 w-full'
                                {...register('password2', {
                                    validate: (value) =>
                                        value === getValues('password') || 'Passwords do not match',
                                })}
                                type={viewPassConfirm}
                                name='password2'
                            />
                            <div
                                onClick={() =>
                                    viewPassConfirm === 'text'
                                        ? setViewPassConfirm('password')
                                        : setViewPassConfirm('text')
                                }
                                className='flex flex-col justify-center text-center cursor-pointer z-10 pr-2'
                            >
                                {viewPassConfirm === 'text' ? (
                                    <svg
                                        className='w-5 h-5 text-gray-400'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                        ></path>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                        ></path>
                                    </svg>
                                ) : (
                                    <svg
                                        className='w-5 h-5 text-gray-400'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                                        ></path>
                                    </svg>
                                )}
                            </div>
                        </div>

                        {errors.password2 && (
                            <span className=' m-1 text-red-600 text-xs bg-red-100 rounded p-0.5'>
                                {errors.password2.message}
                            </span>
                        )}
                    </div>
                    {!renderCond.uid && !renderCond.name ? (
                        <div>
                            <div className='flex items-center justify-between text-center text-cocoMall-100 my-3'>
                                {/* <AiOutlineLine className='w-full object-fill'/><p> or </p><AiOutlineLine className='w-full'/> */}
                                <span className='border w-1/3 mx-2'></span><p className='text-cocoMall-400 w-full'>Or register with</p><span className='border w-1/3 mx-2'></span>
                            </div>
                            <LoginGoogleFacebook
                                handleGoogleLogin={handleGoogleLogin}
                                handleFacebookLogin={handleFacebookLogin}
                            />
                        </div>
                    ) : (
                        history.push('/home')
                    )}
                    <div className='flex m-1 justify-center mt-5 cursor-pointer items-center content-center py-2 bg-secondary rounded text-white text-center z-10'>
                        <button className='text-sm font-semibold cursor-pointer' type='submit'>
                            Register
                        </button>
                    </div>
                    <div className='flex flex-col mt-8 text-sm z-10 text-center items-center'>
                        <Link className='font-semibold text-secondary -mt-5 z-10' to='/auth/login'>
                            Already registered?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterScreen;
