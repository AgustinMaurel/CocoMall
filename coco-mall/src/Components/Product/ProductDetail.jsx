import React from 'react';

import ReactModal from 'react-modal';


import { Image } from 'cloudinary-react';

ReactModal.setAppElement('#root');
function ProductDetail(props) {
    const { product } = props;
    return (
        <div className='    flex justify-center w-full h-full'>
            <div className='flex justify-center items-center w-2/5 h-full p-6'>
                <Image
                    key={product.id}
                    cloudName='cocomalls'
                    publicId={product.cloudImage[0]}
                    width='400'
                    crop='scale'
                />
            </div>
            <div className='w-3/5 flex flex-col justify-between'>
                <div className='flex flex-col justify-center mt-14'>
                    <h4 className='text-5xl mb-5 whitespace-nowrap font-semibold'>
                        {product.productName.toUpperCase()}
                    </h4>
                    <p className='text-base md:text-lg mt-14   text-justify xl:whitespace-nowrap w-5/6 2xl:text-3xl'>
                        {product.description}
                    </p>
                    <span className='text-base md:text-lg   text-justify xl:whitespace-nowrap w-5/6 2xl:text-3xl'>
                        {product.stock} unidades
                    </span>
                    <span className='text-lg font-semibold mt-14  md:text-lg   text-justify xl:whitespace-nowrap w-5/6 2xl:text-3xl'>
                        ${product.price}
                    </span>
                    {product.discount > 0 ? <span>{product.discount}</span> : false}
                </div>
                <button className='font-bold text-center text-xl text-white bg-cocoMall-300 py-4' onClick={props.addToCart}>Add Cart</button>
            </div>
        </div>
    );
}

export default ProductDetail;
