import React from 'react'
import { addToCart } from '../../Redux/actions/shoppingActions'
import { useDispatch } from 'react-redux'
import { useParams, Link, useLocation } from 'react-router-dom';
import { getProductDetail } from '../../Redux/actions/stores'

export default function Product(props) {
    const dispatch = useDispatch()
    const location = useLocation();
    const { product } = props

    return (
        <div key={product.id}>
            <h3>{product.productName}</h3>
            <p>{product.description}</p>
            <li>{product.price}</li>
            <li>{product.stock}</li>
            <img src={product.cloudImage} alt={product.productName} />


            
            <button class='border '  onClick={() =>dispatch(props.addToCart(product.id))}>
                    Add to cart
            </button>
        </div>
    )
}
