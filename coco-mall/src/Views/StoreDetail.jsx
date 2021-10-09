import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import NavBar from '../Components/NavBar/NavBar';
import Product from '../Components/Product/Product';
import { getStoreDetail, getProductsStore } from '../Redux/actions/stores';

import CartItem from '../Components/ShoppingCart/CartItem';
import { addToCart, deleteAllFromCart, deleteFromCart } from '../Redux/actions/shoppingActions';

export default function StoreDetail() {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const storeDetail = useSelector((state) => state.stores.storeDetail);
    const storeProducts = useSelector((state) => state.stores.storeProducts);
    const shoppingCart = useSelector((state) => state.stores.cart);

    /*---------CREO OBJETO QUE MANDO AL BACK-------------*/

    let total = Object.values(shoppingCart).reduce(
        (previous, key) => previous + key.price * key.quantity,
        0,
    );

    let data = {
        title: 'Cart',
        total: total,
    };

    /*----------------------------------*/

    useEffect(() => {
        dispatch(getStoreDetail(id));
        dispatch(getProductsStore(id));
        return () => dispatch(getProductsStore());
    }, [dispatch, id]);

    /*---------LE PIDO AL BACK EL LINK DE PAGO------------*/

    const handleCheckout = () => {
        axios.post('http://localhost:3001/checkout/mercadopago', data).then((order) => {
            history.push(`/cart/${order.data.response}`);
        });
    };

    return (
        <div className='grid grid-cols-12  w-screen  grid-rows-8   h-screen '>
            <div className='  col-span-12 row-span-1 row-end-1  bg-gray-200 shadow  '>
                <NavBar  />
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
                            <Product
                                  product={product}
                                  key={product.id}
                                  addToCart={() => addToCart(product.id)}
                              />
                          ))
                        : false}
                </div>
            </div>
            <div className='bg-green-300  row-span-14  col-span-2  relative h-full  border-r border-gray-200   '>
                <div className='relative '>
                    <h3>Carrito</h3>
                   
                        <button className='border bg-red-600 text-white shadow p-1'>
                            Clear cart
                        </button>
                   
                      
                 
                    <div className='relative flex flex-col justify-between bg-yellow-400 h-full'>
                      
                        {shoppingCart && shoppingCart?.map(item => (
                            <CartItem key={item.id}
                                      data={item}
                                      deleteFromCart={deleteFromCart}
                                      deleteAllFromCart={deleteAllFromCart}
                            />
                        ))}
                      
                        <div>
                            <h1>Total : </h1>
                        </div>

                        <button  className='border'>
                            Ir al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
