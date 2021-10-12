import React from 'react';

const StoreModel = ({ banner, logo, title, mail, description }) => {
    return (
        <article
            className='w-2/5  bg-white shadow-xl
                        sm:h-64
                        md:h-72
                        
                        2xl:w-1/5 2xl:h-full'
        >
            {/* --banner-- */}
            <div
                className='overflow-hidden max-h-24
                            2xl:max-h-36'
            >
                <img src={banner} alt='banner' />
            </div>
            {/* --logo-- */}
            <div className='flex justify-center px-5 -mt-6'>
                <img
                    className='h-14 w-14 bg-white rounded-full
                                shadow
                                sm:h-16 sm:w-16
                                md:h-20 md:w-20
                                xl:-mt-4
                                2xl:h-24 2xl:w-24'
                    src={logo}
                    alt='logo'
                />
            </div>
            {/* --contain-- */}
            <div>
                <div
                    className='text-center px-0
                                md:px-6
                                lg:px-10'
                >
                    <h2
                        className='text-primary font-bold
                                    md:text-lg
                                    xl:text-xl
                                    2xl:text-2xl'
                    >
                        {title}
                    </h2>
                    <p
                        className='text-gray-400 text-xs
                                    xl:text-sm'
                    >
                        {mail}
                    </p>
                    <p
                        className='text-gray-600 text-xs px-2 py-4
                                    xl:text-sm
                                    2xl:text-lg'
                    >
                        {description}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default StoreModel;
