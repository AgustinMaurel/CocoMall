import React, { useState } from 'react';
import ProductsCreate from '../Components/Forms/ProductsCreate';
import ShopCreate from '../Components/Forms/ShopCreate';
import NavBar from '../Components/NavBar';

function ShopCreation() {

const [isTrue, setIsTrue] = useState(true)



    return (
        <div className='  '>
            <div className='flex h-14 pt-4 border-b-2  border-gray-100 px-20 pb-3 z-10 '>
                <NavBar/>
            </div>

            <div className='flex flex-col  justify-center relative  w-3/4 bg-gray-200 items-center mx-auto rounded '>
                
                {/* <div className='absolute bg-red-200 w-full h-20 top-0 z-10 '>
                    <img className='object-cover relative ' src="https://promotonews.com/wp-content/uploads/2020/09/IMG-LOGO.jpg" alt="" />
                </div> */}
                <div className='flex w-full relative justify-center'>
                
                    <div>
                    
                    {isTrue ?
                        <ShopCreate  isTrue={isTrue} setIsTrue={setIsTrue}/>
                        :
                        <ProductsCreate />
                    }
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );
}

export default ShopCreation;
