import React from 'react';
import { Link } from 'react-router-dom';

function SecondaryButton({ text }) {
    return (
        <Link to="/">
            <div className='flex items-center justify-center text-primary h-8 p-2 rounded-md'>
                <button className=' focus:outline-none text-center text-sm'>{text}</button>
            </div>
        </Link>
    );
}

export default SecondaryButton;
