import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentSystem from "./PaymentSystem";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentClasses = () => {
    const { id , loading } = useContext(AuthContext);

    const [axiosSecure] = useAxiosSecure();
    const { data: addCart } = useQuery({
        queryKey: ["addCart", id],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/addCart/${id}`);
            return res.data;
        }
    })

    return (
        <div className="w-full">
            <Elements stripe={stripePromise}>
                <PaymentSystem price={addCart?.price} addCart={addCart}></PaymentSystem>
            </Elements>
        </div>
    );
};

export default PaymentClasses;