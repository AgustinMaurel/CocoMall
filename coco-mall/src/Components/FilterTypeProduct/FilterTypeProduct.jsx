import React from 'react';

function FilterTypeProduct({ type, index, handleChecked, check, checkType }) {
    return (
        <label
            className={
                checkType.includes(type?.id)
                    ? 'bg-white border-4 border-cocoMall-200 relative my-4 mx-2 p-2 h-full rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:shadow-lg hover:border-cocoMall-200'
                    : 'bg-white border border-transparent relative my-4 mx-2 p-2 h-full rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:shadow-lg hover:border-cocoMall-200'
            }
        >
            <div className='h-16 w-16'>
                <img className='p-2' src={`/category/${type?.Name}.png`} alt='category' />
            </div>
            <input
                type='checkbox'
                name={type?.id}
                value={type?.id}
                onChange={(e) => handleChecked(e, index)}
                checked={check[index]}
                className='appearance-none absolute top-2 right-2'
            />
            <label className='text-gray-600 text-sm'>{type?.Name.toUpperCase()}</label>
        </label>
    );
}

export default FilterTypeProduct;
