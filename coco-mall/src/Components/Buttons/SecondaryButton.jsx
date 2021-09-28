import React from 'react';
import { Link } from 'react-router-dom';

function SecondaryButton({ text }) {
    return (
        <div className='flex items-center justify-center text-primary w-28 md:w-32 h-8 p-2 rounded-md'>
        <Link to="/">
                <button className=' focus:outline-none text-center text-base md:text-lg'>{text}</button>
        </Link>
            </div>
    );
}

export default SecondaryButton;
