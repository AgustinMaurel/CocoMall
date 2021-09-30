import React from 'react';
import create from '../../Assets/images/create.png';
import add from '../../Assets/images/add-content.png';
import launch from '../../Assets/images/launch.png';

const SectionHow = () => {
    return (
        <div className='  flex flex-col items-center justify-evenly h-screen pb-10
        sm:pb-14 
        
        xl:flex xl:justify-evenly xl:gap-10
        2xl:mx-44'>
            <div className='xl:relative '>
                <div className=' sm:absolute sm:w-24 sm:h-24 sm:bg-primary-light sm:rounded-full sm:top-8 
                xl:absolute xl:w-32 xl:h-32 xl:bg-primary-light xl:rounded-full xl:top-0
                2xl:w-64 2xl:h-64 2xl:-top-20 2xl:-left-10'></div>
                <h3 className='relative text-3xl font-bold 
                sm:text-5xl
                xl:text-6xl'>How it works</h3>
            </div>

            <div
                className=' flex flex-col items-center
            sm:gap-10
            xl:flex xl:flex-row xl:w-full xl:align-center xl:items-center xl:justify-around xl:pb-20'
            >
                <div className='flex flex-none flex-col items-center  2xl:h-80 2xl:flex-col-reverse 2xl:justify-around 2xl:mr-10'>
                    <img
                        className='w-24 h-24 object-cover 
                                xl:w-40 xl:h-40  2xl:w-60 2xl:h-52 '
                        src={create}
                        alt='create'
                    />
                    <div className='flex flex-col items-center 2xl:gap-2'>
                        <p
                            className='text-base font-semibold 
                        sm:text-lg
                        2xl:text-xl '
                        >
                            Create your store
                        </p>
                        <p
                            className='text-xs 
                        sm:text-base
                        2xl:text-lg 2xl:whitespace-nowrap'
                        >
                            Create an account to get started.
                        </p>
                    </div>
                </div>

                <div
                    className='flex flex-none 2xl:flex-col-reverse flex-col items-center 
                2xl:h-80 2xl:justify-around'
                >
                    <img
                        className='w-24 h-24 object-cover
                        xl:w-40 xl:h-40 
                        2xl:w-60 2xl:h-52  '
                        src={add}
                        alt='add-content'
                    />
                    <div className='flex flex-col items-center  2xl:gap-2'>
                        <p
                            className='text-base font-semibold
                            sm:text-lg
                            2xl:text-xl'
                        >
                            Add Products
                        </p>
                        <p
                            className='text-xs 
                            sm:text-base
                            2xl:text-lg'
                        >
                            Add contents and pages to your site.
                        </p>
                    </div>
                </div>
                <div
                    className='flex flex-none flex-col items-center 
                2xl:flex-col-reverse 2xl:h-80  2xl:justify-around'
                >
                    <img
                        className='w-24 h-24 xl:w-40 xl:h-40 object-cover
                        2xl:w-60 2xl:h-52 '
                        src={launch}
                        alt='launch'
                    />
                    <div className='flex flex-col items-center 2xl:gap-2'>
                        <p
                            className='text-base font-semibold
                            sm:text-lg  
                        2xl:text-xl'
                        >
                            Buy anything
                        </p>
                        <p
                            className='text-xs
                            sm:text-base
                        2xl:text-lg'
                        >
                            Now publish to make your site live!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectionHow;
