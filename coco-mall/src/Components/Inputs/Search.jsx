import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

const Search = ({ searchProduct, searchStore, handleChange, handleSubmit }) => {
    const [typeSearch, setTypeSearch] = useState(false);
    const handleSearch = () => {
        setTypeSearch(!typeSearch);
    };
    return (
        <div className='flex flex-col w-3/4 m-auto mb-10'>
            <form class='bg-white flex items-center rounded-full shadow-md' onSubmit={handleSubmit}>
                {/* Hay que meter un switch dependiendo si busco por tienda o
                por producto */}
                {!typeSearch ? (
                    <>
                        <input
                            class='rounded-l-full w-full py-4 px-6 text-gray-700 focus:outline-none'
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
                            class='rounded-l-full w-full py-4 px-6 text-gray-700 focus:outline-none'
                            type='text'
                            name='searchProduct'
                            placeholder='Search products..'
                            onChange={handleChange}
                            value={searchProduct}
                        />
                    </>
                )}
                <span>Products</span>
                <input
                    type='checkbox'
                    name='searchType'
                    checked={typeSearch}
                    onChange={handleSearch}
                />
                <button class='text-cocoMall hover:text-secondary w-14 h-14 flex items-center justify-center'>
                    <BsSearch />
                </button>
            </form>
        </div>
    );
};

export default Search;
