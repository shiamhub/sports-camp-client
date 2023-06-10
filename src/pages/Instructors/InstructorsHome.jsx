import { useEffect, useState } from "react";

const InstructorsHome = () => {
    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/class")
            .then(res => res.json())
            .then(data => setInstructors(data))
    }, [])
    return (
        <div>
            <div className="grid grid-cols-4 gap-4 my-8">
                {
                    instructors.map(a => <div key={a._id} className="bg-base-100 shadow-xl">
                        <figure><img src={a.instructorImage} alt="Movie" /></figure>
                        <h1>{a.instructorName}</h1>
                        <p></p>
                    </div>)
                }
            </div>
        </div>
    );
};

export default InstructorsHome;