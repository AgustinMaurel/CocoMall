import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { startRegisterWithEmailPasswordName, userInfo } from '../../Redux/actions/auth';
import InputAuth from '../../Components/Inputs/InputAuth';
import validate from '../../Scripts/validate';
import InputPassword from '../../Components/Inputs/InputPassword';
import InputConfirm from '../../Components/Inputs/InputConfirm';
import InputLocation from '../Inputs/InputLocation';

const EditUser = () => {
    const dispatch = useDispatch();
    const { uid, userInfoDB } = useSelector((state) => state.auth);
    const [placeSelected, setPlaceSelected] = useState({});

    const {
        handleSubmit,
        formState: { errors },
        register,
        setValue,
        getValues,
    } = useForm();

    useEffect(() => {
        dispatch(userInfo(uid));
    }, [dispatch, uid]);

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

        setValue('name', '');
        setValue('lastName', '');
        setValue('email', '');
        setValue('password', '');
        setValue('password2', '');
    };

    return (
        <div className='overflow-hidden h-screen '>
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
                    <h1>Profile Edit</h1>
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
                            defaultValue={userInfoDB[0]?.Name}
                        />
                    </div>

                    <div className='flex flex-col text-left'>
                        <InputAuth
                            register={register}
                            errors={errors}
                            name='lastName'
                            type='text'
                            validate={validate.lastName}
                            defaultValue={userInfoDB[0]?.LastName}
                        />
                    </div>

                    <div className='flex flex-col text-left'>
                        <InputAuth
                            register={register}
                            errors={errors}
                            name='email'
                            type='text'
                            validate={validate.email}
                            defaultValue={userInfoDB[0]?.Mail}
                        />
                    </div>

                    <div className='flex flex-col text-left'>
                        <InputLocation
                            setPlaceSelected={setPlaceSelected}
                            defaultValue={userInfoDB[0]?.State}
                        />
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

                    <div className='flex m-1 justify-center mt-5 cursor-pointer items-center content-center py-2 bg-secondary rounded text-white text-center z-10'>
                        <button className='text-sm font-semibold cursor-pointer' type='submit'>
                            Upgrade
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
