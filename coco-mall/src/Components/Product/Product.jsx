import { addToCart, getProducts } from '../../Scripts/cart';
import { useSelector } from 'react-redux';

export default function Product(props) {
    // const dispatch = useDispatch()
    const { product } = props;
    const user = useSelector((state) => state.auth.uid);

    
    let productToCart = {
        idUser: user,
        idProduct: product.id,
        quantity: 1,
    };

    let userId = {
        idUser: user
    }
   
    const handleClick = () => {
        addToCart(productToCart);
        getProducts(userId)
        console.log(productToCart)
    };

    return (
        <div key={product.id}>
            <h3>{product.productName}</h3>
            <p>{product.description}</p>
            <li>{product.price}</li>
            <li>{product.stock}</li>
            <img src={product.cloudImage} alt={product.productName} />
            <button onClick={handleClick} className='border '>Add to cart</button>
        </div>
    );
}
