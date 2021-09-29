import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { startRegisterWithEmailPasswordName } from '../../Redux/actions/auth';

const RegisterScreen = () => {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        formState: { errors },
        register,
        setValue,
        getValues,
    } = useForm();

    const handleRegister = (data) => {
        console.log('DATA', data);
        dispatch(startRegisterWithEmailPasswordName(data.email, data.password, data.name));
        setValue('name', '');
        setValue('email', '');
        setValue('password', '');
        setValue('password2', '');
    };

    return (
        <>
            <div className='flex flex-col text-center bg-gray-300'>
                <h3>Register</h3>

                <form onSubmit={handleSubmit(handleRegister)}>
                    <input
                        {...register('name', {
                            required: { value: true, message: 'name is required' },
                            minLength: {
                                value: 4,
                                message: 'name must contain at least 4 characters',
                            },
                            maxLength: {
                                value: 15,
                                message: 'name must contain a maximum of 15 characters ',
                            },
                            pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: 'name can only be letters',
                            },
                        })}
                        type='text'
                        placeholder='Name'
                        name='name'
                        autoComplete='off'
                    />
                    <br />
                    {errors.name && <p>{errors.name.message}</p>}

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
                    <br />
                    {errors.email && <span>{errors.email.message}</span>}
                    <input
                        {...register('password', {
                            required: { value: true, message: 'password is required' },
                            minLength: {
                                value: 6,
                                message: 'password must contain at least 8 characters',
                            },
                            maxLength: {
                                value: 16,
                                message: 'password must contain a maximum of 16 characters ',
                            },
                            pattern: {
                                value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                               message: "Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters",
                              },
                        })}
                        type='password'
                        placeholder='Password'
                        name='password'
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                    <br />

                    <input
                        {...register('password2', {
                            validate: (value) => value === getValues('password') || 'Passwords do not match', 
                        })}
                        type='password'
                        placeholder='Confirm password'
                        name='password2'
                    />

                    {errors.password2 && <p>{errors.password2.message}</p>}

                    <button type='submit'>Register</button>
                    
                    <Link to='/auth/login'>Already registered?</Link>
                </form>
            </div>
        </>
    );
};

export default RegisterScreen;
