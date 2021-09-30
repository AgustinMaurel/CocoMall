import React from 'react';

import StoreModel from '../Cards/StoreModel';
import dataStores from '../../Helpers/dataStores';

const SectionModelStores = () => {
    const data = dataStores();
    console.log(data);

    return (
        <div className='h-screen flex flex-col justify-center items-center gap-10'>
            {/* BACKGROUND */}
            <div className='flex relative w-100 content-center justify-between mx-auto items-center '>
                <div
                    className='h-16 w-16 bg-primary-light rounded-full absolute z-0 left-10 top-10
                xl:h-28 xl:w-28 xl:left-52 xl:top-32'
                ></div>
                <div
                    className='h-10 w-10 bg-primary-light rounded-full absolute z-0 left-1/3
                                 xl:h-14 xl:w-14'
                ></div>
                <div className='h-24 w-24 bg-primary-light rounded-full absolute z-0 top-6 right-96
                                xl:h-60 xl:w-60'></div>
            </div>

            {/* TITLE */}
            <div className='text-center z-10'>
                <h3
                    className='text-3xl font-bold
                                sm:text-4xl
                                xl:text-5xl'
                >
                    Model Stores
                </h3>
                <p className='text-lg xl:text-2xl'>
                    We have been working with clients around the world
                </p>
            </div>

            {/* STORES CARDS */}
            <div
                className='flex flex-wrap justify-center h-3/4 w-full gap-2 z-10
                            md:gap-5
                            lg:w-4/5
                            2xl:w-full 2xl:h-1/2 2xl:items-center'
            >
                {data?.map((e, i) => (
                    <StoreModel
                        key={i}
                        banner={e.banner}
                        logo={e.logo}
                        title={e.title}
                        mail={e.mail}
                        description={e.description}
                    />
                ))}
            </div>
            {/* BACKGROUND */}
            <div
                className='h-64 w-64 bg-primary-light rounded-full absolute z-0 -right-28 -top-16  
                2xl:h-80 2xl:w-80'
            ></div>
        </div>
    );
};

export default SectionModelStores;
