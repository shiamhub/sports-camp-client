import { useEffect, useState } from "react";

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
        fetch("https://assignment-12-server-shiamhub.vercel.app/class")
            .then(res => res.json())
            .then(data => setInstructors(data))
    }, [])
    return (
        <div className="w-10/12 mx-auto">
            <h1 className="lg:text-5xl text-3xl font-bold text-center lg:mt-24 mt-6 lg:mb-12">Popular Instructors</h1>


            <div className="grid grid-cols-3 gap-4 my-8">
                {
                    instructors?.slice(0, 6).map(a => <div key={a._id} className="bg-base-100 rounded-xl shadow-xl">
                        <figure><img className="rounded-xl" src={a?.instructorImage} alt="Movie" /></figure>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Instructors;