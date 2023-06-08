import { useEffect, useState } from "react";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    console.log(users);
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
    }, [])

    const handleInstructor = (id) => {
        fetch(`http://localhost:5000/user/instructor/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })        
    }
    const handleAdmin = (id) => {
        fetch(`http://localhost:5000/user/admin/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
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
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((a, index) => <tr key={a._id} className="text-center hover">
                                <th>{index + 1}</th>
                                <td>{a.name}</td>
                                <td>{a.email}</td>
                                <td>
                                    {
                                        a.role === 'instructor' ? "Instructor" : <button onClick={() => handleInstructor(a._id)} className="btn btn-primary btn-sm mx-8">Instructor</button>
                                    }
                                    {
                                        a.role === 'admin' ? "Admin" : <button onClick={() => handleAdmin(a._id)} className="btn btn-primary btn-sm">Admin</button>
                                    }
                                </td>
                                <td><button className="btn btn-error btn-sm text-white">Delete</button></td>
                            </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;