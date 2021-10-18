import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    startLoginEmailPassword,
    startGoogleLogin,
    startFacebookLogin,
    rememberAction
} from '../../Redux/actions/auth';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import NavBar from '../../Components/NavBar/NavBar';
import { useHistory } from 'react-router';
import LoginGoogleFacebook from './LoginGoogleFacebook';

const LoginScreen = () => {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm();

    const [viewPass, setViewPass] = useState('password');

    const renderCond = useSelector((state) => state.auth);

    const history = useHistory();

    const handleLogin = (data) => {
        dispatch(startLoginEmailPassword(data.email, data.password));
        history.push('/home');
        setValue('email', '');
        setValue('password', '');
    };

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    };

    const handleFacebookLogin = () => {
        dispatch(startFacebookLogin());
    };

    return (
        <div className='h-screen overflow-hidden '>
            <NavBar />
            <div className='absolute right-0 -top-72 md:-top-10 lg:top-28  overflow-hidden'>
                <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96  bg-primary-light rounded-tl-full border border-primary-light'></div>
                <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96  bg-primary-light rounded-bl-full border border-primary-light '></div>
            </div>
            <div
                className='h-10 w-10 hidden bg-primary-light rounded-full absolute z-0 left-1/3 top-3/4
                        xl:flex xl: xl:h-16 xl:w-16'
            ></div>
            <div
                className='h-14 w-14 z-0 hi bg-primary-light rounded-full absolute left-20 bottom-9
                                        xl:h-28 xl:w-28 xl:left-52 xl:top-32'
            ></div>

            {!renderCond.uid && !renderCond.name ? (
                <div className='flex flex-col gap-10 mt-10 sm:mt-28 md:w-2/3 xl:w-8/12 items-center z-10 '>
                    <div className='flex-col  text-left  font-bold z-1 relative'>
                        <h1 className='relative text-2xl'>Login in to your account</h1>
                    </div>

                    <form className='grid grid-col-1 m-10' onSubmit={handleSubmit(handleLogin)}>
                        <div className='flex flex-col text-left z-10'>
                            <label className='text-gray-500 text-base ml-1 '>Email Address</label>

                            <div className='flex m-1 border bg-white border-gray-200 shadow-md rounded z-10'>
                                <input
                                    className='outline-none text-xs z-10 p-2 w-full'
                                    {...register('email', {
                                        required: { value: true, message: 'Email is required' },
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

                        <div className='flex flex-col text-left z-10'>
                            <label className='text-gray-500 text-base ml-1'>Password</label>

                            <div className='flex justify-between m-1 border bg-white border-gray-200 shadow-md rounded z-10'>
                                <input
                                    className='outline-none text-xs z-10 p-2 w-full'
                                    {...register('password', {
                                        required: { value: true, message: 'Password is required' },
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
                                <p className=' m-1 text-red-600 text-xs bg-red-100 rounded p-0.5'>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className='m-1 mt-10 z-10'>
                            <div className='flex justify-center items-center content-center py-2 bg-secondary rounded text-white text-center z-10'>
                                <button
                                    className='text-sm font-semibold cursor-pointer  relative w-full'
                                    type='submit'
                                >
                                    Log In
                                </button>
                            </div>
                            {/* LOGIN GOOGLE & FACEBOOK */}

                            <div>
                                <div className='flex items-center justify-between text-center text-cocoMall-100 my-3'>
                                    {/* <AiOutlineLine className='w-full object-fill'/><p> or </p><AiOutlineLine className='w-full'/> */}
                                    <span className='border w-1/3 mx-2'></span>
                                    <p className='text-cocoMall-400 w-full'>Or log in with</p>
                                    <span className='border w-1/3 mx-2'></span>
                                </div>
                                <LoginGoogleFacebook
                                    handleGoogleLogin={handleGoogleLogin}
                                    handleFacebookLogin={handleFacebookLogin}
                                />
                            </div>
                        </div>
                        <div className='flex mt-10 text-sm z-10 items-center text-center justify-center'>
                            <label className='ml-1 font-medium'>Not a member ? </label>
                            <Link className='text-secondary font-semibold ml-2' to='/auth/register'>
                                {' '}
                                Sign up
                            </Link>
                        </div>
                    </form>
                </div>
            ) : (
                history.push('/home')
            )}
        </div>
    );
};

export default LoginScreen;
