import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { useContext } from "react";

const ManageClasses = () => {
    const {add, loading} = useContext(AuthContext);
    console.log(add)
    const [axiosSecure] = useAxiosSecure();

    const { data: classes } = useQuery({
        queryKey: ["classes"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get("/classes");
            return res.data;
        }
    })
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
                            <th>Student</th>
                            <th>Available seats</th>
                            <th>Price</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes?.map((a, index) => <tr key={a._id} className="text-center hover">
                                <th>{index + 1}</th>
                                <th>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={a?.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </th>
                                <td>{a.class}</td>
                                <td>{a.insName}</td>
                                <td>{a?.email}</td>
                                <td>{a?.students}</td>
                                <td>{a?.set}</td>
                                <td>{a?.price}</td>
                                <td><button className="btn btn-error btn-sm text-white">Delete</button></td>
                            </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClasses;