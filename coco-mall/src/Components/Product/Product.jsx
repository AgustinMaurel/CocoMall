// import {  getProducts } from '../../Scripts/cart';
import {  useDispatch} from 'react-redux';
// import { addItemsToCart } from '../../Redux/actions/stores';
import { addToCart } from '../../Redux/actions/shoppingActions';

export default function Product(props) {
    const dispatch = useDispatch()
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

    return (
        <div key={product.id}>
            <h3>{product.productName}</h3>
            <p>{product.description}</p>
            <li>{product.price}</li>
            <li>{product.stock}</li>
            <img src={product.cloudImage} alt={product.productName} />
            <button onClick={() => dispatch(props.addToCart(product.id))} className='border '>Add to cart</button>
        </div>
    );
}
