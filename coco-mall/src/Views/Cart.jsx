import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
// import { Image } from 'cloudinary-react';
import NavBar from '../Components/NavBar/NavBar';
// import { getProducts } from '../Scripts/cart';
import { useSelector } from 'react-redux';
import { set } from 'react-hook-form';
import { SHOPPING_CART } from '../Scripts/constants';

const FORM_ID = 'payment-form';

export default function Cart() {
    const user = useSelector((state) => state.auth.uid);
    const [cart, setCart] = useState();
    useEffect(() => {
        axios.post(SHOPPING_CART.GET_PRODUCTS, {idUser:user}).then(res => setCart(res.data))
    }, [user]);

    const { id } = useParams();

    <script src='https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js'></script>;
    useEffect(() => {
        if (id) {
            // con el preferenceId en mano, inyectamos el script de mercadoPago
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';

            const form = document.getElementById(FORM_ID);
            script.setAttribute('data-preference-id', id);
            form.appendChild(script);
        }
    }, [id]);
    return (
        <div>
            <NavBar />
            <div>
                {cart && 
                    cart.Items?.map(item => (
                        <div>
                            <h1>Name: {item.Product.productName}</h1>
                        </div>
                    ))
                }
                <form id={FORM_ID} method='GET' />
            </div>
        </div>
    );
}
