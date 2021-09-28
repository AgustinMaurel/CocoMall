import React from 'react';
import MainButton from '../Components/Buttons/MainButton';
import NavBar from '../Components/NavBar';
import SecondaryButton from '../Components/Buttons/SecondaryButton';
import TitleAndDescription from '../Components/TitleAndDescription';

function Landing() {
    return (
        <div className='grid min-h-screen px-5'>
            <div className="absolute right-0">
                <div className='w-52 h-52 relative  bg-primary-light rounded-tl-full  '></div>
                <div className='w-52 h-52 absolute bg-primary-light rounded-bl-full  '></div>
            </div>

            <div className=' col-span-1  z-10 '>
                <NavBar />
            </div>

            <div className='col-span-1 z-10'>
                <TitleAndDescription />
            </div>

            <div className='flex gap-x-12 col-span-1'>
                <MainButton text='Client' />
                <SecondaryButton text='Shop' />
            </div>
        </div>
    );
}

export default Landing;
