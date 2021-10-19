import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userInfo } from '../Redux/actions/auth';
import { useQueryParams } from '../Scripts/useQueryParams';

function OrderSuccess() {
    let queries = useQueryParams();
    const dispatch = useDispatch();
    const { uid, userInfoDB } = useSelector((state) => state.auth);

    console.log(uid, 'uid');

    useEffect(() => {
        dispatch(userInfo(uid));
    }, [uid]);

    const userMail = userInfoDB.Mail;

    queries = { ...queries, mail: userMail };

    console.log(queries);

    return (
        <div>
            Su compra fue realizada con exito, toda la información fue enviada a su casilla de
            correo.{' '}
        </div>
    );
}

export default OrderSuccess;
