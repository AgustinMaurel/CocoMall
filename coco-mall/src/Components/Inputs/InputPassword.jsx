import React, { useState } from 'react';

const InputPassword = ({ register, errors, name, validate }) => {
    const [viewPass, setViewPass] = useState('password');

    let text = name;
    let result = text.replace(/([A-Z])/g, ' $1');
    let finalResult = result.charAt(0).toUpperCase() + result.slice(1);

    return (
        <div className='mt-1'>
            <label className='text-gray-500 text-sm lg:text-base 2xl:text-lg'>{finalResult}</label>
            <div className='flex justify-between border bg-white border-gray-200 shadow-md rounded z-10'>
                <input
                    className='outline-none text-xs z-10 p-2 w-full'
                    {...register(name, validate)}
                    type={viewPass}
                    name={name}
                />
                <div
                    onClick={() =>
                        viewPass === 'text' ? setViewPass('password') : setViewPass('text')
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

            {errors[name] && (
                <span className=' m-1 text-red-600 text-xs bg-red-100 rounded p-0.5'>
                    {errors[name].message}
                </span>
            )}
        </div>
    );
};

export default InputPassword;
