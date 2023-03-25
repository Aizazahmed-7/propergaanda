import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'userLogin',
    initialState: {
      
    },
    reducers: {
      loginRequest: (state, action) => {
        return { loading: true, user: {} }
      },
      loginSuccess: (state, action) => {
        return { loading: false, user: action.payload.user , isAuthenticated:true,message:action.payload.message }
      },
      loginFail: (state, action) => {
        return { loading: false, error: action.payload ,userInfo:null}
      },
      LoadUserRequest: (state, action) => {
        return { loading: true, user: {} }
      },
      LoadUserSuccess: (state, action) => {
        return { loading: false, user: action.payload.user , isAuthenticated:true,message:action.payload.message}
      },
      LoadUserFail: (state, action) => {
        return { loading: false, error: action.payload ,user:null}
      },
      logout: (state,action) => {
  
          return{message:action.payload.message}
      },
      clearError(state,action){
        return {loading:false,error:null}
      },
      clearMessage(state,action){
        return {loading:false,message:null}
      }

    },
  })

  export const {loginRequest, loginSuccess, loginFail,logout,LoadUserRequest,LoadUserSuccess,LoadUserFail,clearError,clearMessage} = userSlice.actions

  