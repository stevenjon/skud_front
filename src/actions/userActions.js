import  {SET_AUTHLOADING, SET_USER } from './types.js';
import BaseUrl from '../BaseUrl'
import axios from 'axios'
import {message} from 'antd'


export const getLogin = (data) => async (dispatch) => {
    
    dispatch({
        type: SET_AUTHLOADING,
        payload: true
    })

    try {
        const formData = new FormData();
        formData.append('login', data.login)
        formData.append('parol', data.parol)

        let res = await axios({
            method: 'post',
            url: `${BaseUrl}login`,
            data: formData
  
          });
       if(res.data.length > 0) {

            window.localStorage.setItem('user', res.data[0].turi)
           dispatch({
            type: SET_AUTHLOADING,
            payload: false
            })
            dispatch({  
                type: SET_USER,
                payload: res.data[0].fio 
                })
       }else {
            message.error("Login yoki parol Xato!!!")
            dispatch({
                type: SET_AUTHLOADING,
                payload: false
                })
       }   

    } catch (error) {
        message.error("Aloqa yo'q")
        dispatch({
            type: SET_AUTHLOADING,
            payload: false
            })
    }
}   




