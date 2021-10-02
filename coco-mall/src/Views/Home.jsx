import React from 'react';
import HomeCards from '../Components/Cards/HomeCards';
import NavBar from '../Components/NavBar';
import homeStores from '../Helpers/homeStores';

function Home() {
    const data = homeStores();
    return (
        
        <div className='grid grid-col-6   grid-rows-8  h-screen px-5 '>
            <div className=' col-span-6 row-span-1 row-end-1 flex  h-14 pt-4 border-b-2 border-gray-100 px-20 pb-3 z-10  '>
                <NavBar />
            </div>

            {/* SIDEBAR */}

            <div className='flex flex-col col-start-1 col-end-1 row-span-full relative pl-10 border-r bg-gray-100 border-gray-200 p-5  '>
                <div>
                    <input
                        type='search'
                        name=''
                        id=''
                        className='relative w-full border border-blue-200'
                    />
                </div>
                <div>WASUP</div>
            </div>

            {/* CARDS */}
            
                <div className='relative w-full  col-span-5 row-span-full  p-6 overflow-y-scroll'>
                    <div className='cards p-3  '>
                        {data?.map((_e, i) => (
                            <HomeCards key={i} />
                        ))}
                    </div>
                </div>
        </div>
            
    );
}

export default Home;
