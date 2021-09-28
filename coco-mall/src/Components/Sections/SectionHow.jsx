import React from 'react';
import create from '../../Assets/images/create.png';
import add from '../../Assets/images/add-content.png';
import launch from '../../Assets/images/launch.png';

const SectionHow = () => {
    return (
        <div className='flex flex-col items-center gap-8'>
            <h3 className='text-xl'>How it works</h3>
            <div className='flex flex-col items-center gap-4'>
                <div className='flex flex-col items-center'>
                    <img className='w-24 h-24' src={create} alt='create' />
                    <p className='text-base'>Create your store</p>
                    <p className='text-xs'>Create an account to get started.</p>
                </div>
                <div className='flex flex-col items-center'>
                    <img className='w-24 h-24' src={add} alt='add-content' />
                    <p className='text-base'>Add Products</p>
                    <p className='text-xs'>Add contents and pages to your site.</p>
                </div>
                <div className='flex flex-col items-center'>
                    <img className='w-24 h-24' src={launch} alt='launch' />
                    <p className='text-base'>Buy anythinge</p>
                    <p className='text-xs'>Now publish to make your site live!</p>
                </div>
            </div>
        </div>
    );
};

export default SectionHow;
