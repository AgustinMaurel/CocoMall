import React from 'react';
import {Image} from 'cloudinary-react'

export default function Product(props) {
    const { product } = props

    return (
        <div className='w-48 h-96 bg-gray-400 shadow-lg m-4 rounded-md' key={product.id}>
            <div className='border w-full h-2/3 flex'>
                <div className='w-1/3 h-full flex flex-col'>
                    <Image  
                                key={product.id}
                                cloudName='cocomalls' 
                                publicId={product.cloudImage[0]}
                                width="300"
                                crop="scale"
                                
                            />
                </div>
            </div>
            <div className='border w-full h-1/3 flex flex-col'>
                <h3>{product.productName}</h3>
                <p className='text-xs'>{product.description}</p>
                <li>{product.price}</li>
                <li>{product.stock}</li>

            </div>
        </div>
    )
}
