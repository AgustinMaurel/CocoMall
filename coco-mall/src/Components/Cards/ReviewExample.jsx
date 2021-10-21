import React from 'react';
import CocoIcon from '../StoreReview/CocoIcon';


const ReviewExample = () => {
    let qualification = '1';

    return (
        <div className='bg-white shadow flex flex-col p-10 h-full'>
            <h3 className='font-bold text-cocoMall-400 text-lg'>Christian Silvero</h3>
            <p className='py-4'>
                La experiencia fue tremenda! la verdad unos genios! super recomendable.
            </p>

            <div>
                {qualification === '1' ? (
                    <span className='flex'>
                        <CocoIcon color={'text-cocoMall-500'} />
                        <CocoIcon />
                        <CocoIcon />
                        <CocoIcon />
                        <CocoIcon />
                    </span>
                ) : qualification === '2' ? (
                    <span>🥥 🥥</span>
                ) : qualification === '3' ? (
                    <span>🥥 🥥 🥥</span>
                ) : qualification === '4' ? (
                    <span>🥥 🥥 🥥 🥥</span>
                ) : qualification === '5' ? (
                    <span>🥥 🥥 🥥 🥥 🥥</span>
                ) : (
                    false
                )}
            </div>
        </div>
    );
};

export default ReviewExample;
