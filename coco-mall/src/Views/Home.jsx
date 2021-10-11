import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreDetail, getProductsStore, getStores } from '../Redux/actions/stores';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { IoMdArrowRoundBack } from 'react-icons/io';

import HomeCard from '../Components/Cards/HomeCards';
import StoreState from '../Components/Cards/StoreState';
import NavBar from '../Components/NavBar/NavBar';
import Arrow from '../Components/Slides/Arrow';
import HeroCard from '../Components/Cards/HeroCard';
import Search from '../Components/Inputs/Search';
import FilterTypeProduct from '../Components/FilterTypeProduct/FilterTypeProduct';
import { handleOnChange, handleOnSubmit, handleOnChecked } from '../Scripts/handles';
import coco from '../Assets/icons/coco.png';

function Home() {
    const dispatch = useDispatch();
    const { productTypes, storesFilters, allStores } = useSelector((state) => state.stores);

    const [checkType, setCheckType] = useState([]);
    const [check, setCheck] = useState(new Array(productTypes.length).fill(false));
    const [filters, setFilters] = useState({
        searchStore: '',
        searchProduct: '',
        type: [],
        state: '',
        rating: '',
    });

    const storeDetail = (id) => {
        dispatch(getStoreDetail(id));
        dispatch(getProductsStore(id));
    };

    const settingsTypes = {
        infinite: true,
        slidesToShow: 9,
        slidesToScroll: 1,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
    };

    const settingsHero = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 3000,
        // pauseOnHover: true,
    };

    const settingsCards = {
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
    };

    let id;
    const handleChange = handleOnChange(setFilters);
    const handleSubmit = handleOnSubmit(filters, checkType, dispatch);
    const handleChecked = handleOnChecked(
        checkType,
        setCheckType,
        filters,
        dispatch,
        id,
        check,
        setCheck,
    );

    return (
        <div className='grid grid-col-6 grid-rows-8 h-screen bg-gray-50'>
            <div className='col-span-6 row-span-1 row-end-1 bg-gray-200 shadow'>
                <NavBar />
            </div>

            {/* CARDS */}
            <div className='w-full col-span-6 row-span-full p-6 overflow-y-scroll'>
                {/* --- ADS --- */}
                <div className='m-auto w-3/4'>
                    <Slider {...settingsHero}>
                        <HeroCard img={'/banners/bannerHero-1.png'} color={'bg-gray-500'} />
                        <HeroCard img={'/banners/bannerHero-2.png'} color={'bg-green-500'} />
                        <HeroCard img={'/banners/bannerHero-3.png'} color={'bg-blue-500'} />
                    </Slider>
                </div>

                {/* --- SEARCH & FILTERS --- */}
                <div className='w-3/4 m-auto mt-16'>
                    <Search
                        searchProduct={filters.searchProduct}
                        searchStore={filters.searchStore}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />

                    <div className='w-3/4 h-36 m-auto'>
                        <Slider {...settingsTypes}>
                            {productTypes?.map((type, index) => {
                                return (
                                    <FilterTypeProduct
                                        type={type}
                                        index={index}
                                        handleChecked={handleChecked}
                                        check={check}
                                    />
                                );
                            })}
                        </Slider>
                    </div>
                </div>

                <div className='w-3/4 m-auto mt-4'>
                    {/* --- STORES BY CITY --- */}
                    {allStores === storesFilters ? (
                        <div className='mt-6'>
                            <h3 className='text-2xl font-bold text-cocoMall-800'>
                                Stores in "Paraná"
                            </h3>
                            <Slider {...settingsCards}>
                                {allStores?.map((e, i) => (
                                    <Link
                                        to={`/home/store/${e.id}`}
                                        onClick={() => storeDetail(e.id)}
                                    >
                                        <StoreState
                                            storeName={e.storeName}
                                            description={e.description}
                                            cloudImage={e.logo || coco}
                                            key={i}
                                        />
                                    </Link>
                                ))}
                            </Slider>
                        </div>
                    ) : (
                        <button onClick={()=>{dispatch(getStores())}} className='flex items-center gap-2 text-cocoMall-200 mb-2 cursor-pointer hover:text-cocoMall-400'>
                            <IoMdArrowRoundBack/> <span>GO BACK</span>
                        </button>
                    )}

                    {/* --- ALL STORES ---- */}
                    <div className='mt-6'>
                        <h3 className='text-2xl font-bold text-cocoMall-800'>All Stores</h3>
                        <div className='cards'>
                            {storesFilters?.map((e, i) => (
                                <Link to={`/home/store/${e.id}`} onClick={() => storeDetail(e.id)}>
                                    <HomeCard
                                        storeName={e.storeName}
                                        description={e.description}
                                        cloudImage={e.logo || coco}
                                        key={i}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
