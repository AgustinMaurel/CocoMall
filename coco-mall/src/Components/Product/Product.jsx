import React from 'react';
import { useDispatch } from 'react-redux'
import { useParams, Link, useLocation } from 'react-router-dom';

import { addToCart } from '../../Redux/actions/shoppingActions'
import { getProductDetail } from '../../Redux/actions/stores'

export default function Product(props) {
    const dispatch = useDispatch()
    const location = useLocation();
    const { product } = props

    return (
        <div className='w-48 h-96 bg-gray-400 shadow-lg m-4 rounded-md' key={product.id}>
            <div className='border w-full h-2/3 flex'>
                <img className='w-2/3 object-contain flex' src={product.cloudImage} alt={product.productName} />
                <div className='w-1/3 h-full flex flex-col'>
                    <img className='h-1/3 object-contain mx-2 my-4' src={product.cloudImage} alt={product.productName} />
                    <img className='h-1/3 object-contain mx-2 my-4' src={product.cloudImage} alt={product.productName} />
                </div>
            </div>
            <div className='border w-full h-1/3 flex flex-col'>
                <h3>{product.productName}</h3>
                <p className='text-xs'>{product.description}</p>
                <li>{product.price}</li>
                <li>{product.stock}</li>


                
                <button class='border '  onClick={() =>dispatch(props.addToCart(product.id))}>
                        Add to cart
                </button>
            </div>
        </div>
    )
}
