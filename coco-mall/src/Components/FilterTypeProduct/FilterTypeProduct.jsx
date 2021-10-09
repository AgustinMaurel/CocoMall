import React from 'react';

function FilterTypeProduct({ type, index, handleChecked, check }) {
    return (
        <button
            // type='checkbox'
            // name={type?.id}
            // value={type?.id}
            // onChange={(e) => handleChecked(e, index)}
            // checked={check[index]}
            className='h-full rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:bg-cocoMall-50 focus:bg-cocoMall-50'
        >
            <img className='p-6' src={`/category/${type?.Name}.png`} alt='category' />
            <label className='text-gray-600 text-sm'>{type?.Name.toUpperCase()}</label>
            <input 
                type='checkbox'
                name={type?.id}
                value={type?.id}
                onChange={(e)=> handleChecked(e, index)}
                checked={check[index]}
            />
        </button>
    );
}

export default FilterTypeProduct;
