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
