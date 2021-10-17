import React, { useEffect, useMemo } from 'react';
import axios from 'axios';
import NavBar from '../Components/NavBar/NavBar';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { deleteAllFromCart, deleteFromCart } from '../Redux/actions/shoppingActions';
import { SHOPPING_CART } from '../Scripts/constants';
import { Link } from 'react-router-dom'

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
    const handleDeleteAll = (id) => {
        dispatch(deleteAllFromCart(id));
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
        <div className='h-screen'>
            <NavBar />
            <div className='flex flex-col justify-center relative h-full  '>
                <div className='flex flex-col items-center align-center justify-between bg-green-200 h-3/4'>
                    {userCart.length > 0 ? (
                        userCart.map((el) => (
                            <div key={el.id} className='bg-yellow-300 w-96 relative'>
                                <h2>{el.productName}</h2>
                                <h2>Price: {el.quantity * el.price}</h2>
                                <h2>Quantity : {el.quantity}</h2>
                                <button
                                    onClick={() => handleDeleteOne(el.id)}
                                    className='my-1 bg-red-200  rounded text-white p-2 mx-2 cursor-pointer'
                                >
                                    Delete one
                                </button>
                                <button
                                    onClick={() => handleDeleteAll(el.id)}
                                    className='my-1 bg-red-200  rounded text-white p-2 mx-2 cursor-pointer'
                                >
                                    Delete all
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
        </div>
    );
}
