import { useForm } from "react-hook-form";
import { AuthContext } from "../providers/AuthProvider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [error, setError] = useState('');
    const { signUp, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        setError('');
        if (data.password === data.confirmPassword) {
            signUp(data.email, data.password)
                .then(result => {
                    console.log(result.user);
                    updateUserProfile(data.name, data.photoURL)
                        .then(() => {
                            const savedUser = {name: data.name, email: data.email, role: 'student'};
                            fetch('http://localhost:5000/users', {
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(savedUser)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if(data.insertedId) {
                                        alert('User created successfully');
                                    }
                                })
                        })
                        .catch(error => {
                            console.log(error);
                        })
                    navigate("/");
                })
                .catch(error => {
                    console.log(error);
                })
        }
        else{
            setError("Passwords do not match");
        }
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
                    {errors.name && <p className="text-red-500">Name is required</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                    {errors.email && <p className="text-red-500">Email is required</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 12, pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9)(?=.*[@$!%*?&])/ })} placeholder="password" className="input input-bordered" />
                    {errors.password === "required" && <p className="text-red-500">Password is required</p>}
                    {errors.password?.type === "minLength" && <p className="text-red-500">Password must be at least 6 characters</p>}
                    {errors.password?.type === "maxLength" && <p className="text-red-500">Password must be at least 12 characters</p>}
                    {errors.password?.type === 'pattern' && <p className="text-red-500" role="alert">password must contain at least one uppercase and one number</p>}

                </div>
                
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input type="password" {...register("confirmPassword", { required: true })} placeholder="confirm password" className="input input-bordered" />
                    {error && <p className="text-red-500">{error}</p>}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="url" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                    {errors.photoURL && <p className="text-red-500">Photo URL is required</p>}
                    
                </div>

                <div className="form-control mt-6">
                    <input className="btn btn-primary" type="submit" name="" value="Sign Up" />
                </div>
            </form>
        </div>
    );
};

export default SignUp;