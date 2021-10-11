import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from "axios"

const stripeConection = loadStripe("pk_live_51Jh0hiIwqWkNczco9Zb4j1SLcCqiZBdeD9KgRJDlKBFm2FbTFE9CEcAV2BJKH4FWFxnPq0lryxwTe9sg9QtjA07I009uQLGVXM")

const CheckoutForm = () => {
    const stripe = useStripe()
    const element = useElements()

    const price = 100

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: element.getElement(CardElement),

        })




        if (!error) {
            const { id } = paymentMethod
            const { data } = await axios.post("http://localhost:3001/checkout", {
                id,
                currency: "USD",
                amount: price * 100, // se pasa el montoa pagar en centavos de la moneda con la que se esta pagando, es decir el "precio" * 100
                description: "remerita, jean, pistola, chaleco" // productos comprados
            })
            
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <h4>Price: ${price}</h4>
            <button>Comprar</button>
        </form>
    )
}

function pagos() {
    return (
        <div>
            <Elements stripe={stripeConection}>
                <CheckoutForm />
            </Elements>
        </div>
    );
}

export default pagos;