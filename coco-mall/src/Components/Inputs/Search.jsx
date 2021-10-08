import React from 'react';
import { BsSearch } from 'react-icons/bs';

const Search = () => {
    return (
        <div className='flex flex-col w-3/4 m-auto mb-10'>
            <div class='bg-white flex items-center rounded-full shadow-md'>
                <input
                    class='rounded-l-full w-full py-4 px-6 text-gray-700 focus:outline-none'
                    type='text'
                    placeholder='Search'
                />
                <button class='text-cocoMall hover:text-secondary w-14 h-14 flex items-center justify-center'>
                    <BsSearch />
                </button>
                
            </div>
        </div>
    );
};

export default Search;
