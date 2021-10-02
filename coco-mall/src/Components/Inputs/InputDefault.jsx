import React from 'react';

const InputDefault = ({ register, errors, name, type, validate }) => {
    return (
        <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-1'>{name}</label>
            <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type={type}
                placeholder={name}
                {...register(name, validate)}
            />
            {errors[name] && (
                <span className='text-red-500 text-xs italic'>{errors[name].message}</span>
            )}
        </div>
    );
};

export default InputDefault;
