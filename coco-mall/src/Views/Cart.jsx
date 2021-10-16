import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import NavBar from '../Components/NavBar/NavBar';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
    addToCartSomo,
    cartDeleteSomo,
    clearCart,
    deleteAllItems,
} from '../Redux/actions/shoppingActions';
import { Image, Transformation } from 'cloudinary-react';

export default function Cart() {
    const history = useHistory();
    const dispatch = useDispatch();

    const que = '+';
    const cant = 1;

    const { userCart, uid } = useSelector((state) => state.auth);

    let total =
        userCart.length > 0 &&
        Object.values(userCart).reduce((previous, key) => previous + key.price * key.quantity, 0);

    let objectToCheckout = {
        title: 'Cart Products',
        total: total,
        quantity: 1,
    };

    const handleDeleteOne = (id) => {
        dispatch(cartDeleteSomo(uid, id));
    };

    const handleAddButton = (id) => {
        dispatch(addToCartSomo(uid, id, que, cant));
    };
    const handleClearCart = (id) => {
        dispatch(clearCart(id));
    };

    const handleDeleteAllItems = (id, cant) => {
        dispatch(deleteAllItems(uid, id, que, cant));
    };

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
        <div className='bg-gray-100 h-screen'>
            <div className=' sticky bg-white shadow top-0 z-20'>
                <NavBar />
            </div>

            {/* BANNER */}
            <div className='    h-20 flex flex-col items-center text-white justify-center content-center mx-auto w-full bg-cocoMall-200 '>
                <h3 className='text-5xl font-extrabold text-white'>MY CART</h3>
            </div>

            <div className='flex  justify-center relative bg-gray-100     '>
                <div className='flex flex-col relative py-2  w-full h-full items-center align-center content-center justify-around rounded  gap-5  '>
                    {/* CLEAR CART BUTTON */}
                    {userCart.length > 0 && (
                        <div className=' flex items-center self-start justify-center      text-primary   h-8 mx-2 px-1 z-10'>
                            <button
                                onClick={() => handleClearCart(uid)}
                                className='text-xs text-red-600 font-semibold z-50'
                            >
                                Clear Cart
                            </button>
                        </div>
                    )}

                    {/* CARDS */}
                    {userCart?.length > 0 ? (
                        userCart?.map((el) => (
                            <>
                                <div
                                    key={el.id}
                                    className=' bg-white    w-full flex flex-col shadow-lg   h-56 justify-around  relative  '
                                >
                                    <div className='flex flex-row h-full items-center  relative w-full px-5 gap-10  py-5'>
                                        <div className=' flex  justify-self-start items-center flex-none w-1/4 h-full '>
                                            <Image
                                                publicId={el.cloudImage[0]}
                                                cloudName='cocomalls'
                                            >
                                                <Transformation
                                                    gravity='auto'
                                                    height='200'
                                                    width='200'
                                                    crop='fill'
                                                />
                                            </Image>
                                        </div>
                                        <div className=' flex flex-col gap-2 flex-none   h-full  w-4/6 pr-2 '>
                                            <h2 className='font-bold text-cocoMall-800 text-lg'>
                                                {el.productName}
                                            </h2>

                                            <div className=' h-full  w-full flex-col items-between justify-between'>
                                                <p className='h-5/6  w-full text-sm text-gray-500 font-light '>
                                                    {el.description}
                                                </p>
                                                <div className='h-1/6 flex items-center justify-start  content-center'>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        className='h-3 w-3'
                                                        fill='none'
                                                        viewBox='0 0 24 24'
                                                        stroke='#6b7280'
                                                    >
                                                        <path
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            strokeWidth={2}
                                                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                                                        />
                                                    </svg>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteAllItems(el.id, el.quantity)
                                                        }
                                                        className='text-xs text-gray-500'
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-row h-12 shadow-inner  items-center w-full content-center justify-around   py-1 bg-secondary'>
                                        <div className='flex flex-none flex-row items-center content-center justify-center gap-4'>
                                            <button
                                                id='btn-delete'
                                                onClick={() => handleDeleteOne(el.id)}
                                                className='h-8 w-8 flex   items-center justify-center  bg-white rounded-full text-white font-bold text-xl cursor-pointer'
                                            >
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    className='h-6 w-6'
                                                    fill='none'
                                                    viewBox='0 0 24 24'
                                                    stroke='#2ec5ce'
                                                >
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        strokeWidth={2}
                                                        d='M18 12H6'
                                                    />
                                                </svg>
                                            </button>
                                            <p className='font-bolder text-white'>{el.quantity}</p>
                                            <button
                                                id='btn-add'
                                                onClick={() => handleAddButton(el.id)}
                                                disabled={el.stock === el.quantity}
                                                className={
                                                    el.stock !== el.quantity
                                                        ? `h-8 w-8 flex items-center justify-center  bg-white rounded-full  font-bold text-xl cursor-pointer`
                                                        : `h-8 w-8 flex  items-center justify-center bg-cocoMall  rounded-full text-white font-bold text-xl cursor-not-allowed`
                                                }
                                            >
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    className='h-6 w-6'
                                                    fill='none'
                                                    viewBox='0 0 24 24'
                                                    stroke='#2ec5ce'
                                                >
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        strokeWidth={2}
                                                        d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className='w-24'>
                                            <p className='text-2xl font-bold text-white'>
                                                $ {el.price * el.quantity}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    ) : (
                        <>
                            <div className='  flex flex-col gap-4 justify-center relative h-full w-full '>
                                <h2 className='text-2xl font-bold'>Your cart is empty :(</h2>
                                <p>Take a look at our stores and search for what you need!</p>
                            </div>
                            <div
                                className='shadow-lg flex items-center justify-center bg-white  border border-primary  text-primary w-40 rounded-md h-8     absolute -bottom-60         z-20
                                    xl:border-none xl:shadow-none xl:bg-secondary-light xl:h-12 xl:w-44  '
                            >
                                <Link
                                    to='/home'
                                    className=' focus:outline-none text-center text-base w-full h-full
                                        md:text-lg
                                      xl:text-primary xl:text-xl'
                                >
                                    Go to Home
                                </Link>
                            </div>
                        </>
                    )}

                    {userCart.length > 0 && (
                        <div className='w-full  py-10 flex flex-col gap-5'>
                            <div className='flex flex-col gap-5 px-2'>
                                <div className='flex flex-col  gap-1'>
                                    <h2 className='text-gray-600 font-bold text-lg'>My order</h2>
                                    <hr className='border-1 border-gray-300' />
                                </div>
                                <div className='flex justify-between items-center px-2'>
                                    <h2 className='text-gray-600 font-bold text-sm'>Total</h2>
                                    <h2 className='text-cocoMall font-bold text-2xl'>$ {total}</h2>
                                </div>
                            </div>
                            <div
                                className='shadow-lg flex items-center justify-center bg-white   border-primary  text-primary w-2/2  h-12
                                            xl:border-none xl:shadow-none xl:bg-secondary-light xl:h-12 xl:w-44  '
                            >
                                <button
                                    className=' focus:outline-none text-center text-lg font-bold w-full h-full      
                                                sm:text-xl
                                              xl:text-primary xl:text-xl'
                                    onClick={handleCheckout}
                                >
                                    Go to checkout
                                </button>
                            </div>

                            <div
                                className=' flex items-center justify-center     
                                              '
                            >
                                <Link to='/home'>
                                    <button
                                        className=' focus:outline-none text-center text-xs font-bold w-full h-full text-gray-400 
                                        sm:text-sm        
                                        
                                              xl:text-primary xl:text-xl'
                                    >
                                        Continue Shopping
                                    </button>
                                </Link>
                            </div>
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
