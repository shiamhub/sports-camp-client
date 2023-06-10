import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const [axiosSecure] = useAxiosSecure();
    const [history, setHistory] = useState([]);
    console.log(history);

    useEffect(() => {
        axiosSecure.get("/paymentHistory")
            .then(res => {
                setHistory(res.data);
            })
    }, [axiosSecure]);
    return (
        <div className="w-10/12">
                {
                    <table className="table">
                        <thead>
                            <tr className="text-center">
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Price</th>
                                <th>Details</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                history?.map((a, index) => <tr key={a._id} className="text-center hover">
                                    <th>{index + 1}</th>
                                    <td>{a.instructorName}</td>
                                    <td>{a.instructorEmail}</td>
                                    <td>{a.price}</td>
                                    <td><button className="btn btn-primary btn-sm text-white">View Details</button></td>
                                    <td><button onClick={() => handleDelete(a._id)} className="btn btn-error btn-sm text-white">Delete</button></td>
                                </tr>
                                )}
                        </tbody>
                    </table>
                }
            </div>
    );
};

export default PaymentHistory;