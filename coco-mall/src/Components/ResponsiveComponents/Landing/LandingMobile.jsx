import React from 'react';
import MainButton from '../../Buttons/MainButton';
import SecondaryButton from '../../Buttons/SecondaryButton';
import NavBar from '../../NavBar/NavBar';
import SectionBenefits from '../../Sections/SectionBenefits';
import SectionHow from '../../Sections/SectionHow';
import SectionModelStores from '../../Sections/SectionModelStores';
import SectionStats from '../../Sections/SectionStats';
import TitleAndDescription from '../../TitleAndDescription';

function LandingMobile() {
    return (
        <div className='grid grid-col-1  min-h-screen  overflow-x-hidden '>
            <div className='absolute right-0 -top-5 md:-top-10 lg:-top-28'>
                <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96  bg-primary-light rounded-tl-full border border-primary-light  '></div>
                <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96  bg-primary-light rounded-bl-full border border-primary-light  '></div>
            </div>

            <div className='col-span-1  z-10'>
                <NavBar />
            </div>
            <div className='fixed flex w-screen justify-evenly bottom-10 z-20  '>
                <MainButton text='Client' />
                <SecondaryButton text='Shop' />
            </div>

            <section className='container flex flex-col gap-60 col-span-1 z-10 px-5 py-48'>
                <div data-aos='fade-in'>
                    <TitleAndDescription />
                </div>
            </section>

            <div className='flex flex-col gap-10 min-h-screen'>
                <section data-aos='fade-right' className='container col-span-1   '>
                    <SectionHow />
                </section>
                <section
                    data-aos='fade-left'
                    data-aos-delay='250'
                    className='container col-span-1  px-5  '
                >
                    <SectionBenefits />
                </section>

                <section data-aos='fade' data-aos-delay='250' className='container col-span-1'>
                    <SectionStats />
                </section>

                <section data-aos='fade-right' className=' col-span-1'>
                    <SectionModelStores />
                </section>
            </div>
        </div>
    );
}

export default LandingMobile;
