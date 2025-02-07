import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { Toaster } from 'react-hot-toast';
import { useUserStore } from './store/user.store';
import GithubCallbackPage from './pages/GithubCallbackPage';
import HomePage from './pages/HomePage';

function App() {

  const { user } = useUserStore();

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="signup" element={!user ? <SignupPage /> : <Navigate to={'/'} />} />
          <Route path="login" element={!user ? <LoginPage /> : <Navigate to={'/'} />} />
          <Route path="api/auth/github/callback" element={<GithubCallbackPage />} />
          <Route path="home" element={user ? <HomePage /> : <Navigate to={'/login'} />} />
        </Route>
      </Routes>

      <Toaster position="bottom-right" toastOptions={{
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }} />
    </>
  );
}

export default App;