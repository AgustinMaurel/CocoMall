import React from 'react';

import StoreModel from '../Cards/StoreModel';

const SectionModelStores = () => {
    return (
        <div className='border h-screen flex flex-col justify-center items-center gap-10'>
            {/* TITLE */}
            <div className='text-center'>
                <h3 className='text-4xl font-bold'>Model Stores</h3>
                <p>We have been working with clients around the world</p>
            </div>

            {/* STORES CARDS */}
            <div className='border flex flex-wrap justify-center h-2/4 w-3/4 gap-6'>
                <StoreModel />
                <StoreModel />
                <StoreModel />
            </div>
        </div>
    );
};

export default SectionModelStores;
