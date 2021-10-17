import React from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Autocomplete from 'react-google-autocomplete';

import {
    startFacebookLogin,
    startGoogleLogin,
    startRegisterWithEmailPasswordName,
} from '../../Redux/actions/auth';
import NavBar from '../../Components/NavBar/NavBar';
import LoginGoogleFacebook from './LoginGoogleFacebook';
import { GOOGLE_MAPS_API_KEY } from '../../Scripts/constants';
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

    const {
        handleSubmit,
        formState: { errors },
        register,
        setValue,
        getValues,
    } = useForm();

    const handleRegister = (data) => {
        dispatch(
            startRegisterWithEmailPasswordName(
                data.email,
                data.password,
                data.name,
                data.lastName,
                placeSelected.state,
                placeSelected.country,
            ),
        );

        history.push('/home');

        setValue('name', '');
        setValue('lastName', '');
        setValue('email', '');
        setValue('password', '');
        setValue('password2', '');
    };

    const handleGoogleLogin = () => {
        setIsOpen(false);
        dispatch(startGoogleLogin(placeSelected.state, placeSelected.country));
    };

    const handleFacebookLogin = () => {
        dispatch(startFacebookLogin());
    };

    //map
    console.log(placeSelected);

    //modal
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
        },
    };

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

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
            {!modalIsOpen ? (
                <div className='flex flex-col  z-1  items-center md:mt-28 sm:w-9/12 lg:w-8/12 xl:w-8/12'>
                    <div className='flex-col text-2xl text-left  font-bold z-10'>
                        <h1>Register</h1>
                    </div>

                    <form
                        className='grid grid-col-1 m-5 z-10 w-9/12 sm:w-9/12 lg:w-6/12 xl:w-3/12'
                        onSubmit={handleSubmit(handleRegister)}
                    >
                        <div className='flex flex-col text-left'>
                            <InputAuth
                                register={register}
                                errors={errors}
                                name='name'
                                type='text'
                                validate={validate.name}
                            />
                        </div>

                        <div className='flex flex-col text-left'>
                            <InputAuth
                                register={register}
                                errors={errors}
                                name='lastName'
                                type='text'
                                validate={validate.lastName}
                            />
                        </div>

                        <div className='flex flex-col text-left'>
                            <InputAuth
                                register={register}
                                errors={errors}
                                name='email'
                                type='text'
                                validate={validate.email}
                            />
                        </div>

                        <div className='flex flex-col text-left'>
                            <InputLocation setPlaceSelected={setPlaceSelected} />
                        </div>

                        <div className='flex flex-col text-left'>
                            <InputPassword
                                register={register}
                                errors={errors}
                                name='password'
                                validate={validate.password}
                            />
                        </div>

                        <div className='flex flex-col text-left'>
                            <InputConfirm
                                register={register}
                                errors={errors}
                                name='password'
                                getValues={getValues}
                            />
                        </div>

                        {!renderCond.uid && !renderCond.name ? (
                            <div>
                                <div className='flex items-center justify-between text-center text-cocoMall-100 my-3'>
                                    {/* <AiOutlineLine className='w-full object-fill'/><p> or </p><AiOutlineLine className='w-full'/> */}
                                    <span className='border w-1/3 mx-2'></span>
                                    <p className='text-cocoMall-400 w-full'>Or register with</p>
                                    <span className='border w-1/3 mx-2'></span>
                                </div>
                                <LoginGoogleFacebook
                                    handleGoogleLogin={openModal}
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
                            <Link
                                className='font-semibold text-secondary -mt-5 z-10'
                                to='/auth/login'
                            >
                                Already registered?
                            </Link>
                        </div>
                    </form>
                </div>
            ) : (
                <ReactModal
                    isOpen={modalIsOpen}
                    onRequestClose={handleGoogleLogin}
                    style={customStyles}
                    className='flex flex-col justify-between rounded-md focus:outline-none bg-white shadow-lg p-4 absolute w-1/6 h-2/6 top-0 bottom-0 right-0 left-0 m-auto'
                >
                    <div className='flex-col text-2xl text-left  font-bold z-10'>
                        <h3>Please,</h3>
                        <p>complete your city</p>
                    </div>
                    {/* input google cities */}
                    <div className='flex flex-col text-left'>
                        <label className='text-gray-500 text-base ml-1 '>Location</label>
                        <div className='flex justify-between m-1 border bg-white border-gray-200 shadow-md rounded z-10'>
                            <Autocomplete
                                className={'outline-none text-xs z-10 p-2 w-full'}
                                apiKey={GOOGLE_MAPS_API_KEY}
                                onPlaceSelected={(place) => {
                                    setPlaceSelected({
                                        //place: place,
                                        state: place.address_components[0]?.long_name,
                                        country:
                                            place.address_components[
                                                place.address_components.length - 1
                                            ]?.long_name,
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
                                    // componentRestrictions: { country: 'ar' },
                                }}
                                placeholder=''
                            />
                        </div>
                    </div>
                    <div className='flex m-1 justify-center mt-5 cursor-pointer items-center content-center py-2 bg-secondary rounded text-white text-center z-10'>
                        <button
                            className='text-sm font-semibold cursor-pointer'
                            onClick={handleGoogleLogin}
                        >
                            continue
                        </button>
                    </div>
                </ReactModal>
            )}
        </div>
    );
};

export default RegisterScreen;
