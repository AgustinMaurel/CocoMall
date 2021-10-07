import React, { useEffect } from 'react';
import axios from 'axios';
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
    const storeDetail = useSelector((state) => state.stores.storeDetail);
    const storeProducts = useSelector((state) => state.stores.storeProducts);
    const shoppingCart = useSelector((state) => state.stores.cart);

    let total = Object.values(shoppingCart).reduce(
        (previous, key) => previous + key.price * key.quantity,
        0,
    );
   
   
    

    useEffect(() => {
        dispatch(getStoreDetail(id));
        dispatch(getProductsStore(id));
        return () => dispatch(getProductsStore());
    }, [dispatch, id]);

    const handleCheckout = () => {
        // console.log('compre');
        let data = {
            title: shoppingCart.map(el => el.productName).join(", "),
            total: total,
        };
       
        // axios.post('http://localhost:3001/checkout/mercadopago', data);
    };

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
            <div className='bg-green-300  row-span-14  col-span-2  relative h-full  border-r border-gray-200   '>
                <div className='relative '>
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
                    <div className='relative flex flex-col justify-between bg-yellow-400 h-full'>
                        {shoppingCart?.map((item, index) => (
                            <CartItem
                                key={index}
                                data={item}
                                deleteFromCart={() => dispatch(deleteFromCart(item.id))}
                                deleteAllFromCart={() => dispatch(deleteAllFromCart(item.id))}
                            />
                        ))}
                        <div>
                            <h1>Total : {total}</h1>
                        </div>
                        <button onClick={handleCheckout} className='border'>
                            Comprar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
//post a
//http://localhost:3001/checkout/mercadopago
/*
    let objetct = {
        title: "coco remera",
        unit_price: 100,
        quantity: 1,
    }
    */
//back devuelve un json con la url a redireccionar
//
