import { useEffect, useState } from "react";

const ClassesHome = () => {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/class')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])
    return (
        <div className="w-10/12 mx-auto">
            {
                classes.map(a => <div key={a._id} className={`card lg:card-side ${(a.set - a.students) ? "bg-base-100" : "bg-red-500"} shadow-xl mt-12`}>
                    <figure><img className="w-[500px]" src={a.image} alt="Album" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{a.class}</h2>
                        <p>Instructor name: {a.insName}</p>
                        <p>Students: {a.students}</p>
                        <p>Available seats: {a.set}</p>
                        <p>Price: {a.price}</p>
                        <div className="card-actions justify-end">
                            <button disabled={!(a.set - a.students)} className="btn btn-primary">Listen</button>
                        </div>
                    </div>
                </div>
                )
            }

        </div>
    );
};

export default ClassesHome;