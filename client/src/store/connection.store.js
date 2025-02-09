
import { create } from 'zustand'
import axios from '../lib/axios';
import toast from 'react-hot-toast';

export const useConnectionStore = create((set, get) => ({
    myConnections: [],
    receivedConnections: [],
    loading: false,
    selectedUserForChat : null,
    
    setSelectedUserForChat : (user) => {
        console.log(user);
        set({ selectedUserForChat : user });
    },

    sendConnection: async (toUserId, status) => {
        set({ loading: true });
        try {
            const res = await axios.post(`/connections/send/${status}/${toUserId}`);
            console.log(res);
            set({ loading: false });
            toast.success(res.data?.message);
            return true;
        } catch (error) {
            console.log(error);
            toast.error(error.response.data?.message || "An unknown error occurred while sending connection request");
            return false;
        }
    },

    reviewConnection: async (requestId, status) => {
        set({ loading: true });
        try {
            const res = await axios.post(`/connections/review/${status}/${requestId}`);
            set((prev) => ({
                receivedConnections: [...prev.receivedConnections.filter(req => req.id !== requestId)],
                loading: false,
            }));
            toast.success(res.data?.message);
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data?.message || "An unknown error occurred while reviewing connection request");
        }
    },

    getMyConnections: async () => {
        set({ loading: true });
        try {
            const res = await axios.get('/connections/me');
            console.log(res);

            set({ myConnections: res.data?.myConnections, loading: false });
        } catch (error) {
            console.log(error);
            toast.error(error.response.data?.message || "An unknown error occurred while getting myConnections");
            return false;
        }
    },

    getReceivedConnections: async () => {
        set({ loading: true });
        try {
            const res = await axios.get('/connections/received');
            console.log(res);
            set({ receivedConnections: res.data?.requests, loading: false });
        } catch (error) {
            console.log(error);
            toast.error(error.response.data?.message || "An unknown error occurred while receiving my connections");
            return false;
        }
    }
}));