import React from 'react';
import { Link } from 'react-router-dom';

function MainButton({ text }) {
    return (
        <Link to='/'>
            <div className='flex  items-center justify-center bg-primary w-24 h-8 p-2 rounded-lg '>
                <button className='w-full focus:outline-none text-white text-center text-sm'>
                    {text}
                </button>
            </div>
        </Link>
    );
}

export default MainButton;
