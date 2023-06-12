import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import Modal from "../../../components/Modal";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [history, setHistory] = useState([]);
    const [modal, setModal] = useState({});

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
    const handleModal = (id) => {
        const inResultId = history?.inResult?.find((a) => a._id === id);
        const cartItems = inResultId.addCartItems

        const resultId = history?.result?.find((a) => a._id === cartItems);

        setModal(resultId)
        window.my_modal_4.showModal()
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
                            <th>Date</th>
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
                                <td>{a.date}</td>
                                <td><button onClick={() => handleModal(a._id)} className="btn btn-primary btn-sm text-white">View Details</button></td>
                                <td><button onClick={() => handleDelete(a._id)} className="btn btn-error btn-sm text-white">Delete</button></td>
                            </tr>
                            )}
                    </tbody>
                </table>
            }
            <Modal history={modal}></Modal>
        </div>
    );
};

export default PaymentHistory;