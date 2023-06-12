import { useEffect, useState } from "react";

const InstructorsHome = () => {
    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
        fetch("https://assignment-12-server-shiamhub.vercel.app/class")
            .then(res => res.json())
            .then(data => setInstructors(data))
    }, [])
    return (
        <div className="w-10/12 mx-auto">
            <div className="grid grid-cols-3 gap-4 my-8">
                {
                    instructors.map(a => <div key={a._id} className="bg-base-100 shadow-xl rounded-xl">
                        <figure><img className="rounded-xl" src={a.instructorImage} alt="Movie" /></figure>
                        <div className="card-body">
                        <h1>Instructor Name: {a.instructorName}</h1>
                        <p>Instructor Email: {a.instructorEmail}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default InstructorsHome;