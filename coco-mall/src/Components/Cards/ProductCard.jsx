import React from 'react';

function ProductCard({ productName, description, cloudImage }) {
    return (
        <article className='h-full shadow-lg m-4 rounded-md'>
            <img className='rounded-md h-40 w-full' src='https://picsum.photos/600/400?image=1083' alt='banner' />
            <div>
                <div className='text text-md text-center'>
                    <h3
                        className='text-primary font-bold
                                    md:text-lg
                                    xl:text-xl
                                    2xl:text-2xl
                                    mb-5'
                    >
                        {productName}
                    </h3>

                    <p className='text-sm p-6'>
                        {description}
                    </p>
                </div>
            </div>
            </article>
    );
}

export default ProductCard;