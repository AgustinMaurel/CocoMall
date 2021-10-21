import React from 'react';

const ChevronDownIcon = () => {
    return (
        <div className='cursor-pointer p-2 rounded-md text-white text-sm bg-gray-300 outline-none hover:bg-cocoMall-400'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
            >
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16m-7 6h7'
                />
            </svg>
        </div>
    );
};

export default ChevronDownIcon;
