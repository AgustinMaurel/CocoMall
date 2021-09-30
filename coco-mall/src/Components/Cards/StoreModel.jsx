import React from 'react';

const StoreModel = ({ banner, logo, title, mail, description }) => {
    return (
        <div className='border border-red-600 w-80 h-full bg-white shadow-lg'>
            {/* --banner-- */}
            <div className='overflow-hidden'>
                <img src={banner} alt='banner' />
            </div>
            {/* --logo-- */}
            <div className='flex justify-center px-5 -mt-12'>
                <img className='h-32 w-32 bg-white p-2 rounded-full' src={logo} alt='logo' />
            </div>
            {/* --contain-- */}
            <div>
                <div className='text-center px-12'>
                    <h2
                        className='text-primary text-2xl font-bold
                                    sm:text-lg'
                    >
                        {title}
                    </h2>
                    <p className='text-gray-400 text-sm mt-2'>{mail}</p>
                    <p className='mt-2 text-gray-600'>{description}</p>
                </div>
                {/* <div className='flex  bg-gray-50 '>
                    <div className='text-center w-1/2 p-4'>
                        <p>
                            <span className='font-semibold'>Category </span> Cycles
                        </p>
                    </div>
                    <div className='text-center w-1/2 p-4'>
                        <p>
                            <span className='font-semibold'>2.0k </span> Sales
                        </p>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default StoreModel;
