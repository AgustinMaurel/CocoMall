import React from 'react';
import MainButton from '../Components/Buttons/MainButton';
import NavBar from '../Components/NavBar';
import SecondaryButton from '../Components/Buttons/SecondaryButton';
import TitleAndDescription from '../Components/TitleAndDescription';

function Landing() {
    return (
        <div className='grid min-h-screen px-5'>
            
            <div className="w-44 h-44 absolute bg-primary-light rounded-tl-full right-0  overflow-none after:w-44"></div>
            
            
            <div className=' col-span-1  z-10 '>
                <NavBar />
            </div>


            <div className='col-span-1 z-10'>
                <TitleAndDescription />
            </div>

            <div className='flex gap-x-12 col-span-1'>
                <MainButton text='Hello' />
                <SecondaryButton text='Bye' />
            </div>
        </div>
    );
}

export default Landing;
