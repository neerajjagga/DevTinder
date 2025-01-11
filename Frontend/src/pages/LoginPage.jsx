import React, { useState } from 'react'
import axios from 'axios'
import BasicForm from '../components/BasicForm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/user.slice';
import { useDispatch } from 'react-redux'


const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogin(e) {
    e.preventDefault();
    axios.post('/auth/login', {
      emailId: email,
      password,
    })
      .then(({ data }) => {
        toast.success(data.message)
        dispatch(setUser(data.user))
        navigate('/')
      })
      .catch(({ response }) => {
        toast.error(response.data.message);
      })
  }

  return (
    <BasicForm heading={"Login"} buttonText={"Login"} email={email} password={password} setEmail={setEmail} setPassword={setPassword}
      handleSubmit={handleLogin}
    />
  )
}

export default LoginPage