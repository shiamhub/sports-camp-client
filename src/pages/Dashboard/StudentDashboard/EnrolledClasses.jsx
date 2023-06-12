import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";

const EnrolledClasses = () => {
    const { user } = useContext(AuthContext);
    const [enroll, setEnroll] = useState([]);

    const [axiosSecure] = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/paymentsHistory?email=${user?.email}`)
            .then(res => {
                console.log(res.data);
                setEnroll(res.data);

            })
    }, [axiosSecure, user?.email]);
    return (
        <div className="w-10/12">
                {
                    <table className="table">
                        <thead>
                            <tr className="text-center">
                                <th>#</th>
                                <th>Class Name</th>
                                <th>Email</th>
                                <th>Price</th>
                                <th>Details</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                enroll?.result?.map((a, index) => <tr key={a._id} className="text-center hover">
                                    <th>{index + 1}</th>
                                    <th>{a.className}</th>
                                    <td>{a.instructorEmail}</td>
                                    <td>{a.price}</td>
                                    <td><button className="btn btn-primary btn-sm text-white">View Details</button></td>
                                    <td><button className="btn btn-error btn-sm text-white">Delete</button></td>
                                </tr>
                                )}
                        </tbody>
                    </table>
                }
            </div>
    );
};

export default EnrolledClasses;