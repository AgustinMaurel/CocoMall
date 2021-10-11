import React from 'react';

function HomeCards({ storeName, description, cloudImage }) {
    return (
        <article className='h-full shadow-lg m-4 rounded-md'>
            <img
                className='rounded-md h-40 w-full'
                src='https://picsum.photos/600/400?image=1083'
                alt='banner'
            />

            <picture className='flex justify-center px-5 -mt-6 overflow-hidden '>
                <img
                    className=' h-14 w-14
                                bg-white rounded-full
                                shadow
                                sm:h-16 sm:w-16
                                md:h-20 md:w-20
                                xl:-mt-4
                                2xl:h-20 2xl:w-20'
                    src={cloudImage}
                    alt='logo'
                />
            </picture>
            <div>
                <div className='text text-md text-center'>
                    <h3
                        className='text-primary font-bold
                                    md:text-lg
                                    xl:text-xl
                                    2xl:text-2xl
                                    mb-5'
                    >
                        {storeName}
                    </h3>

                    <p className='text-sm p-6'>{description}</p>
                </div>
            </div>
        </article>
    );
}

export default HomeCards;
