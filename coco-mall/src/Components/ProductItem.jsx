export const ProductItem = ({ data, addToCart }) => {
    let { id, name, price } = data;
    return (
       
            <div className='border-2 border-primary w-32  h-32 flex flex-col items-center justify-center content-center'>
                <h4 className='text-lg font-bold'>{name}</h4>
                <h5>${price}.00</h5>
                <button class='border ' onClick={() => addToCart(id)}>
                    Add to cart
                </button>
            
        </div>
    );
};
