import React from 'react';

const Benefits = ({ icon, title, description }) => {
    return (
        <div className='flex items-center gap-4 z-20'>
            <img src={icon} alt='icon' className='xl:object-cover xl:w-16' />
            <div className=''>
                <h4 className='text-base font-semibold xl:text-3xl'>{title}</h4>
                <p className='text-sm xl:text-xl'>{description}</p>
            </div>
        </div>
    );
};

export default Benefits;
