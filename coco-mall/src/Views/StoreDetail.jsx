import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar/NavBar';
import Product from '../Components/Product/Product';
import { getStoreDetail, getProductsStore } from '../Redux/actions/stores';
import {
    addToCart,
    deleteFromCart,
    deleteAllFromCart,
    clearCart,
} from '../Redux/actions/shoppingActions';
import CartItem from '../Components/ShoppingCart/CartItem';

export default function StoreDetail() {
    const { id } = useParams();

    const dispatch = useDispatch();
    //const storeDetail = useSelector((state) => state.stores.storeDetail);
    const storeProducts = useSelector((state) => state.stores.storeProducts);
    const shoppingCart = useSelector((state) => state.stores.cart);

    useEffect(() => {
        dispatch(getStoreDetail(id));
        dispatch(getProductsStore(id));
        return () => dispatch(getProductsStore());
    }, [dispatch, id]);

    return (
        <div className='grid grid-cols-12  w-screen  grid-rows-8   h-screen '>
            <div className='  col-span-12 row-span-1 row-end-1  bg-gray-200 shadow  '>
                <NavBar />
            </div>
            <div className='  bg-red-200 col-span-12  border-b-2 mx-auto flex justifi-center relative w-3/4 border-gray-100 '>
                Banner
            </div>

            {/* SIDEBAR */}
            <div
                className=' col-span-2  row-span-14
                bg-gray-100 border-gray-200 border-r  p-5   '
            >
                <div className='  '>
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

            <div className='flex flex-col  col-span-8 row-span-14     '>
                <div className='cards   overflow-y-scroll '>
                    {storeProducts.length
                        ? storeProducts?.map((product) => (
                              <Product product={product} addToCart={() => addToCart(product.id)} />
                          ))
                        : false}
                </div>
            </div>
            <div className='bg-green-300 flex row-span-14 col-span-2    border-r border-gray-200   '>
                <div className=' '>
                    <h3>Carrito</h3>
                    {shoppingCart.length ? (
                        <button
                            className='border bg-red-600 text-white shadow p-1'
                            onClick={() => dispatch(clearCart())}
                        >
                            Clear cart
                        </button>
                    ) : (
                        false
                    )}
                    {shoppingCart?.map((item, index) => (
                        <CartItem
                            key={index}
                            data={item}
                            deleteFromCart={() => dispatch(deleteFromCart(item.id))}
                            deleteAllFromCart={() => dispatch(deleteAllFromCart(item.id))}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
