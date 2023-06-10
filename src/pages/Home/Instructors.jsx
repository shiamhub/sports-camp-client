import { useEffect, useState } from "react";

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/class")
            .then(res => res.json())
            .then(data => setInstructors(data))
    }, [])
    return (
        <div>
            <h1 className="text-5xl font-bold text-center mt-24 mb-12">Popular Instructors</h1>

            <div className="grid grid-cols-4 gap-4 my-8">
                {
                    instructors.map(a => <div key={a._id} className="bg-base-100 shadow-xl">
                        <figure><img src={a.instructorImage} alt="Movie" /></figure>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Instructors;