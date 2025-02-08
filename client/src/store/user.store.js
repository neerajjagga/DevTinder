import { create } from 'zustand';
import axios from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuthLoader: false,

    setUser: async (data) => {
        set({ user: data });
    },

    githubLogin: () => {
        window.location.href = "http://localhost:3000/api/auth/github";
    },

    signupUser: async (data) => {
        set({ loading: true });
        try {
            const res = await axios.post("/auth/signup", data);
            console.log(res);
            set({ user: res.data.user, loading: false });
            toast.success("Account created successfully");
        } catch (error) {
            set({ loading: false });
            console.log(error);
            toast.error(error.response.data?.message || "An unknown error occurred while signup");
        }
    },

    loginUser: async (data) => {
        set({ loading: true });
        try {
            const res = await axios.post("/auth/login", data);
            console.log(res);
            set({ user: res.data.user, loading: false });
            toast.success("Successfully loggedIn");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data?.message || "An unknown error occurred while login");
        }
    },

    logoutUser: async () => {
        set({ loading: true });
        try {
            await axios.post("/auth/logout");
            set({ user: null, loading: false });
            toast.success("LoggedOut successfully");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data?.message || "An unknown error occurred while logout");
        }
    },

    checkAuth: async () => {
        set({ checkingAuthLoader: true })
        try {
            const res = await axios.get('/user/profile');
            set({ user: res.data?.user, checkingAuthLoader: false });
            return true;
        } catch (error) {
            set({ user: null, checkingAuthLoader: false });
            return false;
        }
    },
}));