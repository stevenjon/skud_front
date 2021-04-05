import BaseUrl from '../BaseUrl'
import axios from 'axios'
import {message} from 'antd'
import { GET_MAKTABLAR, GET_MUTA, GET_USERS, GET_YILLAR, SET_LOADING } from './adminTypes'

export const getMaktablar = (id) => async (dispatch) => {

    dispatch({
        type: SET_LOADING,
        payload: true
    })
    try {
        const formData = new FormData();
        formData.append("id", id)
        let res = await axios.post(`${BaseUrl}admin/maktablar`,formData)
          
        dispatch({
            type: GET_MAKTABLAR,
            payload: res.data
        })

        dispatch({
            type: SET_LOADING,
            payload: false
        })
        
        
    } catch (error) {
        message.error("Aloqa yo'q")
    }
}



export const getUsers = (id) => async (dispatch) => {

    dispatch({
        type: SET_LOADING,
        payload: true
    })
    try {
        const formData = new FormData();
        formData.append("id", id)
        let res = await axios.post(`${BaseUrl}admin/users`,formData)
          
        dispatch({
            type: GET_USERS,
            payload: res.data
        })

        dispatch({
            type: SET_LOADING,
            payload: false
        })
        
        
    } catch (error) {
        message.error("Aloqa yo'q")
    }
}

export const getMuta = () => async (dispatch) => {

    dispatch({
        type: SET_LOADING,
        payload: true
    })
    try {

        let res = await axios.get(`${BaseUrl}admin/getmuta`)
          
        dispatch({
            type: GET_MUTA,
            payload: res.data
        })

        dispatch({
            type: SET_LOADING,
            payload: false
        })
        
        
    } catch (error) {
        message.error("Aloqa yo'q")
    }
}

export const getYillar = (id) => async (dispatch) => {

    dispatch({
        type: SET_LOADING,
        payload: true
    })
    let tuman;
    if(id) {
        tuman = id
    }else {
        tuman = null
    }
    try {

        let res = await axios.get(`${BaseUrl}admin/getyillar?id=${tuman}`)
          
        dispatch({
            type: GET_YILLAR,
            payload: res.data
        })

        dispatch({
            type: SET_LOADING,
            payload: false
        })
        
        
    } catch (error) {
        message.error("Aloqa yo'q")
    }
}