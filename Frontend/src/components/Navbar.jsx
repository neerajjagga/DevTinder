import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios";
import { toast } from 'react-toastify';
import { setUser } from '../store/user.slice';
import { useDispatch } from 'react-redux'
import { setUnreadNotiCount } from '../store/request.slice';


const Navbar = () => {
    const user = useSelector(store => store.user.user);
    const unread = useSelector(store => store.requests.unread);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout() {
        axios.post('/auth/logout')
            .then(({ data }) => {
                toast.success(data.message)
                dispatch(setUser(null))
                navigate('/login')
            })
            .catch(({ response }) => {
                toast.error(response.data.message);
            })
    }

    function handleNotificationButtonClick() {
        dispatch(setUnreadNotiCount(0));
        navigate('/notifications/me');
    }

    return (
        <div className="flex justify-between navbar bg-base-200 px-10">
            <Link to={'/'} className="flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="-4.608 -8.828925 39.936 52.97355"><defs><radialGradient gradientUnits="userSpaceOnUse" cx="173.7628" gradientTransform="matrix(.93267 0 0 1.0722 -146.703 -883.4623)" fy="856.9146" fx="173.7628" r="35.1884" cy="856.9146" id="a"><stop stopColor="#FF7854" offset="0%" /><stop stopColor="#FD267D" offset="100%" /></radialGradient></defs><path d="M9.205 14.2587a.097.097 0 01-.108-.03c-1.194-1.581-1.494-4.299-1.567-5.343-.015-.201-.241-.314-.422-.213-3.687 2.071-7.108 6.97-7.108 11.7 0 8.126 5.644 14.943 15.36 14.943 9.103 0 15.36-7.026 15.36-14.942 0-10.358-7.402-17.24-13.995-20.351a.237.237 0 00-.336.246c.849 5.582-.324 11.653-7.184 13.99z" fillRule="evenodd" fill="url(#a)" /></svg>
                <h1 className="text-xl font-bold">DevTinder</h1>
            </Link>
            <div className="flex-none gap-5">
                <button onClick={handleNotificationButtonClick} className="btn-ghost btn-circle avatar flex justify-center items-center relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>

                    {unread > 0 && (
                        <span className="text-sm bg-red-600 text-white rounded-full px-2 py-[2px] font-semibold absolute right-0 top-0">
                            {unread}
                        </span>
                    )}

                </button>
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user?.photoUrl} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to={'/profile/me'} className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            <li><button onClick={handleLogout} className="">Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-[#ff385c] text-2xl py-1 px-4 rounded-lg text-black font-semibold">Login</button>
                )}
            </div>
        </div>
    )
}

export default Navbar