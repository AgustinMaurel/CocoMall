import React from 'react';


function ProductDetail(props) {
    const { product } = props;
    return (
        <div>
            <h3>{product.productName}</h3>
            <img src={product.cloudImageUrl} alt={product.productName} />
            <p>{product.description}</p>
            <span>{product.price}</span>
            <span>{product.stock}</span>
            {product.discount > 0 ? <span>{product.discount}</span> : false}
            <button onClick={props.addToCart}>Add Cart</button>
        </div>
    );
}

export default ProductDetail;
