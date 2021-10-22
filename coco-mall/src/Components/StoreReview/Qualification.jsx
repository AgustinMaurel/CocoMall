import React from 'react';
import CocoIcon from '../StoreReview/CocoIcon';

const Qualification = ({qualification}) => {
    return (
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
                    <span className='flex'>
                        <CocoIcon color={'text-cocoMall-500'} />
                        <CocoIcon color={'text-cocoMall-500'} />
                        <CocoIcon />
                        <CocoIcon />
                        <CocoIcon />
                    </span>
                ) : qualification === '3' ? (
                    <span className='flex'>
                        <CocoIcon color={'text-cocoMall-500'} />
                        <CocoIcon color={'text-cocoMall-500'} />
                        <CocoIcon color={'text-cocoMall-500'} />
                        <CocoIcon />
                        <CocoIcon />
                    </span>
                ) : qualification === '4' ? (
                    <span className='flex'>
                        <CocoIcon color={'text-cocoMall-500'} />
                        <CocoIcon color={'text-cocoMall-500'} />
                        <CocoIcon color={'text-cocoMall-500'} />
                        <CocoIcon color={'text-cocoMall-500'} />
                        <CocoIcon />
                    </span>
                ) : qualification === '5' ? (
                    <span className='flex'>
                        <CocoIcon color={'text-cocoMall-500'} />
                        <CocoIcon color={'text-cocoMall-500'} />
                        <CocoIcon color={'text-cocoMall-500'} />
                        <CocoIcon color={'text-cocoMall-500'} />
                        <CocoIcon color={'text-cocoMall-500'} />
                    </span>
                ) : (
                    false
                )}
            </div>
    )
}

export default Qualification
