import React from 'react';
import axios from 'axios';
import NavBar from '../Components/NavBar/NavBar';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteAllFromCart, deleteFromCart } from '../Redux/actions/shoppingActions';

export default function Cart() {
    const history = useHistory();
    const dispatch = useDispatch();

    const products = useSelector((state) => state.auth.userCart);

    let total =
        products.length > 0 &&
        Object.values(products).reduce((previous, key) => previous + key.price * key.quantity, 0);

    let objectToCheckout = {
        title: 'Cart Products',
        total: total,
        quantity: 1,
    };

    console.log(products);

    function handleCheckout() {
        return products.length > 0
            ? axios
                  .post('http://localhost:3001/checkout/mercadopago', objectToCheckout)
                  .then((order) => {
                      history.push(`/checkout/${order.data.response}`);
                  })
                  .catch((err) => console.log(err))
            : false;
    }

    return (
        <div className='h-screen'>
            <NavBar />
            <div className='flex flex-col justify-center relative h-full  bg-red-200'>
                <div className='flex flex-col items-center align-center justify-between bg-green-200 h-3/4'>
                    {products.length > 0 ? (
                        products.map((el) => (
                            <div key={el.id} className='bg-yellow-300 w-96 relative'>
                                <h2>{el.productName}</h2>
                                <h2>Price: {el.quantity * el.price}</h2>
                                <h2>Quantity : {el.quantity}</h2>
                                <button
                                    onClick={() => dispatch(deleteFromCart(el.id))}
                                    className='my-1 bg-red-200  rounded text-white p-2 mx-2 cursor-pointer'
                                >
                                    Delete one
                                </button>
                                <button
                                    onClick={() => dispatch(deleteAllFromCart(el.id))}
                                    className='my-1 bg-red-200  rounded text-white p-2 mx-2 cursor-pointer'
                                >
                                    Delete all
                                </button>
                            </div>
                        ))
                    ) : (
                        <div>No tiene elementos en su carrito</div>
                    )}

                    {products.length > 0 && (
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
