import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userInfo } from '../Redux/actions/auth';
import { clearCart } from '../Redux/actions/shoppingActions';
import { useQueryParams } from '../Scripts/useQueryParams';
import { Link } from 'react-router-dom';
import NavBar from '../Components/NavBar/NavBar';
import axios from 'axios';
import { auth } from '../firebase/firebaseConfig';

function OrderSuccess() {
    console.log(auth.currentUser, 'auth');
    let queries = useQueryParams();
    const dispatch = useDispatch();
    const { uid, userInfoDB, userCart } = useSelector((state) => state.auth);

    const [userId, setUserId] = useState();

    const items = userCart.map((el) => el.productName).join(', ');
    const itemsFromLocalStorage = userInfoDB?.Cart?.map((el) => el.productName).join(', ');

    const total =
        userCart.length > 0 &&
        Object.values(userCart).reduce((previous, key) => previous + key.price * key.quantity, 0);

    const itemsFromLocalStorageTotal =
        userInfoDB?.Cart?.length &&
        Object.values(userInfoDB?.Cart).reduce(
            (previous, key) => previous + key.price * key.quantity,
            0,
        );

    console.log('total', itemsFromLocalStorageTotal);
    React.useEffect(() => {
        const data = localStorage.getItem('uid');
        if (data) {
            setUserId(JSON.parse(data));
        }
    }, []);

    const userMail = userInfoDB?.Mail;

    let dataAddress = userInfoDB?.OrdersHistory?.map((el) => el)[0].address;

    queries = {
        address: dataAddress,
        payment_id: queries.payment_id,
        mail: 'matutin97@live.com.ar',
        items: items ? items : itemsFromLocalStorage,
        total: total ? total : itemsFromLocalStorageTotal,
        status: queries.status,
    };
    console.log(queries);

    useEffect(() => {
        if (uid) {
            dispatch(userInfo(uid));
        } else {
            dispatch(userInfo(userId));
        }

        return () => {
            dispatch(clearCart(uid));
        };
    }, [userId, uid]);

    if (
        queries.payment_id !== undefined &&
        queries.address !== undefined &&
        queries.total !== undefined &&
        queries.mail !== undefined &&
        queries.items !== undefined &&
        queries.status !== undefined
    ) {
        axios.post('http://localhost:3001/checkout/feedback', queries);
    }

    return (
        //HACER UN SET TIMEOUT QUE REDIRIJA A HOME ASI SE DESMONTA EL COMPONENTE
        <div>
            <NavBar />
            <div>
                Su compra fue realizada con exito, toda la información fue enviada a su casilla de
                correo.{' '}
            </div>
            <div>
                <Link to='/home'>
                    <button>Go back to home</button>
                </Link>
            </div>
        </div>
    );
}

export default OrderSuccess;
