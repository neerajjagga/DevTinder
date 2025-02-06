import { create } from 'zustand';
import axios from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useUserStore = create((set, get) => ({
    user : null,
    loading : false,

    signupUser : async (data) => {
        set({ loading : true });
        try {
            const res = await axios.post("/signup", data);
            console.log(res);
            set({ user : res.data.user, loading : false});
            toast.success("Account created successfully");
        } catch (error) {
            console.log(error);
            toast.error(error.res.data?.message || "An unknown error occurred while signup");
        }
    },

    loginUser : async (data) => {
        set({ loading : true });
        try {
            const res = await axios.post("/login", data);
            console.log(res);
            set({ user : res.data.user, loading : false});
            toast.success("Successfully loggedIn");
        } catch (error) {
            console.log(error);
            toast.error(error.res.data?.message || "An unknown error occurred while login");
        }
    },

    logoutUser : async (data) => {
        set({ loading : true });
        try {
            await axios.get("/logout");
            set({ user : null, loading : false});
            toast.success("LoggedOut successfully");
        } catch (error) {
            console.log(error);
            toast.error(error.res.data?.message || "An unknown error occurred while logout");
        }
    },
}))