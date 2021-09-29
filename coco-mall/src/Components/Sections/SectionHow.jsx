import React from 'react';
import create from '../../Assets/images/create.png';
import add from '../../Assets/images/add-content.png';
import launch from '../../Assets/images/launch.png';

const SectionHow = () => {
    return (
        <div className='  flex flex-col items-center justify-center h-screen pb-10 gap-5 xl:flex xl:justify-evenly xl:gap-10'>
            <div className='xl:relative '>
                <div className='  xl:absolute xl:w-32 xl:h-32 xl:bg-primary-light xl:rounded-full xl:top-0'></div>
                <h3 className='relative text-3xl font-bold xl:text-6xl'>How it works</h3>
            </div>

            <div
                className=' flex flex-col items-center
            xl:flex xl:flex-row xl:w-full xl:align-center xl:items-center xl:justify-around xl:pb-20'
            >
                <div className='flex flex-col items-center'>
                    <img className='w-24 h-24 xl:w-40 xl:h-40' src={create} alt='create' />
                    <p className='text-base font-semibold'>Create your store</p>
                    <p className='text-xs'>Create an account to get started.</p>
                </div>
                <div className='flex flex-col items-center'>
                    <img className='w-24 h-24 xl:w-40 xl:h-40' src={add} alt='add-content' />
                    <p className='text-base font-semibold'>Add Products</p>
                    <p className='text-xs'>Add contents and pages to your site.</p>
                </div>
                <div className='flex flex-col items-center'>
                    <img className='w-24 h-24 xl:w-40 xl:h-40' src={launch} alt='launch' />
                    <p className='text-base font-semibold'>Buy anythinge</p>
                    <p className='text-xs'>Now publish to make your site live!</p>
                </div>
            </div>
        </div>
    );
};

export default SectionHow;
