import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLoginEmailPassword, startGoogleLogin, startLogout } from '../../Redux/actions/auth';
import { useForm } from 'react-hook-form';

const LoginScreen = () => {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm();

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
        dispatch( startLogout());
    }

    return (
        <>
            <div className='flex flex-col text-center bg-gray-400 '>
                <h3>Login</h3>
                <button onClick={handleLogout}>LOGOUT</button>
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
                                minLength: {
                                    value: 6,
                                    message: 'password must contain at least 6 characters',
                                },
                                maxLength: {
                                    value: 16,
                                    message: 'password must contain a maximum of 16 characters ',
                                },
                                pattern: {
                                    value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                                    message:
                                        'Your password must be at least 6 characters long, contain at least one number and have a mixture of uppercase and lowercase letters',
                                },
                            })}
                            type='password'
                            placeholder='Password'
                            name='password'
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                        <div>
                            <button type='submit'> Sign in</button>
                        </div>
                    </div>
                    <div className='m-1'>
                        <p>Login with social networks</p>
                        <div>
                            <p>
                                <b>Sign in with google</b>
                            </p>

                            <div className='flex flex-col ' onClick={handleGoogleLogin}>
                                <img
                                    className='w-25 h-12'
                                    src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                                    alt='google button'
                                />
                            </div>
                        </div>
                    </div>

                    <Link to='/auth/register'>Create new account</Link>
                </form>
            </div>
        </>
    );
};

export default LoginScreen;
