import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="backdrop-blur-sm text-white shadow-md fixed w-full z-10">
      <div className="sm:px-28 px-8 py-4 flex justify-between items-center h-16 border-b-2 border-gray-900">
        <div className="text-2xl font-bold">
          <a href="/" className="text-white hover:text-gray-300">DevTinder</a>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => navigate('/signup')} variant="outlined">Signup</Button>
          <Button onClick={() => navigate('/login')} variant="contained">Login</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
