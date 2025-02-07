import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user.store';

const Header = () => {
  const navigate = useNavigate();
  const { user, loading } = useUserStore();

  return (
    <header className="backdrop-blur-sm text-white shadow-md fixed w-full z-10">
      <div className="sm:px-28 px-8 py-4 flex justify-between items-center h-16 border-b-2 border-gray-900">
        <div className="text-2xl font-bold">
          <a href="/" className="text-white hover:text-gray-300">DevTinder</a>
        </div>

        {!user ? (
          <div className="flex gap-3">
            <Button onClick={() => navigate('/signup')} variant="outlined">Signup</Button>
            <Button onClick={() => navigate('/login')} variant="contained">Login</Button>
          </div>
        ) : (
          <div>
            <img className='h-12 rounded-full' src={user.profileImageUrl ? user.profileImageUrl : 'https://res.cloudinary.com/dabywmj68/image/upload/v1738950098/0684456b-aa2b-4631-86f7-93ceaf33303c_gckgiv.jpg'} alt="Profile Image" />
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;
