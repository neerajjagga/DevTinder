import Header from './components/Header'
import { Outlet } from 'react-router-dom';
import { useUserStore } from './store/user.store';
import Loader from './components/Loader';
import { useEffect } from 'react';

const Layout = () => {

  const { checkAuth, checkingAuthLoader } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuthLoader) {
    return <Loader />
  }

  return (
    <div className="min-h-screen w-full bg-gray-950 relative text-white flex flex-col pb-10">
      <Header />

      <div className='mt-16'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout