import React from 'react';
import { Link } from 'react-router-dom';

function SecondaryButton({ text }) {
    return (
        <div
            className='shadow-lg flex items-center justify-center bg-white  border border-primary  text-primary w-40 rounded-md h-8             
            xl:border-none xl:shadow-none xl:bg-secondary-light xl:h-12 xl:w-44  '
        >
            <Link
                to='/create/shop'
                className='relative w-full h-full flex items-center align-center justify-center '
            >
                <button
                    className=' focus:outline-none text-center text-base 
                md:text-lg 
                xl:text-primary xl:text-xl'
                >
                    {text}
                </button>
            </Link>
        </div>
    );
}

export default SecondaryButton;
