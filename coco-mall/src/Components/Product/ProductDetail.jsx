import React from 'react';
import { Image } from 'cloudinary-react';

function ProductDetail(props) {
    const { product } = props;
    return (
        <div className='flex flex-col justify-center w-3/4'>
            <h4 className='text-5xl md:text-6xl  mb-5 whitespace-nowrap font-black 2xl:text-8xl'>{product.productName}</h4>
            <div>
            <Image  
                                key={product.id}
                                cloudName='cocomalls' 
                                publicId={product.cloudImage[0]}
                                width="300"
                                crop="scale"
                                
                            />
            </div>
            <p className='text-base md:text-lg   text-justify xl:whitespace-nowrap w-5/6 2xl:text-3xl'>{product.description}</p>
            <span className='text-base md:text-lg   text-justify xl:whitespace-nowrap w-5/6 2xl:text-3xl'>{product.price}</span>
            <span className='text-base md:text-lg   text-justify xl:whitespace-nowrap w-5/6 2xl:text-3xl'>{product.stock}</span>
            {product.discount > 0 ? <span>{product.discount}</span> : false}
            <button onClick={props.addToCart}>Add Cart</button>
        </div>
    );
}

export default ProductDetail;
