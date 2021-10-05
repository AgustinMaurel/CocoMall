import React from 'react';

function TitleAndDescription() {
    return (
        <div className='flex flex-col justify-center w-3/4'>
            <h1 className='text-5xl md:text-6xl  mb-5 whitespace-nowrap font-black 2xl:text-8xl'>COCO MALL</h1>
            <p className='text-base md:text-lg   text-justify xl:whitespace-nowrap w-5/6 2xl:text-3xl'>
                We do the shopping for you.
            </p>
        </div>
    );
}

export default TitleAndDescription;