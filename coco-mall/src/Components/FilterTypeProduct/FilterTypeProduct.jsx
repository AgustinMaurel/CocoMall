import React, { useState } from 'react';

function FilterTypeProduct({ type, index, handleChecked, check, checkType }) {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <label
            className={
                checkType.includes(type?.id)
                    ? 'bg-white group border-4 border-cocoMall-200 relative my-4 mx-2 p-2 h-full rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:shadow-lg hover:border-cocoMall-200 transition-all'
                    : 'bg-white group border border-transparent relative my-4 mx-2 p-2 h-full rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:shadow-lg hover:border-cocoMall-200 transition-all'
            }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className='h-16 w-16 transition'>
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
            {isHovered ? (
                <p className='text-gray-600 text-sm '>{type?.Name.toUpperCase()}</p>
            ) : checkType.includes(type?.id) ? (
                <p className='text-cocoMall-400 text-sm '>{type?.Name.toUpperCase()}</p>
            ) : (
                <></>
            )}
        </label>
    );
}

export default FilterTypeProduct;
