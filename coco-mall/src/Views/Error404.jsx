import React from 'react';
import NavBar from './../Components/NavBar/NavBar';

function Error404() {
    return (
        <div className='h-screen  overflow-hidden'>
            <NavBar />

            <div className=' h-full px-5 relative'>
                <div className='absolute h-28 w-28 lg:h-64 lg:w-64  rounded-full bg-primary bottom-0 right-0 z-0'></div>
                <div className='absolute h-36 w-36 mix-blend-screen  lg:h-64 lg:w-64 rounded-full bg-primary top-20 -left-10 z-0'></div>
                <div className='absolute md:h-10 md:w-10  rounded-full bg-primary  md:left-96 z-0'></div>

                <div className='flex flex-col  justify-evenly  h-3/4'>
                    <div className='z-10'>
                        <h1 className='font-bold text-3xl'>Error404.</h1>
                        <p className=''>The page you are looking for does not exists</p>
                    </div>
                    <div
                        className='shadow-lg flex items-center justify-center bg-primary    text-white w-2/6 h-12
                        z-10 xl:border-none xl:shadow-none  xl:h-12 xl:mt-10   '
                    >
                        <button
                            className=' focus:outline-none text-center text-lg font-bold w-full h-full      
                                                sm:text-xl
                                               xl:text-xl'
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error404;
