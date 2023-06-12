import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Feedback = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [done, setDone] = useState("");

    const { data: myClasses } = useQuery({
        queryKey: ["myClasses"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/myClasses?email=${user?.email}`);
            return res.data;
        }

    })
    const handleModal = (a) => {
        setDone(a.feedBack);
        window.my_modal_3.showModal()
    }

    return (
        <div className="w-full">
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            <th>Class Name</th>
                            <th>Status</th>
                            <th className="text-start">FeedBack</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            myClasses?.map((a) => a.feedBack && <tr key={a._id} className="text-center hover">
                                <td>{a?.className}</td>
                                <td>{a?.status}</td>
                                <td className="text-start text-lg cursor-pointer text-blue-700 hover:underline"><a onClick={() => handleModal(a)}>{a?.feedBack.slice(0, 70)}...</a></td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {/* <button className="btn" onClick={() => window.my_modal_3.showModal()}>open modal</button> */}
            <dialog id="my_modal_3" className="modal">
                <form method="dialog" className="modal-box">
                    <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <p>{done}</p>
                </form>
            </dialog>

        </div>
    );
};

export default Feedback;