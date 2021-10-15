import React, { useEffect, useMemo } from 'react';
import axios from 'axios';
import NavBar from '../Components/NavBar/NavBar';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { addToCart, clearCart, deleteAllFromCart, deleteFromCart } from '../Redux/actions/shoppingActions';
import { SHOPPING_CART } from '../Scripts/constants';
import { Image } from 'cloudinary-react'

export default function Cart() {
    const history = useHistory();
    const dispatch = useDispatch();

    const { userCart, uid } = useSelector((state) => state.auth);

    let total =
        userCart.length > 0 &&
        Object.values(userCart).reduce((previous, key) => previous + key.price * key.quantity, 0);

    let objectToCheckout = {
        title: 'Cart Products',
        total: total,
        quantity: 1,
    };

    let userCartToBack = useMemo(() => {
        return {
            userId: uid,
            cart: userCart?.map((item) => {
                return {
                    idProduct: item.id,
                    quantity: item.quantity,
                };
            }),
        };
    }, [userCart, uid]);

    const handleDeleteOne = (id) => {
        dispatch(deleteFromCart(id));
    };
    const handleAddButton = (id) => {
        dispatch(addToCart(id));
    };
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    useEffect(() => {
        return axios.post(SHOPPING_CART.ADD_TO_CART, userCartToBack);
    }, [userCartToBack]);

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
        <div className='' >
            <div className=' sticky bg-white shadow top-0 z-20'>
                <NavBar />
            </div>

            <div className='flex  justify-center relative   py-4 px-1 '>
            
                <div className='flex flex-col relative py-5 px-2  w-full h-full items-center align-center content-center justify-around rounded  gap-5  '>
                <div className='shadow-lg flex items-center self-start justify-center bg-white  border border-red-600  text-primary  rounded h-8 px-1'>
                            <button onClick={handleClearCart} className='text-xs text-red-600 font-semibold'>Clear Cart</button>
                        </div>
                    <div className='bg-white  border border-gray-200 rounded w-full flex flex-col shadow-lg py-5 h-36 justify-around  relative gap-2'>


                        <div className='flex flex-row gap-5 justify-around relative w-full px-5'>
                            <div className='justify-self-start self-start shadow '>
                                <Image
                                    publicId="Products/xbrogn9dkucn4dptof5j"
                                    width='100'
                                    className='object-cover flex-none'
                                    cloudName='cocomalls'
                                />

                            </div>
                            <div className='flex flex-col flex-none flex-no-wrap'>
                                <h2 className='font-bold text-sm'>Skyrim: The elder Scrolls V</h2>
                                <p className='text-xs'>Price: 1500</p>
                                <p className='text-xs'>Stock: 15</p>
                            </div>
                        </div>

                        <div className='flex flex-row items-center w-full content-center justify-center gap-5'>
                            <button
                                onClick={handleDeleteOne}
                                className='h-7 w-7 flex   items-start justify-center bg-secondary  rounded-full text-white font-bold text-lg cursor-pointer'>
                                -
                            </button>
                            <p className='font-bolder'>10</p>

                            <button
                                onClick={handleAddButton}
                                className='h-7 w-7 flex  items-start justify-center bg-secondary  rounded-full text-white font-bold text-lg cursor-pointer'>
                                +
                            </button>
                        </div>
                    </div>
                    <div className='border border-gray-100 w-full'></div>




                    {/* {userCart.length > 0 ? (
                        userCart.map((el) => (
                            <div key={el.id} className='bg-yellow-300  relative'>
                                <h2>{el.productName}</h2>
                                <h2>Price: {el.quantity * el.price}</h2>
                                <h2>Quantity : {el.quantity}</h2>
                                <button
                                    onClick={() => handleDeleteOne(el.id)}
                                    className='my-1 bg-secondary  rounded text-white p-2 mx-2 cursor-pointer'
                                >
                                    -
                                </button>
                                <button
                                    onClick={() => handleAddButton(el.id)}
                                    className='my-1 bg-secondary  rounded text-white p-2 mx-2 cursor-pointer'
                                >
                                    +
                                </button>
                            </div>
                        ))
                    ) : (
                        <>  
                        <div>Your cart is empty.</div>
                        <div>Take a look at our stores and search for what you need!</div>
                        <div
                            className='shadow-lg flex items-center justify-center bg-white  border border-primary  text-primary w-40 rounded-md h-8             
                                    xl:border-none xl:shadow-none xl:bg-secondary-light xl:h-12 xl:w-44  '
                        >
                            <Link to='/home'
                                className=' focus:outline-none text-center text-base
                                        md:text-lg
                                      xl:text-primary xl:text-xl'
                                
                            >
                                Go to Home
                            </Link>
                        </div>
                        </> )}*/}

                    {/* {userCart.length > 0 && ( */}

                    {/* )} */}
                    {/* <div className='flex w-full justify-between items-center align-middle'> */}
                        
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
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
