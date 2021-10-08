import React, { useEffect } from 'react';
import { useParams } from 'react-router';

const FORM_ID = 'payment-form';

export default function Cart() {
    const { id } = useParams();

   
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
           <form id={FORM_ID} method='GET' />
        </div>
    );
}
