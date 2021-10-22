import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MainButton from '../../Buttons/MainButton';
import SecondaryButton from '../../Buttons/SecondaryButton';
import NavBar from '../../NavBar/NavBar';
import SectionBenefits from '../../Sections/SectionBenefits';
import SectionHow from '../../Sections/SectionHow';
import SectionModelStores from '../../Sections/SectionModelStores';
import SectionStats from '../../Sections/SectionStats';
import TitleAndDescription from '../../TitleAndDescription';

function LandingMobile() {
    const userStore = useSelector((state) => state.stores);
    const user = useSelector((state) => state.auth);

    return (
        <div className='grid grid-col-1  min-h-screen  '>
            <div className='absolute right-0 -top-5 md:-top-10 lg:-top-28'>
                <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96  bg-primary-light rounded-tl-full border border-primary-light  '></div>
                <div className='w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96  bg-primary-light rounded-bl-full border border-primary-light  '></div>
            </div>

            <div className='sticky top-0 col-span-1  z-20'>
                <NavBar />
            </div>
            <div className='fixed flex w-screen justify-evenly bottom-5 z-20  '>
                <MainButton text='Go Shopping' />

                {userStore.allStores.find((store) => store.id === user.uid) && (
                    <SecondaryButton text='My shop' />
                )}
                <SecondaryButton text='Create Shop' />
            </div>

            <section className='container flex flex-col gap-60 col-span-1 z-10 px-5 pt-40'>
                <div data-aos='fade-in'>
                    <TitleAndDescription />
                </div>
            </section>

            <div className='flex flex-col gap-10 min-h-screen'>
                <section data-aos='fade-right' className='container col-span-1   '>
                    <SectionHow />
                </section>
                <section
                    data-aos='fade-in'
                    data-aos-delay='250'
                    className='container col-span-1  px-5  '
                >
                    <SectionBenefits />
                </section>

                <section
                    data-aos='fade-right'
                    data-aos-delay='250'
                    className='container col-span-1'
                >
                    <SectionStats />
                </section>

                <section data-aos='fade' className=' col-span-1'>
                    <SectionModelStores />
                </section>

                <section className='flex flex-col gap-20 items-center justify-center '>
                    <h2 className='text-4xl font-bold'>Get started</h2>
                    <div className='shadow  flex items-center justify-center bg-primary w-44 h-12  xl:h-12 xl:w-44    '>
                        <Link
                            className='relative w-full h-full flex items-center align-center justify-center'
                            to='/auth/register'
                        >
                            <button className='w-full focus:outline-none text-white text-center text-base md:text-lg  xl:text-xl'>
                                Create account
                            </button>
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default LandingMobile;
