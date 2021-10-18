import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router';

import {
    startFacebookLogin,
    startGoogleLogin,
    startRegisterWithEmailPasswordName,
} from '../../Redux/actions/auth';
import NavBar from '../../Components/NavBar/NavBar';
import LoginGoogleFacebook from './LoginGoogleFacebook';
import InputAuth from '../../Components/Inputs/InputAuth';
import validate from '../../Scripts/validate';
import InputPassword from '../../Components/Inputs/InputPassword';
import InputConfirm from '../../Components/Inputs/InputConfirm';
import InputLocation from '../../Components/Inputs/InputLocation';

const RegisterScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const renderCond = useSelector((state) => state.auth);
    const [placeSelected, setPlaceSelected] = useState({});
    const [remember, setRemember] = useState(false);

    const {
        handleSubmit,
        formState: { errors },
        register,
        setValue,
        getValues,
    } = useForm({
        defaultValues: {
            rememberForm: false,
        },
    });

    const handleRegister = (data) => {
        dispatch(
            startRegisterWithEmailPasswordName(
                data.email,
                data.password,
                data.name,
                data.lastName,
                placeSelected.state,
                placeSelected.country,
                data.rememberForm
            ),
        );
        //Antes de pusherlo a la home le tiro un Salert preguntando si quiere que se quede en remember en la cuenta
        history.push('/home');

        setValue('name', '');
        setValue('lastName', '');
        setValue('email', '');
        setValue('password', '');
        setValue('password2', '');
        setValue('rememberForm', false);
    };

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin(placeSelected.state, placeSelected.country, remember));
    };

    const handleFacebookLogin = () => {
        dispatch(startFacebookLogin(remember));
    };

    const handleChecked = () => {
        setRemember(!remember);
        setValue('rememberForm', !remember);
    };

    return (
        <div className='overflow-hidden h-screen'>
            <NavBar />
            {/* BACKGROUND */}
            <div>
                <div className='absolute right-0 -top-72 z-0'>
                    <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96  bg-primary-light rounded-tl-full border border-primary-light z-0 '></div>
                    <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96  bg-primary-light rounded-bl-full border border-primary-light z-0 '></div>
                </div>
                <div
                    className='h-14 w-14 z-0 bg-primary-light rounded-full absolute -left-10 bottom-0
                                                    xl:h-28 xl:w-28 xl:left-10 xl:top-32'
                ></div>
                <div
                    className='h-10 w-10 hidden bg-primary-light rounded-full absolute z-0 left-1/4 top-3/4
                                    xl:flex xl: xl:h-16 xl:w-16'
                ></div>
            </div>

            {/* CONTENT */}
            <div className='flex flex-col z-10 m-auto px-4 h-full max-w-md justify-start sm:justify-center items-center'>
                <div className='hidden sm:flex md:mb-4 text-2xl font-bold z-10'>
                    <h1>Register</h1>
                </div>

                <form className='w-full mb-6' onSubmit={handleSubmit(handleRegister)}>
                    <InputAuth
                        register={register}
                        errors={errors}
                        name='name'
                        type='text'
                        validate={validate.name}
                    />

                    <InputAuth
                        register={register}
                        errors={errors}
                        name='lastName'
                        type='text'
                        validate={validate.lastName}
                    />

                    <InputAuth
                        register={register}
                        errors={errors}
                        name='email'
                        type='text'
                        validate={validate.email}
                    />

                    <InputLocation setPlaceSelected={setPlaceSelected} />

                    <InputPassword
                        register={register}
                        errors={errors}
                        name='password'
                        validate={validate.password}
                    />

                    <InputConfirm
                        register={register}
                        errors={errors}
                        name='password'
                        getValues={getValues}
                    />

                    {!renderCond.uid && !renderCond.name ? (
                        <div>
                            <div className='hidden sm:flex items-center justify-between text-center text-cocoMall-100 my-3'>
                                {' '}
                                <span className='border w-1/3 mx-2'></span>
                                <p className='text-cocoMall-400 w-full'>Or register with</p>
                                <span className='border w-1/3 mx-2'></span>
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
                    {/* TOOGLE BUTTON SESSION ACTIVE*/}
                    <div className='flex items-center justify-between m-2'>
                        <p className='text-cocoMall-400 text-sm'>Do you want to stay logged in?</p>
                        <div className='relative inline-block w-8 align-middle select-none'>
                            <input
                                {...register('rememberForm')}
                                autoComplete='off'
                                className='toggle-checkbox absolute -top-1 block w-5 h-5 rounded-full bg-white border-2 border-gray-200 appearance-none cursor-pointer'
                                type='checkbox'
                                name='remember'
                                value={remember}
                                onChange={handleChecked}
                            />
                            <label className='toggle-label block overflow-hidden h-3 rounded-full bg-gray-300 cursor-pointer'></label>
                        </div>
                    </div>
                    <div className='flex flex-col mt-8 text-sm z-10 text-center items-center'>
                        <Link className='font-medium -mt-5 z-10' to='/auth/login'>
                            Already registered?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterScreen;
