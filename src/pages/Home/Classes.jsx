import { useEffect, useState } from "react";
import { Zoom } from "react-awesome-reveal";

const Classes = () => {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        fetch('https://assignment-12-server-shiamhub.vercel.app/class')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])
    return (
        <div className="w-10/12 mx-auto">
            <h1 className="lg:text-5xl text-3xl font-bold text-center lg:mt-24 lg:mb-12 my-6">Popular Classes</h1>
            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 lg:my-8 mt-5">
            {
                classes?.slice(0, 6).map(a => <div key={a._id} className="bg-base-100 shadow-xl rounded-xl">
                    <figure><Zoom duration={1500}><img className="w-[500px] rounded-xl" src={a.image} alt="Album" /></Zoom></figure>
                    
                </div>
                )
            }
            </div>

        </div>
    );
};

export default Classes;