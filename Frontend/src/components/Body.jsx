import NavBar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Body = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <NavBar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body