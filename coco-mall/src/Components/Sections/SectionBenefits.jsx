import React from 'react';

import dataBenefits from '../../Helpers/dataBenefits';
import Benefits from '../Cards/Benefits';

const SectionBenefits = () => {
    const data = dataBenefits();
    const data1 =data.slice(0,2)
    const data2 =data.slice(2,5)

    return (
        <div className='min-w-screen'>
            {/* BACKGROUND */}
            <div className='flex relative w-100 content-center justify-between mx-auto items-center '>
                <div
                    className='h-16 w-16 bg-primary-light   rounded-full absolute z-0 left-10 top-10
                xl:h-28 xl:w-28 xl:left-52 xl:top-32'
                ></div>
                <div
                    className='h-10 w-10 bg-primary-light rounded-full absolute z-0 left-1/3
                                 xl:h-14 xl:w-14'
                ></div>
                <div className='h-24 w-24 bg-primary-light rounded-full absolute z-0 left-2/3 top-60  xl:h-60 xl:w-60'></div>
            </div>

            {/* SECTION */}
            <div className='flex flex-col items-center justify-center h-screen pb-10 xl:pb-32 xl:gap-28 '>
                <h3 className='text-xl font-bold pb-10 after z-10 xl:text-5xl'>
                    Benefits of working with us
                </h3>

                <div className='flex flex-col items-center gap-10 xl:flex-row xl:w-3/4 xl:gap-20'>
                    <div className='xl:flex xl:flex-col  xl:h-96 xl:justify-evenly xl:w-full xl:align-center xl:items-center'>
                        <div className='flex flex-col items-center gap-10'>
                            {data1?.map((e, i) => (
                                <Benefits
                                    key={i}
                                    icon={e.icon}
                                    title={e.title}
                                    description={e.description}
                                />
                            ))}
                        </div>
                    </div>

                    <div className='xl:flex xl:flex-col  xl:h-96 xl:justify-evenly xl:w-full xl:align-center xl:items-center'>
                        <div className='flex flex-col items-center gap-10'>
                            {data2?.map((e, i) => (
                                <Benefits
                                    key={i}
                                    icon={e.icon}
                                    title={e.title}
                                    description={e.description}
                                />
                            ))}
                        </div>
                    </div>

                    <div
                        className='h-64 w-64 bg-primary-light rounded-full absolute z-0 -left-20 -bottom-32  
                2xl:h-80 2xl:w-80'
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default SectionBenefits;
