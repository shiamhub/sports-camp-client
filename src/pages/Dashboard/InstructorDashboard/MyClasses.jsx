import { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const MyClasses = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const {data: myClasses} = useQuery({
        queryKey: ["myClasses"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/myClasses?email=${user?.email}`);
            return res.data;
        }
    })

    console.log(myClasses);
    return (
        <div className="w-full">
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            <th>#</th>
                            <th>Images</th>
                            <th>Class Name</th>
                            <th>Instructors Name</th>
                            <th>Email</th>
                            <th>Available seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            {/* <th>Details</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myClasses?.map((a, index) => <tr key={a._id} className="text-center hover">
                                <th>{index + 1}</th>
                                <th>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={a?.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </th>
                                <td>{a?.className}</td>
                                <td>{a?.instructorName}</td>
                                <td>{a?.instructorEmail}</td>
                                <td>{a?.availableSeats}</td>
                                <td>{a?.price}</td>
                                <td>{a?.status}</td>
                                {/* <td>
                                    <div>
                                        <button onClick={() => handleApproved(a._id)} className="btn btn-success btn-sm text-white mr-5">Approved</button>
                                        <button onClick={() => handleDenied(a._id)} className="btn btn-error btn-sm text-white">Denied</button>
                                    </div>
                                </td> */}
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyClasses;