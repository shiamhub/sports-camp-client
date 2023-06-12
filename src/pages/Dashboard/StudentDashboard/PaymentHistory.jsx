import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);

    const [axiosSecure] = useAxiosSecure();
    const [history, setHistory] = useState([]);
    console.log(history);

    useEffect(() => {
        axiosSecure.get(`/paymentsHistory?email=${user?.email}`)
            .then(res => {
                console.log(res.data);
                setHistory(res.data);

            })
    }, [axiosSecure, user?.email]);

    const handleDelete = (id) => {
        console.log(id);
    }

    return (
        <div className="w-10/12">
                {
                    <table className="table">
                        <thead>
                            <tr className="text-center">
                                <th>#</th>
                                <th>TransactionId</th>
                                {/* <th>Email</th> */}
                                <th>Price</th>
                                <th>Details</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                history?.inResult?.map((a, index) => <tr key={a._id} className="text-center hover">
                                    <th>{index + 1}</th>
                                    <td>{a.transactionId}</td>
                                    {/* <td>{a.instructorEmail}</td> */}
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