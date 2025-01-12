import { createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
    name : 'requests',
    initialState : {
        requests : null,
        unread : 0,
    },
    reducers : {
        addRequests : function(state, action) {
            state.requests = action.payload
        },
        removeRequest : function(state, action) {
            state.requests = [...state.requests?.filter(req => req._id !== action.payload)]
        },
        setUnreadNotiCount : function(state, action) {
            state.unread = action.payload;
        }
    }
})

export const {addRequests, removeRequest, setUnreadNotiCount } = requestSlice.actions;

export default requestSlice.reducer;