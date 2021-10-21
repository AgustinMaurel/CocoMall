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
import ReactModal from 'react-modal';

export default function Cart() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    let que = '+';
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
        dispatch(cartDeleteSomo(uid, id, (que = '-'), cant));
    };

    const handleAddButton = (id) => {
        dispatch(addToCartSomo(uid, id, que, cant));
    };
    const handleClearCart = (id) => {
        dispatch(clearCart(id));
        setModalIsOpen(false);
    };

    const handleDeleteAllItems = (id, cant) => {
        dispatch(deleteAllItems(uid, id, que, cant));
    };

    const modalFuncion = () => {
        setModalIsOpen(true);
    };

    return (
        <div className='bg-gray-100 h-screen '>
            <div className=' sticky bg-white shadow top-0 z-20'>
                <NavBar />
            </div>

            {/* BANNER */}
            <div className='  relative z-10 h-20 flex flex-col  items-center text-white justify-center content-center mx-auto w-full bg-cocoMall-200 overflow-hidden '>
                <h3 className='text-5xl z-10 font-extrabold text-white'>MY CART</h3>
                <div className='absolute h-36 w-36 lg:h-64 lg:w-64  rounded-full bg-primary bottom-0 right-10 z-0'></div>
                <div className='absolute h-36 w-36  lg:h-64 lg:w-64 rounded-full bg-primary top-0 left-0 z-0'></div>
                <div className='absolute md:h-10 md:w-10  rounded-full bg-primary  md:left-96 z-0'></div>
            </div>


            {!userCart.length && (
                <div className='h-3/5     px-5'>
                    <div className=' flex flex-col gap-4 items-center justify-center relative h-full w-full '>
                        <h2 className='text-2xl xl:text-6xl font-bold'>Your cart is empty.</h2>
                        <p>Take a look at our stores and search for what you need!</p>

                        <div
                            className='shadow-lg flex items-center justify-center absolute bottom-0 bg-white  border border-primary  text-primary w-40 rounded h-8 z-20 
                         xl:border-none xl:shadow-none xl:bg-secondary-light xl:h-12 xl:w-44  '
                        >
                            <Link to='/home'>
                                <button
                                    className=' focus:outline-none  text-base w-full h-full
                           flex justify-start  items-center       
                     md:text-lg
                   xl:text-primary xl:text-xl'
                                >
                                    Go to Home
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}


                {/* MAIN CONTENT */}
            <div className='flex  justify-center   bg-gray-100   2xl:px-20  '>
                
                <div className='flex flex-col  relative py-2  w-full h-full items-center align-center content-center justify-evenly rounded lg:gap-16   xl:pb-10 '>
                    
                    
                    {/* CLEAR CART BUTTON */}
                    {userCart.length > 0 && !modalIsOpen && (
                        <>
                            <div className='  flex items-center self-start  justify-center   xl:absolute xl:left-0 xl:top-0  h-8 mx-2 px-1 z-10'>
                                <button
                                    onClick={() => modalFuncion()}
                                    className='text-sm text-red-600 font-semibold z-20 whitespace-nowrap'
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </>
                    )}
                    <ReactModal
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                            },
                        }}
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        className=' flex flex-col gap-5 justify-center items-center rounded-md focus:outline-none bg-white shadow-lg p-4 absolute w-4/6 xl:w-3/6 2xl:w-2/5 h-1/4 lg:h-2/6 xl:h-1/6 top-0 bottom-0 right-0 left-0 m-auto border-2  border-red-700'
                    >
                        <div className='absolute top-2 mx-auto'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                viewBox='0 0 20 20'
                                fill='#dc2626'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </div>
                        <h2 className='text-center text-lg'>
                            Are you sure you want to{' '}
                            <span className='text-red-600 font-semibold'>delete</span> your cart?
                        </h2>
                        <div className='flex w-full justify-evenly '>
                            <button
                                className='py-1 px-3 border hover:border-red-600 hover:bg-white transition hover:text-red-600 text-white bg-red-600'
                                onClick={() => handleClearCart(uid)}
                            >
                                Yes
                            </button>
                            <button onClick={() => setModalIsOpen(false)}>No</button>
                        </div>
                    </ReactModal>

                    <div className='flex 0 xl:pb-28   md:w-4/5 flex-col gap-8 xl:flex-row xl:w-full xl:gap-10 xl:px-5'>
                        
                        <div className='xl:w-4/6 xl:flex      xl:flex-col xl:items-center xl:justify-center   '>
                            {/* CARDS */}
                            {userCart?.length > 0 &&
                                userCart?.map((el) => (
                                    <>
                                        <div
                                            key={el.id}
                                            className=' bg-white   mt-5 xl:mt-10  w-full flex flex-col shadow   h-56 xl:h-60 xl:pt-10 justify-around xl:flex-none relative  '
                                        >
                                            <div className='flex flex-row h-full items-center xl:flex-none relative w-full px-5 gap-10  py-5'>
                                                <div className=' flex  justify-self-start items-center flex-none w-1/4 h-full '>
                                                    <Image
                                                        publicId={el.cloudImage[0]}
                                                        cloudName='cocomalls'
                                                    >
                                                        <Transformation
                                                            gravity='auto'
                                                            height='180'
                                                            width='200'
                                                            crop='fill'
                                                        />
                                                    </Image>
                                                </div>
                                                <div className=' flex flex-col gap-2 flex-none  h-full  w-4/6 pr-2 '>
                                                    <div>
                                                        <h2 className='font-bold text-cocoMall-800 text-lg md:text-xl'>
                                                            {el.productName}
                                                        </h2>
                                                    </div>

                                                    <div className='relative h-full  w-full flex-col items-between justify-between'>
                                                        <div>
                                                            <p className='h-5/6 mb-3 w-full text-sm md:text-base text-gray-500 font-light '>
                                                                {el.description}
                                                            </p>
                                                            <p className='w-full text-sm md:text-sm text-gray-500 font-light '>
                                                                Stock left: {el.stock}
                                                            </p>
                                                            <p className='w-full text-sm md:text-sm text-gray-500 font-light '>
                                                                Unit price: $
                                                                {el.price
                                                                    .toString()
                                                                    .replace(
                                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                                        '.',
                                                                    )}
                                                            </p>
                                                        </div>
                                                        <div className='absolute bottom-0 h-1/6 flex items-center justify-start  content-center'>
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
                                                                    handleDeleteAllItems(
                                                                        el.id,
                                                                        el.quantity,
                                                                    )
                                                                }
                                                                className='text-xs text-gray-500  md:text-sm
                                                                   '
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
                                                        className='  flex   items-center justify-center  bg-white rounded-full text-white font-bold text-xl cursor-pointer'
                                                    >
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            className='h-6 w-6 md:h-8 md:w-8'
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
                                                    <p className='font-bolder text-white'>
                                                        {el.quantity}
                                                    </p>
                                                    <button
                                                        id='btn-add'
                                                        onClick={() => handleAddButton(el.id)}
                                                        disabled={el.stock === el.quantity}
                                                        className={
                                                            el.stock !== el.quantity
                                                                ? `h-6 w-6 md:h-8 md:w-8 flex items-center justify-center  bg-white rounded-full  font-bold text-xl cursor-pointer`
                                                                : `h-6 w-6 md:h-8 md:w-8 flex  items-center justify-center bg-cocoMall  rounded-full text-white font-bold text-xl cursor-not-allowed`
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
                                                <div className='min-w-max'>
                                                    <p className='text-2xl font-bold text-white'>
                                                        ${' '}
                                                        {(el.price * el.quantity)
                                                            .toString()
                                                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))}
                        </div>

                        {/* ORDER RESUME */}
                        {userCart.length > 0 && (
                            <div className='w-full xl:w-2/6 xl:flex-none py-10 flex flex-col gap-5'>
                               
                                <div className='flex flex-col gap-5 px-2'>
                                    <div className='flex flex-col  gap-1'>
                                       
                                        <h2 className='text-gray-600 font-bold text-lg'>
                                            My order
                                        </h2>
                                        
                                        <hr className='border-1 border-gray-300' />
                                    
                                    </div>
                                    <div className='flex justify-between items-center px-2'>
                                        <h2 className='text-gray-600 font-bold text-sm'>Total</h2>
                                        <h2 className='text-cocoMall font-bold text-2xl'>
                                            ${' '}
                                            {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                        </h2>
                                    </div>
                                </div>

                                <div
                                    className='shadow-lg flex items-center relative justify-center bg-white   border-primary  text-primary w-2/2  h-12
                                            xl:border-none xl:shadow-none xl:bg-secondary-light xl:h-12 xl:mt-10   '
                                >
                                    <Link className='w-full h-full' to='create/order'>
                                        <button
                                            className=' focus:outline-none text-center text-lg font-bold w-full h-full      
                                                sm:text-xl
                                              xl:text-primary xl:text-xl'
                                        >
                                            Continue
                                        </button>
                                    </Link>
                                </div>

                                <div
                                    className=' flex items-center justify-center     
                                              '
                                >
                                    <Link to='/home'>
                                        <button
                                            className=' focus:outline-none text-center text-xs font-bold w-full h-full text-gray-400 
                                        sm:text-sm        
                                        
                                            xl:text-md'
                                        >
                                            I want to keep shopping
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
