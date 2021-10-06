import React from 'react'

export default function Product(props) {
    const { product } = props
    console.log(product)
    return (
        <div key={product.id}>
            <h3>{product.productName}</h3>
            <p>{product.description}</p>
            <li>{product.price}</li>
            <li>{product.stock}</li>
            <img src={product.cloudImage} alt={product.productName} />
        </div>
    )
}
