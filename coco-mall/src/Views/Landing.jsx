import React from 'react';
import MainButton from '../Components/Buttons/MainButton';
import NavBar from '../Components/NavBar';
import SecondaryButton from '../Components/Buttons/SecondaryButton';
import TitleAndDescription from '../Components/TitleAndDescription';

function Landing() {
    return (
        <div className='grid grid-col-1 grid-rows-6 min-h-screen px-5 py-3'>
            <div className='absolute right-0 -top-5 md:-top-10'>
                <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-primary-light rounded-tl-full border border-primary-light  '></div>
                <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-primary-light rounded-bl-full border border-primary-light  '></div>
            </div>

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
        </div>
    );
}

export default Landing;
