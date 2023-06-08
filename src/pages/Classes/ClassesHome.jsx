import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const ClassesHome = () => {
    const [classes, setClasses] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        fetch('http://localhost:5000/class')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])

    const handleAddToCart = (a) => {
        const addItem = {
            className: a.class,
            price: a.price,
            insName: a.insName,
            email: user?.email,
        }
        fetch('http://localhost:5000/addCart', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addItem)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    return (
        <div className="w-10/12 mx-auto">
            {
                classes.map(a => <div key={a._id} className={`card lg:card-side ${(a.set - a.students) ? "bg-base-100" : "bg-red-500 text-white"} shadow-xl mt-12`}>
                    <figure><img className="w-[500px]" src={a.image} alt="Album" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{a.class}</h2>
                        <p>Instructor name: {a.insName}</p>
                        <p>Students: {a.students}</p>
                        <p>Available seats: {a.set}</p>
                        <p>Price: {a.price}</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => handleAddToCart(a)} disabled={!(a.set - a.students)} className="btn btn-primary">Add to cart</button>
                        </div>
                    </div>
                </div>
                )
            }

        </div>
    );
};

export default ClassesHome;