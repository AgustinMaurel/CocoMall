import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { startRegisterWithEmailPasswordName, userInfo } from '../../Redux/actions/auth';
import InputAuth from '../../Components/Inputs/InputAuth';
import validate from '../../Scripts/validate';
import InputPassword from '../../Components/Inputs/InputPassword';
import InputConfirm from '../../Components/Inputs/InputConfirm';
import InputLocation from '../Inputs/InputLocation';
import { UPDATE_USER, UPDATE_FIREBASE} from '../../Scripts/constants'
import { auth } from '../../firebase/firebaseConfig';

const EditUser = () => {
    const dispatch = useDispatch();
    const { uid, userInfoDB } = useSelector((state) => state.auth);
    const [placeSelected, setPlaceSelected] = useState({});

    const [flag, setFlag] = useState(false)

    const [statePass, setStatePass] = useState("")

    const {
        handleSubmit,
        formState: { errors },
        register,
        setValue,
        getValues,
    } = useForm();

    useEffect(() => {
        dispatch(userInfo(uid));
        setStatePass(auth.currentUser?._delegate.providerData[0].providerId)
    }, [dispatch, uid, flag]);


    const handleUpdate = (data) => {

        let dataUpdateUser = {
            Name: data.name,
            LastName: data.lastName,
            Mail: data.email,
            Country: placeSelected?.country,
            State: placeSelected?.state
        }
        auth.currentUser.updateProfile({ displayName: data.name })
        /* console.log(dataUpdateUser) */
        axios.put(`${UPDATE_USER}/${uid}`, {...dataUpdateUser})
        .then(()=> setFlag(!flag))
        
        axios.put(UPDATE_FIREBASE, {id:uid, act:{password:data.password, email:data.email}})
        

        setValue('name', '');
        setValue('lastName', '');
        setValue('email', '');
        setValue('password', '');
        setValue('password2', '');
    };
    console.log(placeSelected)
    return (
        <div className='overflow-hidden  '>
            {/* BACKGROUND */}
            <div className='absolute right-0 -top-72 md:-top-10 lg:top-28  '>
                <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96  bg-primary-light rounded-tl-full border border-primary-light z-0 '></div>
                <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96  bg-primary-light rounded-bl-full border border-primary-light z-0 '></div>
            </div>
            <div
                className='h-10 w-10 hidden bg-primary-light rounded-full absolute z-0 left-1/3 top-3/4
                                xl:flex xl: xl:h-16 xl:w-16'
            ></div>
            {/* CONTENT */}
            
                <form
                   className='flex flex-col w-12/12 z-1 items-center'
                    onSubmit={handleSubmit(handleUpdate)}
                >
                    <div className='flex flex-col w-4/12 text-left'>
                        <InputAuth
                            register={register}
                            errors={errors}
                            name='name'
                            type='text'
                            validate={validate.name}
                            defaultValue={userInfoDB?.Name}
                        />
                    </div>

                    <div className='flex flex-col w-4/12 text-left'>
                        <InputAuth
                            register={register}
                            errors={errors}
                            name='lastName'
                            type='text'
                            validate={validate.lastName}
                            defaultValue={userInfoDB?.LastName}
                        />
                    </div>

                    { statePass === 'password' ?
                    <div className='flex flex-col w-4/12 text-left'>
                        <InputAuth
                            register={register}
                            errors={errors}
                            name='email'
                            type='text'
                            validate={validate.email}
                            defaultValue={userInfoDB?.Mail}
                        />
                    </div> : false}

                    <div className='flex flex-col w-4/12 text-left '>
                        <InputLocation
                            setPlaceSelected={setPlaceSelected}
                            defaultValue={userInfoDB?.State}
                        />
                    </div>
                    
                   { statePass === 'password' ?
                   <>
                    <div className='flex flex-col w-4/12 text-left'>
                        <InputPassword
                            register={register}
                            errors={errors}
                            name='password'
                            validate={validate.password}
                        />
                    </div>

                    <div className='flex flex-col w-4/12 text-left'>
                        <InputConfirm
                            register={register}
                            errors={errors}
                            name='password'
                            getValues={getValues}
                        />
                    </div>
                    </> : false}

                    <div className='flex m-1 justify-center mt-5 cursor-pointer items-center content-center py-2 bg-secondary rounded text-white text-center z-10'>
                        <button className='text-sm font-semibold cursor-pointer' type='submit'>
                            Upgrade
                        </button>
                    </div>
                </form>
            
        </div>
    );
};

export default EditUser;
