import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { useContext, useState } from "react";

const ManageClasses = () => {
    const { loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [text, setText] = useState("");
    const [denied, setDenied] = useState({});

    const { data: classes, refetch } = useQuery({
        queryKey: ["newClasses"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get("/newClasses");
            return res.data;
        }
    })

    const handleApproved = (id) => {
        console.log(id);
        axiosSecure.get(`/newClasses/${id}`)
            .then(res => {
                const newData = res.data;
                console.log(res.data)
                const { image, instructorName, instructorImage, instructorEmail, price, className, availableSeats } = newData;
                const newClasses = {
                    image,
                    instructorName,
                    instructorImage,
                    instructorEmail,
                    price,
                    className,
                    availableSeats,
                    nid: id,
                }

                axiosSecure.patch(`/newClasses/approved/${id}`)
                    .then(res => {
                        console.log(res.data);
                        console.log(newClasses)
                        axiosSecure.post('/classes/approved', newClasses)
                            .then(res => {
                                refetch();
                                console.log(res.data);
                            })
                    })

            })

    }
    // const handleDenied = (id) => {
    //     console.log(id);
    //     axiosSecure.patch(`/newClasses/denied/${id}`)
    //         .then(res => {
    //             console.log(res.data);
    //             axiosSecure.delete(`/newClasses/denied/${id}`)
    //                 .then(res => {
    //                     refetch();
    //                     console.log(res.data);
    //                 })
    //         })

    // }
    const handleDeniedFe = (id) => {
        setDenied(id)
        window.my_modal_3.showModal()
    }

    const handleFeed = () => {
        const { image, instructorName, instructorImage, instructorEmail, price, className, availableSeats } = denied;
        const newDenied = {
            image,
            instructorName,
            instructorImage,
            instructorEmail,
            price,
            className,
            availableSeats,
            feedBack: text,
            status: "denied"            
        }
        axiosSecure.put(`/newClasses/denied/${denied._id}`, newDenied)
            .then(res => {
                console.log(res.data);
                axiosSecure.delete(`/newClasses/denied/${denied._id}`)
                    .then(res => {
                        refetch();
                        console.log(res.data);
                    })
            })
    }


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
                            classes?.map((a, index) => <tr key={a._id} className="text-center hover">
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
                                <td>
                                    <div>
                                        <button onClick={() => handleApproved(a._id)} className="btn btn-success btn-sm text-white mr-5">Approved</button>
                                        <button onClick={() => handleDeniedFe(a)} className="btn btn-error btn-sm text-white">Denied</button>
                                        {/* <button onClick={() => handleDenied(a._id)} className="btn btn-error btn-sm text-white">Denied</button> */}
                                        {/* <button  className="btn btn-error btn-sm text-white" onClick={() => {
                                            window.my_modal_3.showModal(),
                                            () => handleDenied(a._id)
                                        }}>Denied</button> */}
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {/* <button className="btn" onClick={()=>window.my_modal_3.showModal()}>open modal</button> */}
            <dialog id="my_modal_3" className="modal">
                <form method="dialog" className="modal-box">
                    <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <textarea onChange={(e) => setText(e.target.value)} className="textarea textarea-primary w-full" placeholder="Bio"></textarea>
                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={() => handleFeed()} className="btn">Done</button>
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default ManageClasses;