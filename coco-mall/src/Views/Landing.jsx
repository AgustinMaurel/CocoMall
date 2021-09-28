import React, { useState, useEffect } from 'react';
import MainButton from '../Components/Buttons/MainButton';
import NavBar from '../Components/NavBar';
import SecondaryButton from '../Components/Buttons/SecondaryButton';
import TitleAndDescription from '../Components/TitleAndDescription';
import SectionHow from '../Components/Sections/SectionHow';
import SectionBenefits from '../Components/Sections/SectionBenefits';

function Landing() {
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 1024;

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
    }, []);

    return (
        <div className='grid grid-col-1 grid-rows-6 min-h-screen px-5 py-3'>
            {width < breakpoint ? (
                <div className='absolute right-0 -top-5 md:-top-10 lg:-top-28'>
                    <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96  bg-primary-light rounded-tl-full border border-primary-light  '></div>
                    <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96  bg-primary-light rounded-bl-full border border-primary-light  '></div>
                </div>
            ) : (
                <div className='absolute right-20 top-20 '>
                    <div className='w-96 h-96 rounded-full bg-primary-light'></div>
                </div>
            )}

            <div className=' col-span-1 row-span-2  z-10 '>
                <NavBar />
            </div>

            <div className='col-span-1 row-span-1 z-10'>
                <TitleAndDescription />
            </div>

            <div className='flex col-span-1 row-start-5 row-end-6'>
                <MainButton text='Client' />
                <SecondaryButton text='Shop' />
            </div>

            <div className='col-span-1'>
                <SectionHow />
            </div>

            <div className='col-span-1'>
                <SectionBenefits />
            </div>
        </div>
    );
}

export default Landing;
