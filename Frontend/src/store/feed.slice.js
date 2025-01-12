import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
    name : 'feed',
    initialState : {
        feed : null,
    },
    reducers : {
        addFeedItems : function(state, action) {
            state.feed = action.payload
        },
        removeItemFromFeed : function(state) {
            if (state.feed?.length > 0) {
                state.feed.shift();
            }
        }
    }
})

export const {addFeedItems, removeItemFromFeed} = feedSlice.actions;

export default feedSlice.reducer;