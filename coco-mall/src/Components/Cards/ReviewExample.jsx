import React from 'react';
import Qualification from '../StoreReview/Qualification';


const ReviewExample = () => {
    let qualification = '4';

    return (
        <div className='bg-white shadow flex flex-col p-10 h-full'>
            <h3 className='font-bold text-cocoMall-400 text-lg'>Christian Silvero</h3>
            <p className='py-4'>
                La experiencia fue tremenda! la verdad unos genios!.
            </p>
            <Qualification qualification={qualification} />
        </div>
    );
};

export default ReviewExample;
