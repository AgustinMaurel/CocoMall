import React, { useReducer } from 'react';
import NavBar from '../Components/NavBar/NavBar';
import { ProductItem } from '../Components/ShoppingCart/ProductItem';
import { shoppingReducer, shoppingInitialState } from '../Redux/reducers/shoppingReducer';

function Cart() {
    //Voy a necesitar del estado global de redux tomar los items que el comprador
    //haya mandado.
    // ---> action que guarde en estado la lista de items
    // (seria que cuando las persona toque en el + de la card del item, eso mande la action
    // que lo guarda en el estado global)
    // esa lista de items la voy a renderizar en el carrito
    // agregar boton para pagar que lleve a mercado pago
    const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
    const { products, cart } = state;

    const addToCart = (id) => {
        console.log(id);
    };
    const deleteFromCart = () => {};
    const clearCart = () => {};

    return (
        <div>
            <div className='shadow'>
                <NavBar />
            </div>
            <h2>Carrito de Compras</h2>
            <h3>Productos</h3>
            <article className='p-4 m-4 shadow-lg cards'>
                {products?.map((product) => (
                    <ProductItem key={product.id} data={product} addToCart={addToCart} />
                ))}
            </article>
            <h3>Carrito</h3>
            <article className='p-4 m-4 shadow-md'></article>
            <button onClick={clearCart}>Clean cart</button>
        </div>
    );
}

export default Cart;
