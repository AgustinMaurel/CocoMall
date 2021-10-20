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
import {
    getAuth
} from 'firebase/auth';

function OrderSuccess() {
    const auth = getAuth();
    let queries = useQueryParams();
    const dispatch = useDispatch();
    const { uid, userInfoDB, userCart } = useSelector((state) => state.auth);

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

    useEffect(() => {
        firebase
        .auth()
            auth.onAuthStateChanged((user) => {
                if (user?.uid) {
                    axios
                        .get(`/user/${user.uid}`)
                        .catch((err) => console.log(err));
                    dispatch(login(user.uid, user.displayName));
                }
            });
       
    }, [uid]);

    const userMail = userInfoDB?.Mail;

    let dataAddress = userInfoDB?.OrdersHistory?.map((el) => el)[0].address;

    queries = {
        address: dataAddress,
        payment_id: queries.payment_id,
        mail: userMail,
        items: items ? items : itemsFromLocalStorage,
        total: total ? total : itemsFromLocalStorageTotal,
        status: queries.status,
    };

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
