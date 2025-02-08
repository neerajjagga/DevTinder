import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user.store';
import { Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { user, loading, logoutUser } = useUserStore();

  const handleLogout = () => {
    logoutUser();
  }
  return (
    <header className="backdrop-blur-sm text-white shadow-md fixed w-full z-10">
      <div className="sm:px-28 px-8 py-4 flex justify-between items-center h-16 border-b-2 border-gray-900">
        <div className="text-3xl font-bold">
          <Link to={user ? '/home' : '/'} className="text-white hover:text-gray-300">Devtinder</Link>
        </div>

        {!user ? (
          <div className="flex gap-3">
            <Button onClick={() => navigate('/signup')} variant="outlined">Signup</Button>
            <Button onClick={() => navigate('/login')} variant="contained">Login</Button>
          </div>
        ) : (
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-11 rounded-full">
                  <img className='h-11 rounded-full' src={user.profileImageUrl ? user.profileImageUrl : 'https://res.cloudinary.com/dabywmj68/image/upload/v1738950098/0684456b-aa2b-4631-86f7-93ceaf33303c_gckgiv.jpg'} alt="Profile Image" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between">
                    Profile
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li onClick={handleLogout}><a>Logout</a></li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
