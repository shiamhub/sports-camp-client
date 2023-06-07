import { useForm } from "react-hook-form";

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
    }
    console.log(errors);

    return (
        <div className="w-1/3 mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body rounded-xl shadow-lg m-8 bg-base-200">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="name" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register("password", { required: true })} placeholder="password" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input type="password" {...register("confirmPassword", { required: true })} placeholder="password" className="input input-bordered" />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="url" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                </div>

                <div className="form-control mt-6">
                    <input className="btn btn-primary" type="submit" name="" value="Sign Up" />
                </div>
            </form>
        </div>
    );
};

export default SignUp;