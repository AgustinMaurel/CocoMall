import React from 'react';
import MainButton from '../Components/MainButton';
import SecondaryButton from '../Components/SecondaryButton';

function Landing() {
    return (
        <div className="grid grid-cols-5 bg-red-200 h-screen ">

            <div className=" col-span-5 z-10">
                <nav className="flex flex-row justify-between px-5  ">
                    <p>logo</p>
                    <p>menu</p>
                </nav>
            </div>

            <div className='flex col-start-1 col-end-4 container p-10 z-10'>
                <MainButton text='Hello' />
                <SecondaryButton text='Bye' />
            </div>

            <div className="absolute w-96 h-96 bg-primary-light rounded-full -top-24 -right-24 z-0"></div>


        </div>
    );
}

export default Landing;
