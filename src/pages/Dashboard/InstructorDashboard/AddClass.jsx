import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AddClass = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const imagesHosting = import.meta.env.VITE_IMAGE_UPLOAD_URL;

    const imageURl = `https://api.imgbb.com/1/upload?key=${imagesHosting}`

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        const fromData = new FormData();
        fromData.append("image", data.image[0]);
        console.log(fromData)

        fetch(imageURl, {
            method: "POST",
            body: fromData
        })
            .then(res => res.json())
            .then(inData => {
                console.log(inData)
                if(inData.success){
                    const imgURL = inData.data.display_url;
                    const { price, className, availableSeats } = data;
                    const newClasses = {
                        image: imgURL,
                        instructorName: user?.displayName,
                        instructorEmail: user?.email,
                        price: parseFloat(price),
                        className,
                        availableSeats,
                        status: "pending"
                    }
                    axiosSecure.post("/newClasses", newClasses)
                        .then(res => {
                            console.log(res.data)
                            if (res.data.acknowledged) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Class Added',
                                    showConfirmButton: false,
                                    timer: 1500
                                })

                            }
                        })
                }
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-9/12">
            <div className="flex gap-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Instructor name</span>
                    </label>
                    <input type="name" defaultValue={user?.displayName} {...register("instructorName")} placeholder="Type here" className="input input-bordered w-full" />

                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Instructor email</span>
                    </label>
                    <input type="email" defaultValue={user?.email} {...register("instructorEmail")} placeholder="Type here" className="input input-bordered w-full" />

                </div>
            </div>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Class name</span>
                </label>
                <input type="name" {...register("className", { required: true })} placeholder="Type here" className="input input-bordered w-full" />

            </div>
            <div className="flex gap-8">

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Available seats</span>
                    </label>
                    <input type="number" {...register("availableSeats", { required: true })} placeholder="Type here" className="input input-bordered w-full" />

                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input type="price" {...register("price", { required: true })} placeholder="Type here" className="input input-bordered w-full" />

                </div>
            </div>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Pick Class Image</span>
                </label>
                <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full" />

            </div>
            <input type="submit" name="" className="btn btn-primary w-full max-w-xs mt-8 flex mx-auto" value={"Add Class"} />
        </form>
    );
};

export default AddClass;