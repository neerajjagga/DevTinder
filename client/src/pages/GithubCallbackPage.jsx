import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user.store';
import Loader from './../components/Loader';

const GithubCallbackPage = () => {
    const { user, setUser } = useUserStore();
    const { search } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(search);
        const userData = params.get('user');

        if (userData) {
            const user = JSON.parse(userData);
            setUser(user)
        } else {
            console.error("No user data found in URL");
        }
    }, [search]);

    if (user) {
        navigate('/home');
    }

    return (
        <div>
            <Loader />
        </div>
    );
};

export default GithubCallbackPage;
