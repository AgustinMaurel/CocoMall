import React from 'react';
import MainButton from '../Components/Buttons/MainButton';
import NavBar from '../Components/NavBar';
import SecondaryButton from '../Components/Buttons/SecondaryButton';

function Landing() {
    return (
        <div className="grid grid-cols-5 bg-red-200 h-screen ">

            <div className=" col-span-5 z-10">
                <NavBar/>
            </div>

            <div className='flex items-start  justify-evenly col-span-3 container  z-10'>
                <MainButton text='Hello' />
                <SecondaryButton  text='Bye' />
            </div>

            <div className="absolute w-96 h-96 bg-primary-light rounded-full -top-24 -right-24 z-0"></div>


        </div>
    );
}

export default Landing;
