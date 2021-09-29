import React from 'react';
import MainButton from '../../Buttons/MainButton';
import SecondaryButton from '../../Buttons/SecondaryButton';
import NavBar from '../../NavBar';
import SectionBenefits from '../../Sections/SectionBenefits';
import SectionHow from '../../Sections/SectionHow';
// import SectionStats from '../../Sections/SectionStats';
import TitleAndDescription from '../../TitleAndDescription';

function LandingMobile() {
    return (
        <div className='grid grid-col-1  min-h-screen  py-3'>
        <div className='fixed flex w-screen justify-evenly bottom-10 z-20  '>
                <MainButton text='Client' />
                <SecondaryButton text='Shop' />
            </div>
            <div className='absolute right-0 -top-5 md:-top-10 lg:-top-28'>
                <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96  bg-primary-light rounded-tl-full border border-primary-light  '></div>
                <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96  bg-primary-light rounded-bl-full border border-primary-light  '></div>
            </div>
            <section className=' container flex flex-col gap-60 col-span-1 z-10 px-5 py-5'>
                <div className=' col-span-1  z-10 px-5'>
                    <NavBar />
                </div>
                <div data-aos='fade-in'>
                    <TitleAndDescription />
                </div>
            </section>

            

            <div className='flex flex-col gap-10 min-h-screen'>
                <section data-aos='fade-right' className='container col-span-1   '>
                    <SectionHow />
                </section>
                <section
                    data-aos='fade-up'
                    data-aos-offset='0'
                    className='container col-span-1  px-5  '
                >
                    <SectionBenefits />
                </section>

                {/* <section className='container col-span-1'>
                    <SectionStats />
                </section> */}
            </div>
        </div>
    );
}

export default LandingMobile;
