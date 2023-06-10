import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const [axiosSecure] = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get("/paymentHistory")
            .then(res => {
                console.log(res.data);
            })
    }, [axiosSecure]);
    return (
        <div>
            <h1>Payment History</h1>
        </div>
    );
};

export default PaymentHistory;