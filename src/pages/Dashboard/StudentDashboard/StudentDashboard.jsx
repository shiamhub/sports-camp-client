import { useEffect } from "react";

const StudentDashboard = () => {
    useEffect(() => {
        fetch('http://localhost:5000/addCart')
            .then(res => res.json())
            .then(data => console.log(data))
    }, [])
    return (
        <div>
            <h1>Student Dashboard</h1>
        </div>
    );
};

export default StudentDashboard;