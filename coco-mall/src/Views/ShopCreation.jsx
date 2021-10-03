import React, { useState } from 'react';
import ProductsCreate from '../Components/Forms/ProductsCreate';
import ShopCreate from '../Components/Forms/ShopCreate';
import NavBar from '../Components/NavBar';
import shopImg from '../Assets/images/shopCreate.png';
import productCreate from '../Assets/images/productCreate.png';

function ShopCreation() {
    const [isTrue, setIsTrue] = useState(true);

    return (
        <div className='flex flex-col overflow- '>
            <div className='flex h-14 pt-4 border-b-2  border-gray-100 px-20 pb-3 z-10 '>
                <NavBar />
            </div>

            <div className='flex items-center gap-10'>
                <div className='flex  relative px-20 w-3/5 shadow bg-gray-200 items-center  '>
                    <div className='flex w-full relative  '>
                        <div>
                            {isTrue ? (
                                <ShopCreate isTrue={isTrue} setIsTrue={setIsTrue} />
                            ) : (
                                <ProductsCreate />
                            )}
                        </div>
                    </div>
                </div>
                <div className='object-cover relative w-2/6 shadow-2xl'>
                    {isTrue ? <img src={shopImg} alt='' /> : <img src={productCreate} alt='' />}
                </div>
            </div>
        </div>
    );
}

export default ShopCreation;