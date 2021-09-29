import React from 'react';
import create from '../../Assets/images/create.png';
import add from '../../Assets/images/add-content.png';
import launch from '../../Assets/images/launch.png';

const SectionHow = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen pb-10 gap-5'>
            <h3 className='text-3xl font-bold '>How it works</h3>
            <div className='flex flex-col items-center gap-5'>
                <div className='flex flex-col items-center'>
                    <img className='w-24 h-24' src={create} alt='create' />
                    <p className='text-base font-semibold'>Create your store</p>
                    <p className='text-xs'>Create an account to get started.</p>
                </div>
                <div className='flex flex-col items-center'>
                    <img className='w-24 h-24' src={add} alt='add-content' />
                    <p className='text-base font-semibold'>Add Products</p>
                    <p className='text-xs'>Add contents and pages to your site.</p>
                </div>
                <div className='flex flex-col items-center'>
                    <img className='w-24 h-24' src={launch} alt='launch' />
                    <p className='text-base font-semibold'>Buy anythinge</p>
                    <p className='text-xs'>Now publish to make your site live!</p>
                </div>
            </div>
        </div>
    );
};

export default SectionHow;
