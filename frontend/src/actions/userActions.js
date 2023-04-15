import axios from 'axios'
import { loginSuccess,loginRequest,loginFail,logout,LoadUserFail,LoadUserRequest,LoadUserSuccess} from '../reducers/userReducer'
import api_link from '../api_link'

export const Login = (email,password) => async (dispatch) => {
    
    try {

        dispatch(loginRequest())
        const config ={
             headers:{
                'Content-Type':'application/json'
             },
             withCredentials:true
        }
        const { data } = await axios.post(api_link+'/api/user/login',{username:email,password},config)
        
        dispatch(loginSuccess(data))     
      
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(loginFail(error))
    }

  }


  export const LoadUser = () => async (dispatch) => {
    try {

        dispatch(LoadUserRequest())
        const config ={
             headers:{
                'Content-Type':'application/json'
             },
             withCredentials:true
        }
        const { data } = await axios.get(api_link+'/api/user/getProfile',config)
        
        dispatch(LoadUserSuccess(data))

       // localStorage.setItem('userInfo',JSON.stringify(data))
      
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(LoadUserFail(error))
    }

  }


  export const LoadAdmin = () => async (dispatch) => {
    try {

        dispatch(LoadUserRequest())
        const config ={
             headers:{
                'Content-Type':'application/json'
             },
             withCredentials:true
        }
        const { data } = await axios.get(api_link+'/api/user/getAdminProfile',config)
        
        dispatch(LoadUserSuccess(data))
      
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(LoadUserFail(error))
    }

  }


    export const Logout = () => async (dispatch) => {
        
            try {
                const config ={
                    headers:{
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                }
                const { data } = await axios.get(api_link+'/api/user/logout',config)
                dispatch(logout(data))        
            } catch (err) {
                const error = err.response && err.response.data.message ? err.response.data.message : err.message
                dispatch(loginFail(error))
            }
        
    }