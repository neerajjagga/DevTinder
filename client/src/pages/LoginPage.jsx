import { Button } from '@mui/material';
import { Eye, EyeOff, Loader, UserSquare } from 'lucide-react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useUserStore } from '../store/user.store';

const LoginPage = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { loginUser, loading } = useUserStore();


  const handleLogin = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setIsEmailError(true);
      setIsPasswordError(true);
      toast.error("Email and Password is required");
      return;
    }

    loginUser(formData);
    console.log("in login");
    console.log(formData);
  }

  return (
    <div className='h-full flex justify-center'>
      <div className='mt-20 flex flex-col gap-6 bg-gray-900 py-5 px-5 rounded-lg lg:w-[40%] md:w-[60%] w-[90%]'>
        <h1 className='text-4xl text-center font-extrabold'>Welcome <span className='text-blue-500'>back</span></h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <label className={`input input-bordered flex items-center gap-2 bg-gray-700 bg-opacity-20 ${isEmailError && "input-error"}`}>
              <input
                type="email"
                className="grow"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </label>
            <label className={`input input-bordered flex items-center gap-2 bg-gray-700 bg-opacity-20 ${isPasswordError && "input-error"}`}>
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
          </div>

          <span className="text-sm text-gray-400">
            Don't have an account? <Link to={'/signup'} className="text-blue-500 underline">Create Now</Link>
          </span>

          <Button type="submit" variant="contained" className="flex gap-2 items-center">
            {loading && <Loader size={18} className="animate-spin" />}
            Signup
          </Button>
        </form>

      </div>
    </div>
  )
}

export default LoginPage