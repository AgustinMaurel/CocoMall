import React from 'react';

import ReactModal from 'react-modal';
import Product from './Product';

ReactModal.setAppElement('#root');

function ProductDetail(props) {
    console.log(props);
    const { product } = props;
    return (
        <div>
            <h3>{product.productName}</h3>
            <img src={product.cloudImageUrl} alt={product.productName} />
            <p>{product.description}</p>
            <span>{product.price}</span>
            <span>{product.stock}</span>
            <button onClick={props.addToCart}>Add Cart</button>
        </div>
    );
}

export default ProductDetail;
