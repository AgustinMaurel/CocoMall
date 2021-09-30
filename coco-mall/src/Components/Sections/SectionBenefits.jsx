import React from 'react';

import icon01 from '../../Assets/icons/01.png';
import icon04 from '../../Assets/icons/04.png';
import icon06 from '../../Assets/icons/06.png';
import icon07 from '../../Assets/icons/07.png';

const SectionBenefits = () => {
    return (
        <div className='min-w-screen'>
            <div className='flex relative w-100 content-center justify-between mx-auto items-center '>
                <div className='h-16 w-16 bg-primary-light   rounded-full absolute z-0 left-10 top-10
                2xl:h-28 2xl:w-28 2xl:left-52 2xl:top-32'></div>
                <div className='h-10 w-10 bg-primary-light rounded-full absolute z-0 left-1/3
                                 2xl:h-14 2xl:w-14'></div>
                <div className='h-24 w-24 bg-primary-light rounded-full absolute z-0 left-2/3 top-60  2xl:h-60 2xl:w-60'></div>
            </div>

            
            <div className='flex flex-col items-center justify-center h-screen pb-10 2xl:pb-32 2xl:gap-32 '>
                <h3 className='text-xl font-bold pb-10 after z-10 2xl:text-5xl'>Benefits of working with us</h3>
                
                <div className='flex flex-col items-center gap-10 2xl:flex-row 2xl:w-3/4 2xl:gap-32'>
                    
                    <div className="2xl:flex 2xl:flex-col  2xl:h-96 2xl:justify-evenly 2xl:w-full 2xl:align-center 2xl:items-center">
                        <div className='flex items-center gap-4'>
                            <img src={icon01} alt='icon01' className='2xl:object-cover 2xl:w-16'  />
                            <div className='z-10'>
                                <h4 className='text-base font-semibold 2xl:text-3xl '>Administra todo facilmente</h4>
                                <p className='text-xs 2xl:text-xl'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et
                                    sed nam sem tellus
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 '>
                            <img src={icon04} alt='icon04' className='2xl:object-cover 2xl:w-16' />
                            <div className='z-10'>
                                <h4 className='text-base font-semibold  2xl:text-3xl'>Administra todo facilmente</h4>
                                <p className='text-xs 2xl:text-xl'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et
                                    sed nam sem tellus
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="2xl:flex 2xl:flex-col  2xl:h-96 2xl:justify-evenly 2xl:w-full 2xl:align-center 2xl:items-center">
                        <div className='flex items-center gap-4'>
                            <img src={icon06} alt='icon06' className='2xl:object-cover 2xl:w-16' />
                            <div className='z-10'>
                                <h4 className='text-base font-semibold 2xl:text-3xl'>
                                    Ofrece simplicidad a tus clientes
                                </h4>
                                <p className='text-xs 2xl:text-xl'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et
                                    sed nam sem tellus
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <img src={icon07} alt='icon07' className='2xl:object-cover 2xl:w-16' />
                            <div className='z-10'>
                                <h4 className='text-base font-semibold 2xl:text-3xl'>Otro beneficio</h4>
                                <p className='text-xs 2xl:text-xl'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et
                                    sed nam sem tellus
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-64 w-64 bg-primary-light rounded-full absolute z-0 -left-20 -bottom-32  
                2xl:h-80 2xl:w-80'></div>
            </div>
        </div>
    );
};

export default SectionBenefits;
