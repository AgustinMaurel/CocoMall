import React from 'react';

const InputFile = ({ register, errors, name, type, validate, onChange, watch, isUploaded }) => {
    return (
        <div className='relative my-2'>
            {/* <label className='block text-gray-700 text-sm font-bold mb-1'>{name}</label> */}
            <input
                id='selectedFile'
                className='outline-none p-2 w-full rounded'
                style={{ display: 'none' }}
                type={type}
                accept='.png'
                placeholder={name}
                {...register(name, validate)}
                onChange={onChange}
            />
            <input
                type='button'
                value={isUploaded ? 'Selection OK' :'Select Image'}
                onClick={() => document.getElementById('selectedFile').click()}
                className={
                    errors[name]
                        ? 'border border-red-200 bg-white text-gray-400 text-left text-sm outline-none p-2 w-full rounded cursor-pointer'
                        : 'border border-gray-200 bg-white text-gray-400 text-left text-sm outline-none p-2 w-full rounded cursor-pointer'
                }
            />
            {errors[name]? (
                <p className='absolute text-red-500 -top-6 left-0'>
                    {errors[name].message}
                </p>
            ) : isUploaded ? (
                <div>
                    <div className='flex align-center items-center  gap-2 content-center justify-center absolute -top-6 left-0'>
                        <p className='min-w-max'>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
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
                <p className='absolute min-w-max -top-6 left-0'>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
            )}
        </div>
    );
};

export default InputFile;

/*

        <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-1'>{name}</label>
            <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type={type}
                placeholder={name}
                {...register(name, validate)}
                onChange={onChange}
            />
            {errors[name] && (
                <span className='text-red-500 text-xs italic'>{errors[name].message}</span>
            )}
        </div>

*/
