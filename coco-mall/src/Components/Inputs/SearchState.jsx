import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

const SearchState = ({ searchState, handleChange, handleSubmit }) => {
    console.log(searchState);
    return (
        <div className='flex flex-col w-1/5 m-auto mb-10'>
            <form
                className='bg-white flex items-center rounded-full shadow-md'
                onSubmit={handleSubmit}
            >
                        <input
                            className='rounded-l-full w-full py-4 px-6 text-gray-700 focus:outline-none'
                            type='text'
                            name='searchState'
                            placeholder='Search states..'
                            value={searchState}
                            onChange={handleChange}
                        />              
                <div className='relative inline-block w-12 mr-6 align-middle select-none'>
            </div>
            
            </form>
        </div>
    );
};

export default SearchState;
