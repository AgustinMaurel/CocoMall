import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { SHOPPING_CART } from '../../Scripts/constants';
import { addToCart } from '../../Redux/actions/shoppingActions';

export default function Product(props) {
    const dispatch = useDispatch();
    const { product } = props;
    // const user = useSelector((state) => state.auth.uid);

    // let productToCart = {
    //     idUser: user,
    //     idProduct: product.id,
    //     quantity: 1,
    // };

    // let userId = {
    //     idUser: user
    // }

    // const handleClick = () => {
    //     addToCart(productToCart);
    //     dispatch(addItemsToCart(productToCart.quantity))
    //     getProducts(userId)
    //     console.log(productToCart)
    // };

    const { userCart, uid } = useSelector((state) => state.auth);

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


    const handleButtonClick = () => {
        dispatch(addToCart(product.id));
    };

    useEffect(() => {
        axios.post(SHOPPING_CART.ADD_TO_CART, userCartToBack);
    }, [userCartToBack]);

    return (
        <div className='w-48 h-96 bg-gray-400 shadow-lg m-4 rounded-md' key={product.id}>
            <div className='border w-full h-2/3 flex'>
                <img
                    className='w-2/3 object-contain flex'
                    src={product.cloudImage}
                    alt={product.productName}
                />
                <div className='w-1/3 h-full flex flex-col'>
                    <img
                        className='h-1/3 object-contain mx-2 my-4'
                        src={product.cloudImage}
                        alt={product.productName}
                    />
                    <img
                        className='h-1/3 object-contain mx-2 my-4'
                        src={product.cloudImage}
                        alt={product.productName}
                    />
                </div>
            </div>
            <div className='border w-full h-1/3 flex flex-col'>
                <h3>{product.productName}</h3>
                <p className='text-xs'>{product.description}</p>
                <li>{product.price}</li>
                <li>{product.stock}</li>
                <button onClick={handleButtonClick} className='border '>
                    Add to cart
                </button>
            </div>
        </div>
    );
}
