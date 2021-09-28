import React from 'react';
import { Link } from 'react-router-dom';

function MainButton({ text }) {
    return (
        <div className='shadow flex items-center justify-center bg-primary w-40 h-8 md:w-32 p-2 rounded-lg '>
        <Link className="relative w-full" to='/'>
                <button className='w-full focus:outline-none text-white text-center text-base md:text-lg'>
                    {text}
                </button>
        </Link>
            </div>
    );
}

export default MainButton;
