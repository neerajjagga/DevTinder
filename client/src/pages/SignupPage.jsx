import { Button } from '@mui/material';
import { Eye, EyeOff, Loader, Github } from 'lucide-react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useUserStore } from '../store/user.store';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        about: "",
    });

    const [errorInField, setErrorInField] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { signupUser, loading } = useUserStore();
    const { githubLogin } = useUserStore();

    const handleSignup = (e) => {
        e.preventDefault();

        if (!formData.name) {
            setErrorInField('name');
            toast.error("Name is required");
            return;
        }
        if (formData.name.length < 3) {
            setErrorInField('name');
            toast.error("Name should be minimum 3 characters long");
            return;
        }
        if (!formData.email) {
            setErrorInField('email');
            toast.error("Email is required");
            return;
        }
        if (!formData.password) {
            setErrorInField('password');
            toast.error("Password is required");
            return;
        }
        if (formData.password.length < 6) {
            setErrorInField('password');
            toast.error("Password should at least 6 characters");
            return;
        }
        setErrorInField('');
        signupUser(formData);
        console.log("In signup");
        console.log(formData);
    }

    const handleGithubLogin = () => {
        githubLogin();
    };
    

    return (
        <div className='h-full flex justify-center'>
            <div className='md:mt-20 mt-10 flex flex-col gap-6 bg-gray-900 py-5 px-5 rounded-lg lg:w-[40%] md:w-[60%] w-[90%]'>
                <h1 className='text-4xl text-center font-extrabold'>Create <span className='text-blue-500'>Account</span></h1>

                <form onSubmit={handleSignup} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                        <label className={`input input-bordered flex items-center gap-2 bg-gray-700 bg-opacity-20 ${errorInField === "name" && "input-error"}`}>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </label>

                        <label className={`input input-bordered flex items-center gap-2 bg-gray-700 bg-opacity-20 ${errorInField === "email" && "input-error"}`}>
                            <input
                                type="email"
                                className="grow"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </label>

                        <label className={`input input-bordered flex items-center gap-2 bg-gray-700 bg-opacity-20 ${errorInField === "password" && "input-error"}`}>
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                className="grow"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                            <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </label>

                        <label className='relative'>
                            <textarea
                                rows={4}
                                className="textarea textarea-bordered bg-gray-700 bg-opacity-20 w-full pr-10"
                                placeholder="About"
                                value={formData.about}
                                onChange={(e) => {
                                    if (e.target.value.length <= 160) {
                                        setFormData({ ...formData, about: e.target.value })
                                    }
                                }}
                            />
                            <span className='absolute top-2 right-5' >{160 - formData.about.length}</span>
                        </label>
                    </div>

                    <span className="text-sm text-gray-400">
                        Already have an account? <Link to={'/login'} className="text-blue-500 underline">Login Now</Link>
                    </span>

                    <Button type="submit" variant="contained" className="flex gap-2 items-center">
                        {loading && <Loader size={18} className="animate-spin" />}
                        Signup
                    </Button>

                    <Button
                        variant="outlined"
                        className="flex gap-2 items-center mt-3"
                        onClick={handleGithubLogin}
                    >
                        <Github size={20} /> Sign in with GitHub
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default SignupPage
