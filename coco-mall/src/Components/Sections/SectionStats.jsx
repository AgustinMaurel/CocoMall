import React from 'react';

import Stats from '../Cards/Stats';
import dataStats from '../../Helpers/dataStats';

const SectionStats = () => {
    const data = dataStats();

    return (
        <div className='flex justify-center h-screen items-center'>
            <div
                className='bg-primary flex justify-center w-full h-60 relative
                            lg:h-32'
            >
                {/* TITLE */}
                <div className='text-center z-10 absolute -top-40'>
                    <h3
                        className='text-3xl font-bold
                                sm:text-4xl
                                xl:text-5xl'
                    >
                        See our Stats
                    </h3>
                    <p className='text-lg xl:text-2xl'>
                        We have been working with clients around the world
                    </p>
                </div>
                <div
                    className='flex flex-wrap gap-8 items-center justify-center h-32 absolute top-10
                            md:mx-12
                            lg:absolute lg:top-16'
                >
                    {data?.map((e, i) => (
                        <Stats
                            key={i}
                            icon={e.icon}
                            quanty={e.quanty}
                            description={e.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SectionStats;
