import React from 'react';

import dataBenefits from '../../Helpers/dataBenefits';
import Benefits from '../Cards/Benefits';

const SectionBenefits = () => {
    const data = dataBenefits();

    return (
        <div className='min-w-screen'>
            <div className='flex relative w-100 content-center justify-between mx-auto items-center '>
                <div className='h-16 w-16 bg-primary-light   rounded-full absolute z-0 left-10 top-10'></div>
                <div className='h-10 w-10 bg-primary-light rounded-full absolute z-0 left-1/3'></div>
                <div className='h-24 w-24 bg-primary-light rounded-full absolute z-0 left-2/3 top-60 '></div>
            </div>

            <div className='flex flex-col items-center justify-center h-screen pb-10 '>
                <h3 className='text-xl font-bold pb-10 after z-10'>Benefits of working with us</h3>
                <div className='flex flex-col items-center gap-10'>
                    {data?.map((e, i) => (
                        <Benefits
                            key={i}
                            icon={e.icon}
                            title={e.title}
                            description={e.description}
                        />
                    ))}
                </div>
                <div className='h-64 w-64 bg-primary-light rounded-full absolute z-0 -left-20 -bottom-32 '></div>
            </div>
        </div>
    );
};

export default SectionBenefits;
