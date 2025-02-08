import { create } from 'zustand'
import axios from '../lib/axios';
import toast from 'react-hot-toast';

export const useFeedStore = create((set, get) => ({
    feedUsers: [],
    feedUsersCount: 0,
    page: 1,
    limit: 10,
    loading: false,

    setPageAndLimit: (pageNumber, limitNumber) => {
        set({ page: pageNumber, limit: limitNumber });
    },

    getFeed: async () => {
        set({ loading: true });
        const { page, limit } = get();

        try {
            const res = await axios.get(`/feed?page=${page}&limit=${limit}`);
            console.log(res);

            set({
                feedUsers: res.data?.users || [],
                feedUsersCount: res.data?.users.length || 0,
                loading: false
            });            
            console.log(get().feedUsers);
            
        } catch (error) {
            set({ loading: false });
            console.log(error);
            toast.error(error.response?.data?.message || "An unknown error occurred while getting feed");
        }
    }
}));
