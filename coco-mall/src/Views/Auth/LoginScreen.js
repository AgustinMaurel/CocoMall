import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLoginEmailPassword, startGoogleLogin, startLogout, startFacebookLogin } from '../../Redux/actions/auth';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { FiEye } from "react-icons/fi";

const LoginScreen = () => {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm();

    const [viewPass, setViewPass] = useState("password")

    const renderCond = useSelector(state => state.auth)

    const handleLogin = (data) => {
        console.log(data);
        dispatch(startLoginEmailPassword(data.email, data.password));
        setValue('email', '');
        setValue('password', '');

    };

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    };

    const handleFacebookLogin = () => {
        dispatch(startFacebookLogin())
    }

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <>
            {!renderCond.uid && !renderCond.name ?

                <div className='flex flex-col mt-20 md:mt-28 md:w-2/3 xl:w-2/4 items-center '>
                    <div className='flex-col text-left m-10 font-bold'>
                        <h1>Login in to your account</h1>
                    </div>

                    <form className='grid grid-col-1 m-10' onSubmit={handleSubmit(handleLogin)}>

                        <div className='flex flex-col text-left'>

                            <label className='text-gray-500 text-xs ml-1'>Email Address</label>

                            <div className='m-1 border border-gray-200 shadow-md rounded '>

                                <input className="outline-none"
                                    {...register('email', {
                                        required: { value: true, message: 'Email is required' },

                                    })}
                                    type='text'
                                    name='email'
                                    autoComplete='off'
                                />

                            </div>
                            {errors.email && 
                            <span className=" m-1 text-red-600 text-xs bg-red-100 rounded p-0.5">{errors.email.message}</span>}
                        </div>

                        <div className='flex flex-col text-left'>

                            <label className='text-gray-500 text-xs ml-1'>Password</label>

                            <div className='flex m-1 border border-gray-200 shadow-md rounded'>

                           

                                <input className="outline-none"
                                    {...register('password', {
                                        required: { value: true, message: 'Password is required' },
                                    })}
                                    type={viewPass}
                                    name='password'
                                />
                                  <div
                                   onClick={()=> viewPass=== "text" ? setViewPass("password"): setViewPass("text")}
                                    className="flex flex-col justify-center text-center cursor-pointer  md:ml-28 ">
                                        <FiEye className="text-gray-500"/>
                                        </div>   
                            </div>
                            {errors.password && <p className=" m-1 text-red-600 text-xs bg-red-100 rounded p-0.5">{errors.password.message}</p>}
                        </div>





                        <div className='m-1 mt-10'>
                            <div className='bg-secondary rounded text-white text-center'>
                                <button className="text-sm cursor-pointer" type="submit">Log In</button>
                            </div>
                            <div>

                                <div className='flex mt-1 '>

                                    <div className='flex cursor-pointer text-xs text-center justify-items-center border rounded border-gray-200 m-1' onClick={handleGoogleLogin}>
                                        <img
                                            className='w-12 h-6 justify-self-center mt-0.5'
                                            src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                                            alt='google button'
                                        />
                                        <label className="flex flex-col justify-center mr-0.5">Log in with Google</label>
                                    </div>
                                    <div className='flex cursor-pointer text-xs text-center justify-items-center border rounded shadow-sm border-gray-200 m-1' onClick={handleFacebookLogin}>
                                        <img
                                            className='w-12 h-6 justify-self-center mt-0.5'
                                            src='https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg'
                                            alt='facebook button'
                                        />
                                        <label className="flex flex-col justify-center mr-0.5">Log in with Facebook</label>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className='flex mt-10 text-xs'>
                            <label>Not a member ? </label>
                            <Link className="text-secondary ml-2" to='/auth/register'>  Sign up</Link>
                        </div>
                    </form>
                </div> : <button onClick={handleLogout}>LOGOUT</button>}
        </>
    );
};

export default LoginScreen;
