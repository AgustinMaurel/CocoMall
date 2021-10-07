import React from 'react';

const Textarea = ({ register, errors, name, placeholder, type, validate }) => {
    let text = name;
    let result = text.replace(/([A-Z])/g, ' $1');
    let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    
    return (
        <div className='relative my-4'>
            <textarea
                autoComplete='off'
                className={
                    errors[name]
                        ? 'border border-red-200 resize-none outline-none p-2 w-full rounded text-gray-500 text-sm'
                        : 'resize-none outline-none p-2 w-full rounded text-gray-500 text-sm border border-gray-200'
                }
                type={type}
                placeholder={placeholder}
                {...register(name, validate)}
            />
            {errors[name] ? (
                <p className='absolute text-red-500 -top-6 left-0'>
                    {errors[name].message}
                </p>
            ) : (
                <div>
                    <div className='flex align-center items-center  gap-2 content-center justify-center absolute -top-6 left-0'>
                        <p className='min-w-max'> {finalResult}</p>
                        {/* <div>
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
                        </div> */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Textarea;
