import React from 'react';

const Benefits = ({ icon, title, description }) => {
    return (
        <div className='flex items-center gap-4'>
            <img src={icon} alt='icon' />
            <div className='z-10'>
                <h4 className='text-base font-semibold'>{title}</h4>
                <p className='text-xs'>{description}</p>
            </div>
        </div>
    );
};

export default Benefits;
