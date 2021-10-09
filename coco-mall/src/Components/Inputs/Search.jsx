import React from 'react';
import { BsSearch } from 'react-icons/bs';

const Search = ({search, handleChange, handleSubmit}) => {
    return (
        <div className='flex flex-col w-3/4 m-auto mb-10'>
            <form class='bg-white flex items-center rounded-full shadow-md'
            onSubmit={handleSubmit}
            >
                {/* Hay que meter un switch dependiendo si busco por tienda o
                por producto */}
                <input
                    class='rounded-l-full w-full py-4 px-6 text-gray-700 focus:outline-none'
                    type='text'
                    name='searchProduct'
                    placeholder='Search'
                    onChange={handleChange}
                    value={search}
                />
                <button class='text-cocoMall hover:text-secondary w-14 h-14 flex items-center justify-center'>
                    <BsSearch />
                </button>
                
            </form>
        </div>
    );
};

export default Search;
