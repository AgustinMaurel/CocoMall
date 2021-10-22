import React from 'react';

import { Image } from 'cloudinary-react';

export default function Product(props) {
    const { product } = props;

    return (
        <div
            className='flex flex-col justify-between gap-2 p-4 w-48 h-96 bg-white m-4 rounded-md shadow-lg cursor-pointer hover:shadow-xl transition'
            key={product.id}
        >
            <picture className='w-full h-2/3 rounded-md overflow-hidden'>
                <Image
                    key={product.id}
                    cloudName='cocomalls'
                    publicId={product.cloudImage[0]}
                    width='300'
                    crop='scale'
                    className='object-cover h-44'
                />
            </picture>

            <div className='w-full h-1/3 flex flex-col'>
                <h3 className='font-medium text-base leading-tight text-cocoMall-800'>
                    {product.productName.toUpperCase()}
                </h3>
                {/* <p className='text-xs text-cocoMall-600'>{product.description}</p> */}
            </div>
                <p className='text-xs text-cocoMall-600'>{product.stock} unidades</p>
                <div className='font-bold text-center text-xl text-white bg-cocoMall-300 rounded-md'>
                    <span>${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
                </div>
        </div>
    );
}
