import React, { useState } from 'react';

const Search = ({
    typeSearch,
    setTypeSearch,
    searchProduct,
    searchStore,
    handleChange,
    handleSubmit,
}) => {
    const handleSearch = () => {
        setTypeSearch(!typeSearch);
    };
    return (
        <div className='flex flex-col 2xl:w-3/4 m-auto mb-4'>
            <form
                className='bg-white flex items-center rounded-full shadow-md'
                onSubmit={handleSubmit}
            >
                {typeSearch !== undefined && !typeSearch ? (
                    <>
                        <input
                            className='rounded-l-full w-full py-3 px-4 xl:py-4 xl:px-6 text-gray-700 focus:outline-none'
                            type='text'
                            name='searchStore'
                            placeholder='Search stores..'
                            onChange={handleChange}
                            value={searchStore}
                        />
                    </>
                ) : (
                    <>
                        <input
                            className='rounded-l-full w-full py-3 px-4 xl:py-4 xl:px-6 text-gray-700 focus:outline-none placeholder-cocoMall-400'
                            type='text'
                            name='searchProduct'
                            placeholder='Search products..'
                            onChange={handleChange}
                            value={searchProduct}
                        />
                    </>
                )}
                {/* CHECKBOX */}
                {searchStore !== undefined ? (
                    <div className='relative inline-block w-12 mr-6 align-middle select-none'>
                        <input
                            className='toggle-checkbox absolute block w-5 h-5 2xl:w-6 2xl:h-6 rounded-full bg-white border-4 border-gray-200 appearance-none cursor-pointer'
                            type='checkbox'
                            name='searchType'
                            id='searchType'
                            checked={typeSearch}
                            onChange={handleSearch}
                        />
                        <label
                            for='searchType'
                            className='toggle-label block overflow-hidden h-5 2xl:h-6 rounded-full bg-gray-300 cursor-pointer'
                        ></label>
                    </div>
                ) : (
                    <div className='relative inline-block w-12 mr-6 align-middle select-none'></div>
                )}
                {/* <button class='text-cocoMall hover:text-secondary w-14 h-14 flex items-center justify-center'>
                <BsSearch />
                </button> */}
            </form>
        </div>
    );
};

export default Search;
