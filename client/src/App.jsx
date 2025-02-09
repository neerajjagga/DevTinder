import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { Toaster } from 'react-hot-toast';
import { useUserStore } from './store/user.store';
import GithubCallbackPage from './pages/GithubCallbackPage';
import FeedPage from './pages/FeedPage';
import ConnectionsPage from './pages/ConnectionsPage';
import NotificationPage from './pages/NotificationPage';
import ChatPage from './pages/ChatPage';

function App() {
  const { user } = useUserStore();

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={user ? <FeedPage /> : <IndexPage />} />
          <Route path="signup" element={!user ? <SignupPage /> : <Navigate to={'/'} />} />
          <Route path="login" element={!user ? <LoginPage /> : <Navigate to={'/'} />} />
          <Route path="connections" element={!user ? <LoginPage /> : <ConnectionsPage />} />
          <Route path="notifications" element={!user ? <LoginPage /> : <NotificationPage />} />
          <Route path="chat" element={!user ? <LoginPage /> : <ChatPage />} />
          <Route path="api/auth/github/callback" element={<GithubCallbackPage />} />
          <Route path="home" element={user ? <FeedPage /> : <Navigate to={'/login'} />} />
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