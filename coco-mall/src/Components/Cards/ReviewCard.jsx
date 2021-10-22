import React from 'react';
import Qualification from '../StoreReview/Qualification';

function ReviewCard({ username, qualification, description }) {
    return (
        <div className='bg-white shadow flex flex-col p-4 h-full'>
            <h3 className='font-bold text-cocoMall-400 text-lg'>{username}</h3>
            <p className='py-2'>{description}</p>
            <Qualification qualification={qualification} />
        </div>
    );
}

export default ReviewCard;
