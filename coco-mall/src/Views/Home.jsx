import React from 'react';
import { useDispatch } from 'react-redux';
import { getStoreDetail, getProductsStore } from '../Redux/actions/stores';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import HomeCards from '../Components/Cards/HomeCards';
import NavBar from '../Components/NavBar/NavBar';
import Arrow from '../Components/Slides/Arrow';
import HeroCard from '../Components/Cards/HeroCard';
import homeStores from '../Helpers/homeStores';
import Search from '../Components/Inputs/Search';

function Home() {
    const dispatch = useDispatch();

    const storeDetail = (id) => {
        dispatch(getStoreDetail(id));
        dispatch(getProductsStore(id));
    };

    const settingsHero = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

    const settingsCards = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1620,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  infinite: true,
                  dots: true
                }
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 4,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };

    return (
        <div className='grid grid-col-6 grid-rows-8 h-screen bg-gray-100'>
            <div className=' col-span-6 row-span-1 row-end-1 bg-gray-200 shadow'>
                <NavBar />
            </div>

            {/* CARDS */}

            <div className='w-full col-span-6 row-span-full p-6 overflow-y-scroll'>
                <div className='m-auto w-3/4'>
                    <Slider {...settingsHero}>
                        <HeroCard color={'bg-gray-500'} />
                        <HeroCard color={'bg-green-500'} />
                        <HeroCard color={'bg-blue-500'} />
                        <HeroCard color={'bg-red-500'} />
                    </Slider>
                </div>


                <div className='w-3/4 m-auto mt-16'>
                    <Search />

                    {/* Van los filtros acá */}
                    


                    <h3 className='text-2xl font-bold text-cocoMall-800'>Our recommendations</h3>
                    <Slider {...settingsCards}>
                        {homeStores()?.map((e, i) => (
                            <Link to={`/home/store/${e.id}`} onClick={() => storeDetail(e.id)}>
                                <HomeCards
                                    storeName={e.storeName}
                                    description={e.description}
                                    cloudImage={e.logo}
                                    key={i}
                                />
                            </Link>
                        ))}
                    </Slider>
                </div>

                <div className='w-3/4 m-auto mt-16'>
                    <h3 className='text-2xl font-bold text-cocoMall-800'>All stores</h3>
                    <div className='cards p-3'>
                        {homeStores()?.map((e, i) => (
                            <Link to={`/home/store/${e.id}`} onClick={() => storeDetail(e.id)}>
                                <HomeCards
                                    storeName={e.storeName}
                                    description={e.description}
                                    cloudImage={e.logo}
                                    key={i}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
