import NavBar from './Navbar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/user.slice';

axios.defaults.baseURL = 'http://localhost:3000/api/'
axios.defaults.withCredentials = true;

const Body = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.post('/auth/checkAuth')
      .then(({ data }) => {
        dispatch(setUser(data.user))
        navigate('/')
      })
      .catch(({ response }) => {
        toast.error(response.data.message);
      })
  }, [])

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <Outlet />
      <ToastContainer position="bottom-right" autoClose={2000} newestOnTop closeButton pauseOnHover={false} />
    </div>
  )
}

export default Body