import React from 'react';
import './Landing.css';
import MainButton from '../../Buttons/MainButton';
import SecondaryButton from '../../Buttons/SecondaryButton';
import NavBar from '../../NavBar/NavBar';
import TitleAndDescription from '../../TitleAndDescription';
import WebPreview from '../../../Assets/images/WebPreview.png';
import SectionHow from '../../Sections/SectionHow';
import SectionBenefits from '../../Sections/SectionBenefits';
import SectionStats from '../../Sections/SectionStats';
import SectionModelStores from '../../Sections/SectionModelStores';
import { useSelector } from 'react-redux';

// import SectionStats from '../../Sections/SectionStats';

function LandingDesktop() {
    const userStore = useSelector((state) => state.stores);
    const user = useSelector((state) => state.auth);
    return (<>
        <div className=' '>
                    <NavBar className='z-10 '/>
            <section className=' flex  justify-between items-center gap-5 pr-8 z-1  '>
                

                <div data-aos='fade-in' className=' overflow-hidden flex flex-col pl-12 2xl:pl-32 gap-y-16 relative w-max   '>
                    <div >
                        <TitleAndDescription />
                    </div>
                    <div className='flex flex-row  relative gap-x-5 w-full justify-start z-20  '>
                        
                    <MainButton text='Go Shopping' />
                
                {userStore.allStores.find(store => store.id === user.uid) && <SecondaryButton text='My shop' /> }
                <SecondaryButton text='Create Shop' />
                    </div>
                </div>

                <div className='  right-5 top-28 2xl:top-32  '>
                <div className='relative custom 2xl:customXl rounded-full bg-primary-light'>
                    <img
                        src={WebPreview}
                        alt=''
                        className='absolute right-0 2xl:right-20  overflow top-20 object-cover '
                    />
                </div>
            </div>

            </section>

          

            <div className='w-full '>
            
                <section data-aos='fade-right'>
                    <SectionHow />
                </section>
                <section
                
                    data-aos='fade'
                    data-aos-delay='250'
                    className=' col-span-1 px-5  '
                >
                    <SectionBenefits />
                </section>

                <section data-aos='fade' data-aos-delay="250" className=' col-span-1' >
                    <SectionStats />
                </section>

                <section data-aos='fade-right' className=' col-span-1' >
                    <SectionModelStores />
                </section>
            </div>
        </div>
        </>
    );
}

export default LandingDesktop;
