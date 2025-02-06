import Header from './components/Header'
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen w-full bg-gray-950 relative text-white flex flex-col">
      <Header />

      <div className='mt-16'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout