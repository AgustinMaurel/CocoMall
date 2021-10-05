import React from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { ProductItem } from './ProductItem';
import { addToCart, clearCart,  deleteAllFromCart,  deleteFromCart } from '../../Redux/actions/shoppingActions';

function Cart() {
    //Voy a necesitar del estado global de redux tomar los items que el comprador
    //haya mandado.
    // ---> action que guarde en estado la lista de items
    // (seria que cuando las persona toque en el + de la card del item, eso mande la action
    // que lo guarda en el estado global)
    // esa lista de items la voy a renderizar en el carrito
    // agregar boton para pagar que lleve a mercado pago
    const shoppingCart = useSelector((state) => state.shoppingCart);
    const dispatch = useDispatch()

    let products = shoppingCart?.products;
    let cart = shoppingCart?.cart;

    return (
        <div>
            <h2 className='font-bold'>Your cart</h2>
            <h3>Productos</h3>
            <article className='p-4 m-4 shadow-md cards bg-gray-100'>
                {products?.map((product) => (
                    <ProductItem
                        key={product.id}
                        data={product}
                        addToCart={() => dispatch(addToCart(product.id))}
                    />
                ))}
            </article>
            <h3>Carrito</h3>
            <article className='p-4 m-4 shadow-md bg-gray-100'>
                <button
                    className='border bg-red-600 text-white shadow p-1'
                    onClick={() => dispatch(clearCart())}
                >
                    Clear cart
                </button>
                {cart?.map((item, index) => (
                    <CartItem
                        key={index}
                        data={item}
                        deleteFromCart={() => dispatch(deleteFromCart(item.id))}
                        deleteAllFromCart ={() => dispatch(deleteAllFromCart(item.id))}
                        
                    />
                ))}
            </article>
        </div>
    );
}

export default Cart;
