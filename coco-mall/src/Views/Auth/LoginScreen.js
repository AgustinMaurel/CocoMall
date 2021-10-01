import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLoginEmailPassword, startGoogleLogin, startLogout } from '../../Redux/actions/auth';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import MainButton from '../../Components/Buttons/MainButton';
import SecondaryButton from '../../Components/Buttons/SecondaryButton';

const LoginScreen = () => {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm();

    const renderCond = useSelector(state => state.auth)

    const handleLogin = (data) => {
        console.log(data);
        dispatch(startLoginEmailPassword(data.email, data.password));
        setValue('email', '');
        setValue('password', '');

    };

    const handleGoogleLogin = (data) => {

        dispatch(startGoogleLogin());
    };

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <>
            {!renderCond.uid && !renderCond.name ?

                <div>
                    <h3>Login</h3>
                    <div></div>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className='m-1'>
                            <input
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
                            {errors.email && <span>{errors.email.message}</span>}
                        </div>

                        <div className='m-1'>
                            <input
                                {...register('password', {
                                    required: { value: true, message: 'password is required' },
                                })}
                                type='password'
                                placeholder='Password'
                                name='password'
                            />
                            {errors.password && <p>{errors.password.message}</p>}
                            <div>
                            <MainButton text="Sign In"/>
                            </div>
                        </div>
                        <div className='m-1'>
                            <p>Login with social networks</p>
                            <div>
                                

                                <div className='flex flex-col ' onClick={handleGoogleLogin}>
                                    <img
                                        className='w-20 h-9 justify-self-center'
                                        src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                                        alt='google button'
                                    />
                                </div>
                            </div>
                        </div>

                        <Link to='/auth/register'>Create new account</Link>
                    </form>
                </div> : <button onClick={handleLogout}>LOGOUT</button>}
        </>
    );
};

export default LoginScreen;
