import React from 'react';

const CartItem = ({ data, deleteFromCart, deleteAllFromCart }) => {
    let { id, name, price, quantity } = data;
  
    return (
        <div className='border-b-2 '>
            <h3>{name}</h3>
            <p className='font-semibold'>
                ${price}.00  {quantity > 1 && `x${quantity} = $${price*quantity}`}
            </p>
            <div className='flex gap-5'>
                <button onClick={() => deleteFromCart(id)}
                className='text-white  p-2 rounded bg-red-500 flex align-center items-center justify-center font-semibold'>
                    Delete One
                </button>
                <button onClick={() => deleteAllFromCart(id)}
                 className='text-white  p-2 rounded bg-red-500 flex align-center items-center justify-center font-semibold'>
                    Delete All
                </button>
            </div>
        </div>
    );
};

export default CartItem;
