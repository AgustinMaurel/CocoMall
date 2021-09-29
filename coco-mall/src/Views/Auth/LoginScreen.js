import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

const LoginScreen = () => {
    const [formValues, handleInputChange] = useForm({
        email: 'nando@gmail.com',
        password: '123456',
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <h3 >Login</h3>

            <form onSubmit={handleLogin}>
                <input
                    type='text'
                    placeholder='Email'
                    name='email'
                   
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                   
                    value={password}
                    onChange={handleInputChange}
                />

                <button type='submit'>
                    Login
                </button>

                <div>
                    <p>Login with social networks</p>

                    <div>
                        <div>
                            <img
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
        </>
    );
};

export default LoginScreen;
