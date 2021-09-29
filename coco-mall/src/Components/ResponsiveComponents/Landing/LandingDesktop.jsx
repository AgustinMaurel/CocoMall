import React from 'react';
import MainButton from '../../Buttons/MainButton';
import SecondaryButton from '../../Buttons/SecondaryButton';
import NavBar from '../../NavBar';
import TitleAndDescription from '../../TitleAndDescription';
import WebPreview from '../../../Assets/images/WebPreview.png';
import SectionHow from '../../Sections/SectionHow';

function LandingDesktop() {
    return (
        <div>
            <div className='flex flex-row  relative gap-x-10 w-full justify-start z-20  '>
                <MainButton text='Client' />
                <SecondaryButton text='Shop' />
            </div>
            <div className='absolute right-0 top-20 '>
                <div className='relative custom rounded-full bg-primary-light'>
                    <img
                        src={WebPreview}
                        alt=''
                        className='absolute right-0 top-10 object-cover w-full'
                    />
                </div>
            </div>
            <section className='  flex flex-col gap-60 col-span-1 z-10 px-10 py-5'>
                <div className=' col-span-1  z-10 px-5'>
                    <NavBar />
                </div>

                <div className='flex flex-col gap-y-10 relative w-max'>
                    <div data-aos='fade-in'>
                        <TitleAndDescription />
                    </div>
                </div>
            </section>

            <div className='flex flex-col gap-10 '>
                <section data-aos='fade-right' className='container col-span-1   '>
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
