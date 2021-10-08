import React from 'react';
import HomeCards from '../Components/Cards/HomeCards';
import NavBar from '../Components/NavBar/NavBar';
import cocoIcon from '../Assets/icons/coco_png.png'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getStoreDetail, getProductsStore } from '../Redux/actions/stores';

function Home() {
    const allStores = useSelector((state) => state.stores);
    const dispatch = useDispatch();

    const storeDetail = (id) => {
        dispatch(getStoreDetail(id))
        dispatch(getProductsStore(id))
    }

    return (
        <div className='grid grid-col-8   grid-rows-8  h-screen '>
            <div className=' col-span-8 row-span-1 row-end-1  bg-gray-200 shadow '>
                <NavBar />
            </div>

            {/* SIDEBAR */}

            <div className='hidden lg:flex w-4/4 flex-col col-start-1 col-end-1  row-span-full relative  border-r bg-gray-100 border-gray-200 p-5  '>
                <div className='flex flex-col '>
                    <label>Search</label>
                    <input
                        type='search'
                        placeholder='Shops/Products...'
                        name=''
                        id=''
                        className='relative  border border-secondary rounded px-2 w-full focus:outline-none  '
                    />
                </div>
                <div></div>
            </div>

            {/* CARDS */}

            <div className='relative w-full  col-span-7 row-span-full bg-gray-100 bg-opacity-50 p-6 overflow-y-scroll'>
                <div className='cards p-3  '>
                    {allStores.allStores?.map((e, i) => (
                        <Link
                            to={`/home/store/${e.id}`}
                            onClick={() => storeDetail(e.id)}
                        >
                            <HomeCards
                                storeName={e.storeName}
                                description={e.description}
                                cloudImage={cocoIcon}
                                key={i}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
