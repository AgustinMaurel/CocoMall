import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import StoreModel from '../Cards/StoreModel';

const SectionModelStores = () => {
    return (
        <div className='border h-screen flex flex-col'>
            {/* TITLE */}
            <div className='text-center'>
                <h3 className='text-xl font-bold'>Model Stores</h3>
                <p>We have been working with clients around the world</p>
            </div>

            {/* STORES CARDS */}
            <div className='flex gap-6'>
                <StoreModel />
                <StoreModel />
                <StoreModel />
            </div>
        </div>
    );
};

export default SectionModelStores;
