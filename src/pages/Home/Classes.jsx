import { useEffect, useState } from "react";

const Classes = () => {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/class')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])
    return (
        <div className="w-10/12 mx-auto">
            <h1 className="text-5xl font-bold text-center mt-24 mb-12">Popular Classes</h1>
            {
                classes.map(a => <div key={a._id} className="card lg:card-side bg-base-100 shadow-xl mt-12">
                    <figure><img className="w-[500px]" src={a.image} alt="Album" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">New album is released!</h2>
                        <p>Click the button to listen on Spotiwhy app.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Listen</button>
                        </div>
                    </div>
                </div>
                )
            }

        </div>
    );
};

export default Classes;