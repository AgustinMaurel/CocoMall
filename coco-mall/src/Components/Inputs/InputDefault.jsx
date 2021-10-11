import React from 'react';

const InputDefault = ({ register, errors, name, placeholder, type, validate }) => {
    let text = name;
    let result = text.replace(/([A-Z])/g, ' $1');
    let finalResult = result.charAt(0).toUpperCase() + result.slice(1);

    return (
        <div className='relative my-3'>
            <input
                autoComplete='off'
                className={
                    errors[name]
                        ? 'outline-none p-2 w-full rounded text-gray-500  text-sm border border-red-200'
                        : 'outline-none p-2 w-full rounded text-gray-500  text-sm border border-gray-200'
                }
                type={type}
                placeholder={placeholder}
                {...register(name, validate)}
                />

            {errors[name] ? (
                <p className='absolute text-red-500 -top-6 left-0 whitespace-nowrap'>
                    {errors[name].message}
                </p>
            ) : (
                <div>
                    <div className='flex align-center items-center  gap-2 content-center justify-center absolute -top-6 left-0'>
                        <p className='min-w-max'> {finalResult}</p>
                       
                    </div>
                </div>
            )}
        </div>
    );
};

export default InputDefault;
