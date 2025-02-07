import React, { useEffect } from 'react'
import { useUserStore } from '../store/user.store'

const HomePage = () => {
    const {user} = useUserStore();

    useEffect(() => {
        console.log(user);
    }, []);
    
  return (
    <div>HomePage</div>
  )
}

export default HomePage