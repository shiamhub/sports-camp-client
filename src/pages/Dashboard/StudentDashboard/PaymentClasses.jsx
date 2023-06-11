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
    // const [axiosSecure] = useAxiosSecure();
    // const { data: addCart } = useQuery({
    //     queryKey: ["addCart", id],
    //     enabled: !loading,
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/addCart?email=${user?.email}`);
    //         return res.data;
    //     }
    // })
    // console.log(addCart.price);
    // const total = addCart.price;
    // console.log(total);
    
    // const total = addCart?.reduce((sum, item) => item.price + sum, 0);
    // const price = parseFloat(total.toFixed(2));
    // console.log(price);

    return (
        <div className="w-full">
            <Elements stripe={stripePromise}>
                <PaymentSystem price={addCart?.price} addCart={addCart}></PaymentSystem>
            </Elements>
        </div>
    );
};

export default PaymentClasses;