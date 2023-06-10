

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";

const PaymentSystem = ({price, addCart}) => {

    const { user } = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [axiosSecure] = useAxiosSecure();
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        if(price) {
            axiosSecure.post("/create-payment-intent", {price})
            .then((res) => {
                setClientSecret(res.data.clientSecret);
            })
        }
    }, [price, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        console.log(card)
        
        const { error } = await stripe.createPaymentMethod({
            type: "card",
            card
        })

        if (error) {
            console.log(error);
            setError(error.message);
        }
        else {
            setError('');
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'Guest',
                        name: user?.displayName || 'Guest',
                    },
                },
            },
        );

        if(confirmError) {
            console.log(confirmError);
        }
        console.log(paymentIntent);

        setProcessing(false);

        if(paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                quantity: addCart.length,
                status: 'Processing',
                cartItems: addCart.map(cart => cart._id),
                addCartItems: addCart.map(cart => cart.cartId),
                // itemNames: addCart.map(cart => cart.payments),
            }
            axiosSecure.post("/payments", payment)
            .then((res) => {
                console.log(res.data);
                if(res.data.insertedId) {
                    console.log(res.data.insertedId)
                }
            })
        }
    }

    return (
        <div>
            <form className="w-2/3 m-8" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary btn-sm mt-4" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {error && <p className="text-red-400">{error}</p>}
            {transactionId && <p className="text-red-400">{transactionId}</p>}
        </div>
    )
};

export default PaymentSystem;