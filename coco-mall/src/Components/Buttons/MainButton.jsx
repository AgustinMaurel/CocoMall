import React from 'react';
import { Link } from 'react-router-dom';

function MainButton({ text}) {
    return (
        <div
            className={`shadow  flex items-center justify-center bg-primary w-40 h-8  xl:h-12 xl:w-44   rounded-lg `}
        >
            <Link className='relative w-full h-full flex items-center align-center justify-center' to='/home'>
                <button className='w-full focus:outline-none text-white text-center text-base md:text-lg  xl:text-xl'>
                    {text}
                </button>
            </Link>
        </div>
    );
}

export default MainButton;
