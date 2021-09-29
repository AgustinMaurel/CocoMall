import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { startRegisterWithEmailPasswordName } from '../../Redux/actions/auth';
import { useState } from 'react';


const RegisterScreen = () => {

    const { register, errors, handleSubmit } = useForm({
        defaultValues: {
            name: "El Mas",
            email: "Picante@gmail.com",
            password: "123123",
            password2: "123123"
        }
    })

    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()


    /* const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name ]: e.target.value
        });
    } */

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()){
            dispatch(startRegisterWithEmailPasswordName(formValues.email, formValues.password, formValues.name))
        }
    };

  /*   const isFormValid = () => {
        return true
    } */

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
                    value={formValues.name}
                    onChange={handleInputChange}
                />

                <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    autoComplete='off'
                    value={formValues.email}
                    onChange={handleInputChange}
                />

                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={formValues.password}
                    onChange={handleInputChange}
                />

                <input
                    type='password'
                    placeholder='Confirm password'
                    name='password2'
                    value={formValues.password2}
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
