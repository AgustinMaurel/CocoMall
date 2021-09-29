import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startLoginEmailPassword, startGoogleLogin } from '../../Redux/actions/auth';

const LoginScreen = () => {
    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useState({
        email: 'nando@gmail.com',
        password: '123456',
    });

   /*  const { email, password } = formValues; */

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPassword());
    };

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    };

    return (
        <>
            <div className='flex flex-col text-center bg-gray-400 '>
            <h3>Login</h3>
                <form onSubmit={handleLogin}>
            <div className='m-1'>

                <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    autoComplete='off'
                    value="email"
                    onChange={handleInputChange}
                />

            </div>
                <div className='m-1'>
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value="password"
                    onChange={handleInputChange}
                />
                <div>

                <button type='submit'> Sign in</button>
                </div>

                </div>

                <div className='m-1'>
                    <p>Login with social networks</p>

                    <div>
                        <div className="flex flex-col " onClick={handleGoogleLogin}>
                            <img
                                className="w-25 h-12"
                                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                                alt='google button'
                            />
                        </div>
                        <p>
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to='/auth/register'>Create new account</Link>
            </form>
            </div>
        </>
    );
};

export default LoginScreen;
