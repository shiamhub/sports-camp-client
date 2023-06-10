import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentSystem from "./PaymentSystem";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentClasses = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { data: addCart } = useQuery({
        queryKey: ["addCart", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/addCart?email=${user?.email}`);
            return res.data;
        }
    })
    
    const total = addCart?.reduce((sum, item) => item.price + sum, 0);

    // const price = parseFloat(total.toFixed(2));
    // console.log(price);

    return (
        <div className="w-full">
            <Elements stripe={stripePromise}>
                <PaymentSystem price={total} addCart={addCart}></PaymentSystem>
            </Elements>
        </div>
    );
};

export default PaymentClasses;