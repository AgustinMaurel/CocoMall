import React from 'react';

const InputDefault = ({ register, errors, name, placeholder, type, validate }) => {
    return (
        <div className='mb-4 relative'>
            {/* <label className='block text-gray-700 text-sm font-bold mb-1'>{name}</label> */}
            <input
                className={
                    errors[name]
                        ? 'outline-none p-2 w-full rounded text-sm border border-red-200'
                        : 'outline-none p-2 w-full rounded text-sm border border-gray-200'
                }
                type={type}
                placeholder={placeholder}
                {...register(name, validate)}
            />
            {/* {errors[name] && (
                <span className='text-red-500 text-xs italic'>{errors[name].message}</span>
            )} */}
            {errors[name] ? (
                <p className='absolute text-xs text-red-500 -top-4 left-0 whitespace-nowrap font-semibold'>
                    {errors[name].message}
                </p>
            ) : (
                <p className='absolute text-xs  min-w-max  -top-4 left-0 font-semibold'>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
            )}
        </div>
    );
};

export default InputDefault;
