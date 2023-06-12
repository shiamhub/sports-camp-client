import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const {googleLogin, login, user} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleGoogleLogin = () => {
        googleLogin()
        .then(result => {
            const nowUser = result?.user
            const savedUser = { name: nowUser?.displayName, email: nowUser?.email, role: 'student' };
            if(nowUser) {
                fetch('https://assignment-12-server-shiamhub.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(savedUser)
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        login(data.email, data.password)
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error);
            })
    }
    console.log(errors);

    useEffect(() => {
        if(user) {
            navigate(from, { replace: true });
        }
    }, [user, from, navigate])

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className="mx-8">
                    <div className="divider">or</div>
                    <button onClick={() => handleGoogleLogin()} className="btn btn-outline w-full"><FcGoogle className="text-2xl"></FcGoogle> Continue with google</button>
                    </div>
                    <p className="ml-8 mb-10 mt-5">New account for? <Link to="/signUp" className="text-primary">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;