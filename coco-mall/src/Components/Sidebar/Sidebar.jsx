import React from 'react';

const Sidebar = () => {
    return (
        <div className='hidden xl:flex w-full flex-col col-start-1 col-end-1 row-span-full relative border-r bg-gray-100 border-gray-200 p-5  '>
            <div className='flex flex-col '>
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
    );
};

export default Sidebar;
