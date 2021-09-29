import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startRegisterWithEmailPasswordName } from '../../Redux/actions/auth';

const RegisterScreen = () => {

    const dispatch = useDispatch()

    const [formValues, handleInputChange] = useForm({
        name: 'Hernando',
        email: 'nando@gmail.com',
        password: '123456',
        password2: '123456',
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()){
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }
    };

    const isFormValid = () => {
        return true
    }

    return (
        <>
        <div className='flex flex-col text-center'>
            <h3>Register</h3>

            <form  onSubmit={handleRegister}>
                <input
                    type='text'
                    placeholder='Name'
                    name='name'
                    autoComplete='off'
                    value={name}
                    onChange={handleInputChange}
                />

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

                <input
                    type='password'
                    placeholder='Confirm password'
                    name='password2'
                    value={password2}
                    onChange={handleInputChange}
                />

                <button type='submit'>Register</button>

                <Link to='/auth/login'>Already registered?</Link>
            </form>
            </div>
        </>
    );
};

export default RegisterScreen;
