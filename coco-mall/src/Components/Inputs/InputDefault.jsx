import React from 'react';

const InputDefault = ({ register, errors, name, placeholder, type, validate, watch }) => {
    return (
        <div className='relative'>
            {/* <label className='block text-gray-700 text-sm font-bold mb-1'>{name}</label> */}
            <input
            autoComplete='off'
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
            {/* {errors[name] ? (
                <p className='absolute text-xs text-red-500 -top-4 left-0 whitespace-nowrap font-semibold'>
                    {errors[name].message}
                </p>
            ) : watch(name)?.length > 0 ? ( 
                <div>
                    <div className='flex align-center items-center  gap-2 content-center justify-center absolute -top-4 left-0'>
                        <p className=' text-xs  min-w-max  font-semibold '> {name.charAt(0).toUpperCase() + name.slice(1)}</p>
                        <div>
                            <svg
                                className='w-3 h-3 rounded-full bg-green-400'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M5 13l4 4L19 7'
                                ></path>
                            </svg>
                        </div>
                    </div>
                </div>
            ) : (
            )} */}
                <p className='absolute text-xs  min-w-max  -top-4 left-0 font-semibold'>
                    {name.charAt(0).toUpperCase() + name.slice(1)}*
                </p>
        </div>
    );
};

export default InputDefault;
