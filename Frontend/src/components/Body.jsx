import NavBar from './Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/user.slice';
import {setUnreadNotiCount, addRequests} from '../store/request.slice';

axios.defaults.baseURL = 'http://localhost:3000/api/'
axios.defaults.withCredentials = true;

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.post('/auth/checkAuth')
      .then(({ data }) => {
        dispatch(setUser(data.user))
        navigate('/')
      })
      .catch((err) => {
        navigate('/login')
      })
  }, []);


  useEffect(() => {
    axios.get('/user/requests/received')
      .then(({ data }) => {        
        dispatch(addRequests(data.requests));
        const unreadNotifications = data.requests.filter(req => !req.isRead).length;
        dispatch(setUnreadNotiCount(unreadNotifications))
      })
      .catch((err) => {
        console.error('Error fetching requests:' + err);
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