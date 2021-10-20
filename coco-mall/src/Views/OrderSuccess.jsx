import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userInfo, login } from '../Redux/actions/auth';
import { clearCart } from '../Redux/actions/shoppingActions';
import { useQueryParams } from '../Scripts/useQueryParams';
import { Link } from 'react-router-dom';
import NavBar from '../Components/NavBar/NavBar';
import axios from 'axios';
import { auth } from '../firebase/firebaseConfig';
import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';

function OrderSuccess() {
    const auth = getAuth();
    let queries = useQueryParams();
    const dispatch = useDispatch();

    const { uid, userInfoDB, userCart } = useSelector((state) => state.auth);

    const [userData, setUserData] = useState({
        address: '',
        payment_id: undefined,
        mail: '',
        items: [],
        total: 0,
        status: '',
    });

    useEffect(() => {
        if (
            userData.address !== undefined &&
            userData.payment_id !== undefined &&
            userData.mail !== undefined &&
            userData.items !== undefined &&
            userData.total !== undefined &&
            userData.status !== undefined
        ) {
            axios.post('http://localhost:3001/checkout/feedback', userData);
        }
    }, [userData]);

    const items = userCart.map((el) => el.productName).join(', ');
    // const itemsFromLocalStorage = userInfoDB

    const total =
        userCart.length > 0 &&
        Object.values(userCart).reduce((previous, key) => previous + key.price * key.quantity, 0);

    const itemsFromLocalStorageTotal =
        userInfoDB?.Cart?.length &&
        Object.values(userInfoDB?.Cart).reduce(
            (previous, key) => previous + key.price * key.quantity,
            0,
        );

    const userMail = userInfoDB?.Mail;

    let dataAddress = userInfoDB?.OrdersHistory?.map((el) => el)[0].address;

    useEffect(() => {
        firebase.auth();
        auth.onAuthStateChanged((user) => {
            if (user?.uid) {
                axios
                    .get(`/user/${user.uid}`)
                    .then((res) => {
                        dispatch(login(user.uid, user.displayName));
                        dispatch(userInfo(uid));
                        setUserData({
                            address: res.data.Addresses[0].directions,
                            payment_id: queries.payment_id,
                            mail: res.data.Mail,
                            items: res.data.Cart?.map((el) => el.productName).join(', '),
                            total:
                                res.data.Cart &&
                                Object.values(res.data.Cart).reduce(
                                    (previous, key) => previous + key.price * key.quantity,
                                    0,
                                ),
                            status: queries.status,
                        });
                    })
                    .catch((err) => console.log(err));
            }
        });
    }, [uid]);

    console.log(userData, 'user data');

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
