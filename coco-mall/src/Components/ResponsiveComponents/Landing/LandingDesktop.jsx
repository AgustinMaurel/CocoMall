import React from 'react';
import MainButton from '../../Buttons/MainButton';
import SecondaryButton from '../../Buttons/SecondaryButton';
import NavBar from '../../NavBar';
import TitleAndDescription from '../../TitleAndDescription';
import WebPreview from '../../../Assets/images/WebPreview.png';
import SectionHow from '../../Sections/SectionHow';

function LandingDesktop() {
    return (
        <div className='grid grid-col-6 '>
            <section className='  flex flex-col gap-60  z-10 px-5 '>
                <div className='flex  h-14 pt-4 border-b-2 border-gray-100 px-20 pb-3 z-10 '>
                    <NavBar />
                </div>

                <div className='flex flex-col 2xl:pl-20 gap-y-16 relative w-max px-5'>
                    <div data-aos='fade-in'>
                        <TitleAndDescription />
                    </div>
                    <div className='flex flex-row  relative gap-x-5 w-full justify-start z-20  '>
                        <MainButton text='Client' />
                        <SecondaryButton text='Shop' />
                    </div>
                </div>
            </section>

            <div className='absolute right-0  top-20 '>
                <div className='relative custom rounded-full bg-primary-light'>
                    <img
                        src={WebPreview}
                        alt=''
                        className='absolute right-0 top-10 object-cover '
                    />
                </div>
            </div>

            <div className='w-screen '>
                <section data-aos='fade-right'>
                    <SectionHow />
                </section>
                {/* <section
                    data-aos='fade-up'
                    data-aos-offset='0'
                    className='container col-span-1  px-5  '
                >
                    <SectionBenefits />
                </section> */}

                {/* <section className='container col-span-1'>
                    <SectionStats />
                </section> */}
            </div>
        </div>
    );
}

export default LandingDesktop;
