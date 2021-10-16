import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import NavBar from '../Components/NavBar/NavBar';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
    addToCart,
    clearCart,
    deleteAllFromCart,
    deleteFromCart,
    setCart,
} from '../Redux/actions/shoppingActions';
import { SHOPPING_CART } from '../Scripts/constants';
import { Image } from 'cloudinary-react';

export default function Cart() {
    const history = useHistory();
    const dispatch = useDispatch();

    const { userCart, uid } = useSelector((state) => state.auth);

    // console.log(cart, 'es el userCart con el local storage añadido');

    let total =
        userCart.length > 0 &&
        Object.values(userCart).reduce((previous, key) => previous + key.price * key.quantity, 0);

    let objectToCheckout = {
        title: 'Cart Products',
        total: total,
        quantity: 1,
    };

    let storageCart = useMemo(() => {
        return {
            userId: uid,
            cart: userCart?.map((item) => {
                return {
                    id: item.id,
                    quantity: item.quantity,
                };
            }),
        };
    }, [userCart, uid]);

    // let userCartToBack = {};

    // console.log(userCartToBack, 'userCartToBack');

    // console.log(userCartToBack, 'va al back');

    const handleDeleteOne = (id, quantity) => {
        dispatch(deleteFromCart(id, quantity, userCart, uid));
    };
    const handleAddButton = (id, quantity) => {
        dispatch(addToCart(id, quantity, userCart, uid));
        // axios.post(SHOPPING_CART.ADD_TO_CART, storageCart);
    };
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // useEffect(() => {
    //     return () =>
    //         userCart.length > 0 &&
    //         axios.post(SHOPPING_CART.ADD_TO_CART, storageCart).then((res) => {
    //             return {
    //                 ...userCart,
    //                 quantity: res.data.quantity,
    //             };
    //         });
    // }, [userCart]);

    useEffect(() => {
        axios
            .get(`/user/${uid}`)
            .then((res) => {
                console.log(res.data.Cart);
                dispatch(setCart(res.data.Cart));
            })
            .catch((err) => console.log(err));
    }, []);

    // useEffect(() => {
    //     // axios.post(SHOPPING_CART.ADD_TO_CART, storageCart);
    // }, [storageCart]);

    // let productCarts;
    // useEffect(() => {
    //     productCarts = cart?.map((el) => el);
    // }, [userCart]);

    // console.log(async () => await cart?.map((el) => el.productName), 'storage cart');
    // console.log(productCarts, 'soy product carts (locale storage)');

    // useEffect(() => {
    //     const data = localStorage.getItem('user-cart');
    //     if (data) {
    //         setCart([...JSON.parse(data)]);
    //     }
    // }, [userCart]);

    // useEffect(() => {
    //     localStorage.setItem('user-cart', JSON.stringify(userCart));
    //     // axios.post(SHOPPING_CART.ADD_TO_CART, storageCart);
    // }, [userCart]);

    function handleCheckout() {
        return userCart.length > 0
            ? axios
                  .post('/checkout/mercadopago', objectToCheckout)
                  .then((order) => {
                      history.push(`/checkout/${order.data.response}`);
                  })
                  .catch((err) => console.log(err))
            : false;
    }

    return (
        <div className=''>
            <div className=' sticky bg-white shadow top-0 z-20'>
                <NavBar />
            </div>

            <div className='flex  justify-center relative   py-4 px-1 '>
                <div className='flex flex-col relative py-5 px-2  w-full h-full items-center align-center content-center justify-around rounded  gap-5  '>
                    {userCart.length > 0 && (
                        <div className='shadow-lg flex items-center self-start justify-center bg-white  border border-red-600  text-primary  rounded h-8 px-1 z-50'>
                            <button
                                onClick={handleClearCart}
                                className='text-xs text-red-600 font-semibold h-full w-full z-50'
                            >
                                Clear Cart
                            </button>
                        </div>
                    )}

                    {userCart?.length > 0 ? (
                        userCart?.map((el) => (
                            <>
                                <div
                                    key={el.id}
                                    className='bg-white  border border-gray-200 rounded w-full flex flex-col shadow-lg py-5 h-36 justify-around  relative gap-2'
                                >
                                    <div className='flex flex-row   relative w-full px-5 gap-4'>
                                        <div className='justify-self-start self-start shadow '>
                                            <Image
                                                publicId={el.cloudImage[0]}
                                                width='125'
                                                className='object-cover '
                                                cloudName='cocomalls'
                                                crop='scale'
                                            />
                                        </div>
                                        <div className='flex flex-col flex-none flex-no-wrap'>
                                            <h2 className='font-bold text-md'>{el.productName}</h2>
                                            <p className='text-sm'>${el.price * el.quantity}</p>
                                            <p className='text-xs'>Stock left: {el.stock}</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-row items-center w-full content-center justify-center gap-5'>
                                        <button
                                            id='btn-delete'
                                            onClick={() => handleDeleteOne(el.id, el.quantity, uid)}
                                            className='h-6 w-6 flex   items-center justify-center bg-secondary  rounded-full text-white font-bold text-lg cursor-pointer'
                                        >
                                            -
                                        </button>
                                        <p className='font-bolder'>{el.quantity}</p>
                                        <button
                                            id='btn-add'
                                            onClick={() => handleAddButton(el.id, el.quantity, uid)}
                                            disabled={el.stock === el.quantity}
                                            className={
                                                el.stock !== el.quantity
                                                    ? `h-6 w-6 flex items-center justify-center bg-secondary  rounded-full text-white font-bold text-lg cursor-pointer`
                                                    : `h-6 w-6 flex  items-center justify-center bg-gray-200  rounded-full text-white font-bold text-lg cursor-not-allowed`
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className='border border-gray-100 w-full'></div>
                            </>
                        ))
                    ) : (
                        <>
                            <div className=' absolute -bottom-40 flex flex-col gap-4'>
                                <h2 className='text-2xl font-bold'>Your cart is empty :(</h2>
                                <p>Take a look at our stores and search for what you need!</p>
                            </div>
                            <div
                                className='shadow-lg flex items-center justify-center bg-white  border border-primary  text-primary w-40 rounded-md h-8     absolute -bottom-60        
                                    xl:border-none xl:shadow-none xl:bg-secondary-light xl:h-12 xl:w-44  '
                            >
                                <Link
                                    to='/home'
                                    className=' focus:outline-none text-center text-base 
                                        md:text-lg
                                      xl:text-primary xl:text-xl'
                                >
                                    Go to Home
                                </Link>
                            </div>
                        </>
                    )}

                    {userCart.length > 0 && (
                        <div
                            className='shadow-lg flex items-center justify-center bg-white  border border-primary  text-primary w-40 rounded-md h-8 
                                        xl:border-none xl:shadow-none xl:bg-secondary-light xl:h-12 xl:w-44  '
                        >
                            <button
                                className=' focus:outline-none text-center text-base
                                            md:text-lg
                                          xl:text-primary xl:text-xl'
                                onClick={handleCheckout}
                            >
                                Go to checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {!userCart.length && (
                <>
                    <div className='absolute h-14 w-14 rounded-full bg-primary bottom-50 right-20 z-0'></div>
                    <div className='absolute h-32 w-32 rounded-full bg-primary bottom-20 left-10 z-0'></div>
                </>
            )}
        </div>
    );
}
