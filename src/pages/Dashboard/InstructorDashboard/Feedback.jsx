import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Feedback = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { data: myClasses } = useQuery({
        queryKey: ["myClasses"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/myClasses?email=${user?.email}`);
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
                            <th>Available seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Details</th>

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
                                <td><button className="btn" onClick={() => window.my_modal_3.showModal()}>open modal</button></td>
                                <dialog id="my_modal_3" className="modal">
                                    <form method="dialog" className="modal-box">
                                        <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        <h3 className="font-bold text-lg">{a?.instructorName}</h3>
                                        <p className="py-4">Press ESC key or click on ✕ button to close</p>
                                    </form>
                                </dialog>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {/* <button className="btn" onClick={() => window.my_modal_3.showModal()}>open modal</button> */}

        </div>
    );
};

export default Feedback;