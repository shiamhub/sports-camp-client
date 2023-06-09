import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useForm } from "react-hook-form";


const AddClass = () => {
    const { user, add, setAdd } = useContext(AuthContext);
    console.log(add);

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        setAdd(data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-9/12">
            <div className="flex gap-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Instructor name</span>
                    </label>
                    <input type="name" {...register("instructorName")} placeholder="Type here" defaultValue={user?.displayName} className="input input-bordered w-full" />

                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Instructor email</span>
                    </label>
                    <input type="email" {...register("instructorEmail")} placeholder="Type here" defaultValue={user?.email} className="input input-bordered w-full" />

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