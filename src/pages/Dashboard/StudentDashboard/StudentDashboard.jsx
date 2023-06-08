import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";

const StudentDashboard = () => {
    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:5000/addCart?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            .then(res => setCart(res.data))
        }

    }, [user?.email])
    return (
        <div>
            {
                cart.map(a => <div key={a._id}>{a.className}</div>)
            }
        </div>
    );
};

export default StudentDashboard;