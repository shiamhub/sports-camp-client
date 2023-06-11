import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ClassesHome = () => {
    const [classes, setClasses] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetch('https://assignment-12-server-shiamhub.vercel.app/class')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])

    const handleAddToCart = (a) => {
        if(user) {
            const addItem = {
                className: a.className,
                price: a.price,
                instructorName: a.instructorName,
                email: user?.email,
                cartId: a._id
            }
            console.log(addItem);
            fetch('https://assignment-12-server-shiamhub.vercel.app/addCart', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(addItem)
            })
                .then(res => res.json())
                .then(data => console.log(data))
        } else {
            Swal.fire({
                title: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", {state: {from: location}});
                }
            })
        }
    }

    return (
        <div className="w-10/12 mx-auto grid grid-cols-2 gap-5 mb-28 mt-10">
            {
                classes.map(a => <div key={a._id} className={`card lg:card-side ${(a.set === 0) ? "bg-red-500 text-white" : "bg-base-100"} shadow-xl mt-12`}>
                    <figure><img className="w-[500px]" src={a.image} alt="Album" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{a.className}</h2>
                        <p>Instructor name: {a.instructorName}</p>
                        <p>Instructor Email: {a.instructorEmail}</p>
                        <p>Available seats: {a.availableSeats}</p>
                        <p>Price: {a.price}</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => handleAddToCart(a)} disabled={(a.set === 0)} className="btn btn-primary">Add to cart</button>
                        </div>
                    </div>
                </div>
                )
            }

        </div>
    );
};

export default ClassesHome;