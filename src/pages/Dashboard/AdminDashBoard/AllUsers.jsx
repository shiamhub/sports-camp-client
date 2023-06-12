import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../providers/AuthProvider";
import { useContext } from "react";
// import { AddContext } from "../InstructorDashboard/AddClass";

const AllUsers = () => {
    
    const [axiosSecure] = useAxiosSecure();
    const token = localStorage.getItem("access-token");
    const { user } = useContext(AuthContext);

    const { data: users, refetch } = useQuery({
        queryKey: ["users"],
        enabled: !!token && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        }
    })

    const handleInstructor = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Instructor it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://assignment-12-server-shiamhub.vercel.app/user/instructor/${id}`, {
                    method: 'PATCH'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount) {
                            refetch();
                            Swal.fire(
                                'Instructor!',
                                'Your Are Instructor.',
                                'success'
                            )
                        }
                    })

            }
        })

    }
    const handleAdmin = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://assignment-12-server-shiamhub.vercel.app/user/admin/${id}`, {
                    method: 'PATCH'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })

    }
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/userDelete/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })
    }

    return (
        <div className="w-full">
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Set Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((a, index) => <tr key={a._id} className="text-center hover">
                                <th>{index + 1}</th>
                                <td>{a.name}</td>
                                <td>{a.email}</td>
                                <td>{a.role}</td>
                                <td>
                                    {
                                        a.role === 'instructor' ? <span className="mx-8">Instructor</span> : <button onClick={() => handleInstructor(a._id)} className="btn btn-primary btn-sm mx-8">Instructor</button>
                                    }
                                    {
                                        a.role === 'admin' ? "Admin" : <button onClick={() => handleAdmin(a._id)} className="btn btn-primary btn-sm">Admin</button>
                                    }
                                </td>
                                <td><button onClick={() => handleDelete(a._id)} className="btn btn-error btn-sm text-white">Delete</button></td>
                            </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;