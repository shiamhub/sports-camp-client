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
            <div className="grid grid-cols-3 gap-4 my-8">
            {
                classes.map(a => <div key={a._id} className="bg-base-100 shadow-xl rounded-xl mt-12">
                    <figure><img className="w-[500px] rounded-xl" src={a.image} alt="Album" /></figure>
                    
                </div>
                )
            }
            </div>

        </div>
    );
};

export default Classes;