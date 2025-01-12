import {configureStore} from '@reduxjs/toolkit';
import userSlice from './user.slice';
import feedSlice from '../store/feed.slice';
import requestSlice from '../store/request.slice';

const store = configureStore({
    reducer : {
        'user' : userSlice,
        "feed" : feedSlice,
        "requests" : requestSlice,
    }
})

export default store;
