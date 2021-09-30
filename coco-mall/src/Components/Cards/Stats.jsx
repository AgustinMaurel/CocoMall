import React from 'react';

const Stats = ({ icon, quanty, description }) => {
    return (
        <div className='flex flex-col items-center justify-around rounded-md bg-white w-32 h-32 shadow'>
            <img src={icon} alt='icon' />
            <p className='font-extrabold text-center text-5xl text-primary '>{quanty}</p>
            <p className='text-xs'>{description}</p>
        </div>
    );
};

export default Stats;
