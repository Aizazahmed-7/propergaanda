import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {userSlice} from './reducers/userReducer'


const store = configureStore({
    reducer: {
        userLogin : userSlice.reducer,
    },
    preloadedState: {
       
    },
    middleware: [thunk],
})
 
export default store