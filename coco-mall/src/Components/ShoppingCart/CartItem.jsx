

const CartItem = ({ data, deleteFromCart, deleteAllFromCart }) => {
    let { id, name, price, quantity } = data;


    //post a
    //http://localhost:3001/checkout/mercadopago
    /*
    let objetct = {
        title: "coco remera",
        unit_price: 100,
        quantity: 1,
    }
    */
   //back devuelve un json con la url a redireccionar
   //
  
    return (
        <div className='flex flex-col relative  justify-between bg-red-500'>
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
            <button className="border">Comprar</button>
        </div>
    );
};

//el back me manda una url y tengo que redireccionar a esa url




export default CartItem;
