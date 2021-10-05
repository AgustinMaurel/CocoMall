import React from 'react';
import HomeCards from '../Components/Cards/HomeCards';
import NavBar from '../Components/NavBar';
import cocoIcon from '../Assets/icons/coco_png.png'

import { useSelector } from 'react-redux';

function Home() {
    const allStores = useSelector((state) => state.stores);

    return (
        <div className='grid grid-col-6   grid-rows-8  h-screen '>
            <div className=' col-span-6 row-span-1 row-end-1  bg-gray-200 shadow '>
                <NavBar />
            </div>

            {/* SIDEBAR */}

            <div className='hidden lg:flex w-3/4 flex-col col-start-1 col-end-1  row-span-full relative pl-10 border-r bg-gray-100 border-gray-200 p-5  '>
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

            <div className='relative w-full  col-span-5 row-span-full  p-6 overflow-y-scroll'>
                <div className='cards p-3  '>
                    {allStores.allStores?.map((e, i) => (
                        <HomeCards
                            storeName={e.storeName}
                            description={e.description}
                            cloudImage={cocoIcon}
                            key={i}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
