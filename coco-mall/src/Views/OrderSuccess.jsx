import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userInfo } from '../Redux/actions/auth';
import { clearCart } from '../Redux/actions/shoppingActions';
import { useQueryParams } from '../Scripts/useQueryParams';
import { Link } from 'react-router-dom';

function OrderSuccess() {
    let queries = useQueryParams();
    const dispatch = useDispatch();
    const { uid, userInfoDB, userCart } = useSelector((state) => state.auth);

    const items = userCart.map((el) => el.productName).join(', ');
    const total =
        userCart.length > 0 &&
        Object.values(userCart).reduce((previous, key) => previous + key.price * key.quantity, 0);

    // console.log(adress, 'adress');

    useEffect(() => {
        dispatch(userInfo(uid));
        return () => {
            dispatch(clearCart(uid));
        };
    }, [uid]);

    const userMail = userInfoDB.Mail;

    queries = {
        // adress: adress,
        payment_id: queries.payment_id,
        mail: userMail,
        items: items,
        total: total,
    };

    console.log(queries);

    return (
        //HACER UN SET TIMEOUT QUE REDIRIJA A HOME ASI SE DESMONTA EL COMPONENTE
        <div>
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
