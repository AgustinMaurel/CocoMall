import React from 'react';

import icon01 from '../../Assets/icons/01.png';
import icon04 from '../../Assets/icons/04.png';
import icon06 from '../../Assets/icons/06.png';
import icon07 from '../../Assets/icons/07.png';

const SectionBenefits = () => {
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
                    <div className='flex items-center gap-4'>
                        <img src={icon01} alt='icon01' />
                        <div className='z-10'>
                            <h4 className='text-base font-semibold'>Administra todo facilmente</h4>
                            <p className='text-xs'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et
                                sed nam sem tellus
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 '>
                        <img src={icon04} alt='icon04' />
                        <div className='z-10'>
                            <h4 className='text-base font-semibold '>Administra todo facilmente</h4>
                            <p className='text-xs'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et
                                sed nam sem tellus
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <img src={icon06} alt='icon06' />
                        <div className='z-10'>
                            <h4 className='text-base font-semibold'>
                                Ofrece simplicidad a tus clientes
                            </h4>
                            <p className='text-xs'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et
                                sed nam sem tellus
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <img src={icon07} alt='icon07' />
                        <div className='z-10'>
                            <h4 className='text-base font-semibold'>Otro beneficio</h4>
                            <p className='text-xs'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et
                                sed nam sem tellus
                            </p>
                        </div>
                    </div>
                </div>
                <div className='h-64 w-64 bg-primary-light rounded-full absolute z-0 -left-20 -bottom-32 '></div>
            </div>
        </div>
    );
};

export default SectionBenefits;
