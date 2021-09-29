import React, { useState, useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import MainButton from '../Components/Buttons/MainButton';
import NavBar from '../Components/NavBar';
import SecondaryButton from '../Components/Buttons/SecondaryButton';
import TitleAndDescription from '../Components/TitleAndDescription';
import SectionHow from '../Components/Sections/SectionHow';
import SectionBenefits from '../Components/Sections/SectionBenefits';
import SectionStats from '../Components/Sections/SectionStats';

function Landing() {
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 1024;

    useEffect(() => {
        Aos.init({ duration: 2000, offset: 200, once: true });
    }, []);

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
    }, []);

    return (
        <div className=' grid grid-col-1  min-h-screen  py-3'>
            {width < breakpoint ? (
                <div className='absolute right-0 -top-5 md:-top-10 lg:-top-28'>
                    <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96  bg-primary-light rounded-tl-full border border-primary-light  '></div>
                    <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96  bg-primary-light rounded-bl-full border border-primary-light  '></div>
                </div>
            ) : (
                <div className='absolute right-20 top-20 '>
                    <div className='w-96 h-96 rounded-full bg-primary-light'></div>
                </div>
            )}

            <section
                data-aos='fade-in'
                className=' container flex flex-col gap-60 col-span-1 z-10 px-5 py-5'
            >
                <div className=' col-span-1  z-10 px-5'>
                    <NavBar />
                </div>
                <div>
                    <TitleAndDescription />
                </div>
            </section>
            <div className='   fixed flex w-screen justify-evenly bottom-10 z-20  '>
                <MainButton text='Client' />
                <SecondaryButton text='Shop' />
            </div>

            <div className='flex flex-col gap-10 '>
                <section data-aos='fade-right' className='container col-span-1   '>
                    <SectionHow />
                </section>
                <section data-aos='fade-up' className='container col-span-1  px-5  '>
                    <SectionBenefits />
                </section>

                <section className='container col-span-1'>
                    <SectionStats />
                </section>
            </div>
        </div>
    );
}

export default Landing;
