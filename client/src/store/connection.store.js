
import { create } from 'zustand'
import axios from '../lib/axios';
import toast from 'react-hot-toast';

export const useConnectionStore = create((set, get) => ({
    myConnections: [],
    loading: false,

    sendConnection: async (toUserId, status) => {
        set({ loading: true });
        try {
            const res = await axios.post(`/connections/send/${status}/${toUserId}`);
            console.log(res);
            set({ loading : false });
            toast.success(res.data?.message);
            return true;
        } catch (error) {
            console.log(error);
            toast.error(error.response.data?.message || "An unknown error occurred while sending connection request");
            return false;
        }
    },
    
    reviewConnection: async (toUserId, status) => {
        set({ loading: true });
        try {
            const res = await axios.post(`/connections/review/${status}/${toUserId}`);
            console.log(res);
            set({ loading : false });
            toast.success(res.data?.message);
            return true;
        } catch (error) {
            console.log(error);
            toast.error(error.response.data?.message || "An unknown error occurred while reviewing connection request");
            return false;
        }
    },
}))