import React from 'react';
import Product from './Product'

function SubCat({ SubCatName, Products }) {
    return (
        <div className="flex flex-wrap">
            <h3>{SubCatName}</h3>
            {Products?.map((product) => {
                return <Product product={product} />;
            })}
        </div>
    );
}

export default SubCat;
