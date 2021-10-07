import React from 'react';

const Stats = ({ icon, quanty, description }) => {
    return (
        <div className='flex flex-col items-center justify-around rounded-md bg-white w-32 h-28 shadow
        2xl:w-72 2xl:h-72'>
            <img src={icon} alt='icon' className='2xl:w-10 object-cover' />
            <p className='font-extrabold text-center text-4xl text-primary 2xl:text-6xl'>{quanty}</p>
            <p className='text-sm 2xl:text-2xl 2xl:font-semibold'>{description}</p>
        </div>
    );
};

export default Stats;
