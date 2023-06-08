import { useContext, useEffect } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";

const StudentDashboard = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:5000/addCart?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            .then(res => console.log(res.data))
        }

    }, [user?.email])
    return (
        <div>
            <h1>Student Dashboard</h1>
        </div>
    );
};

export default StudentDashboard;