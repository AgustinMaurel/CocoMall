import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import Product from '../Components/Product/Product';
import { getStoreDetail, getProductsStore } from '../Redux/actions/stores';

export default function StoreDetail() {
    const storeDetail = useSelector((state) => state.stores.storeDetail);
    const storeProducts = useSelector((state) => state.stores.storeProducts);
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getStoreDetail(id));
        dispatch(getProductsStore(id));
        return () => dispatch(getProductsStore());
    }, [dispatch]);

    return (
        <div className='grid grid-col-8   grid-rows-6  h-screen '>
            <div className=' col-span-8 row-span-1 row-end-1 flex  h-14 pt-4 border-b-2 border-gray-100 px-20 pb-3 z-10 '>
                <NavBar />
            </div>
            <div className='  col-span-8 row-span-2 row-end-2 flex  h-14 pt-4 border-b-2 border-gray-100 px-20 pb-3 z-10 '>
                Banner
            </div>
            <div className='flex w-4/4 flex-col col-start-1 col-end-1  row-span-full relative pl-10 border-r bg-gray-100 border-gray-200 p-5  '>
                <div className='flex flex-col '>
                    <label>Search</label>
                    <input
                        type='search'
                        placeholder='Shops/Products...'
                        name=''
                        id=''
                        className='relative  border border-secondary rounded px-2 w-full focus:outline-none  '
                    />
                </div>
            </div>

            <div className='flex w-4/4 flex-col col-start-8 col-end-8  row-span-full relative pl-10 border-r bg-gray-100 border-gray-200 p-5  '>
                <div className='flex flex-col '>
                    <h3>Carrito</h3>
                </div>
            </div>

            <div className='relative w-full  col-span-6 row-span-full  p-6 overflow-y-scroll'>
                <div className='cards p-3  '>

                    {
                    storeProducts.length ?
                    storeProducts?.map((product) => (
                        <Product product={product} />
                    ))
                    : false
                    }
                </div>
            </div>
        </div>
       
    );
}
