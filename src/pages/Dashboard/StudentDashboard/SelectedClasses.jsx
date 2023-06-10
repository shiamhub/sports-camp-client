import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const SelectedClasses = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { data: addCart, refetch } = useQuery({
        queryKey: ["addCart", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/addCart?email=${user?.email}`);
            return res.data;
        }
    })
    console.log(addCart);
    const total = addCart?.reduce((sum, item) => item.price + sum, 0);

    const handleDelete = (id) => {
        console.log(id);
        axiosSecure.delete(`/addCart/${id}`)
            .then(res => {
                refetch();
                console.log(res.data);
            })
    }

    return (
        <div className="w-10/12">
            <div className="flex justify-between">
                <p>Total: {total}</p>
                <Link to="/dashboard/paymentClasses" className="btn btn-primary">Pay</Link>
            </div>
            <div>
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
                                addCart?.map((a, index) => <tr key={a._id} className="text-center hover">
                                    <th>{index + 1}</th>
                                    <td>{a.className}</td>
                                    <td>{a.email}</td>
                                    <td>{a.price}</td>
                                    <td><button className="btn btn-primary btn-sm text-white">View Details</button></td>
                                    <td><button onClick={() => handleDelete(a._id)} className="btn btn-error btn-sm text-white">Delete</button></td>
                                </tr>
                                )}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
};

export default SelectedClasses;