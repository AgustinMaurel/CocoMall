import React from 'react';

function FilterTypeProduct({ type, index, handleChecked, check }) {
    let style1 = 'relative my-4 mx-2 p-2 h-full rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:bg-cocoMall-50';
    let style2 = 'relative my-4 mx-2 p-2 h-full rounded-lg shadow-md flex flex-col items-center cursor-pointer bg-cocoMall-50';

    return (
        <label className={check[index] ? style2 : style1}>
            <div className='h-16 w-16'>
                <img className='p-2' src={`/category/${type?.Name}.png`} alt='category' />
            </div>
            <input
                type='checkbox'
                name={type?.id}
                value={type?.id}
                onChange={(e) => handleChecked(e, index)}
                checked={check[index]}
                className='absolute top-1 right-1'
            />
            <label className='text-gray-600 text-sm'>{type?.Name.toUpperCase()}</label>
        </label>
    );
}

export default FilterTypeProduct;
