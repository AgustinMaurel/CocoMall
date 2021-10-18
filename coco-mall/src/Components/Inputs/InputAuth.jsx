import React from 'react';

const InputAuth = ({ register, errors, name, type, validate, defaultValue }) => {
    let text = name;
    let result = text.replace(/([A-Z])/g, ' $1');
    let finalResult = result.charAt(0).toUpperCase() + result.slice(1);

    return (
        <div className='mt-1'>
            <label className='text-gray-500 text-xs sm:text-sm lg:text-base 2xl:text-lg'>{finalResult}</label>
            <div className='flex border bg-white border-gray-200 shadow-md rounded z-10'>
                <input
                    autoComplete='off'
                    className='outline-none text-xs z-10 p-2 w-full rounded focus:ring-1 focus:ring-cocoMall-300 focus:border-transparent'
                    {...register(name, validate)}
                    type={type}
                    name={name}
                    defaultValue={defaultValue}
                />
            </div>

            {errors[name] && (
                <span className=' m-1 text-red-600 text-xs bg-red-100 rounded p-0.5'>
                    {errors[name].message}
                </span>
            )}
        </div>
    );
};

export default InputAuth;
