import React, { useState } from 'react';
import ProductsCreate from '../Components/Forms/ProductsCreate';
import ShopCreate from '../Components/Forms/ShopCreate';
import NavBar from '../Components/NavBar/NavBar';
import shopImg from '../Assets/images/website_builder.svg';
import productCreate from '../Assets/images/web_shopping.svg';
import { useSelector } from 'react-redux';

function ShopCreation() {
    const [isTrue, setIsTrue] = useState(true);
    const storeCreated = useSelector((state) => state.stores.storeCreated);

    return (
        <div className='h-screen flex flex-col gap-20'>
            <NavBar />
            <div className='h-full sm:h-5/6 w-full flex items-center justify-center'>
                <div className='w-full flex items-center justify-between'>
                    {isTrue ? (
                        <ShopCreate isTrue={isTrue} setIsTrue={setIsTrue} />
                    ) : (
                        <ProductsCreate idStore={storeCreated.id} />
                    )}

                    {isTrue ? (
                        <div className='hidden 2xl:flex 2xl:w-1/2 justify-end'>
                            <img className='w-3/4' src={shopImg} alt='website builder' />
                        </div>
                    ) : (
                        <div className='hidden 2xl:flex 2xl:w-2/3 justify-center'>
                            <img className='w-3/4' src={productCreate} alt='product create' />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShopCreation;
