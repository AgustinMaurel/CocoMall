import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLoginEmailPassword, startGoogleLogin } from '../../Redux/actions/auth';

const LoginScreen = () => {
    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        email: 'nando@gmail.com',
        password: '123456',
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPassword(email, password));
    };

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    };

    return (
        <>
            <h3>Login</h3>

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

                <button type='submit'>Login</button>

                <div>
                    <p>Login with social networks</p>

                    <div>
                        <div onClick={handleGoogleLogin}>
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
