import BaseUrl from '../BaseUrl'
import axios from 'axios'
import {message} from 'antd'
import {GET_HISOBOT, GET_MAKTABLAR, GET_SHAHAR_TALIM, GET_SINGLEH, GET_SINGLE_MAKTAB, SET_HISOBOT_STATUS, SET_LOADING, SET_MAKTAB_ID, SET_SEC, SET_YIL} from './mehnatTypes'
export const getShaharTalim = (id) => async (dispatch, getState) => {
    const {labbay} = getState()
    dispatch({
        type: SET_LOADING,
        payload: true
    })
    try {
        const formData = new FormData();
        formData.append("id", id)
        formData.append("yil", labbay.yil)
        formData.append("sektor", window.localStorage.getItem("sektor"))
        let res = await axios.post(`${BaseUrl}mehnat/shahartalim`,formData)
          

        dispatch({
            type: GET_SHAHAR_TALIM,
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

export const setHisobotStatus = (data) => (dispatch) => {
        dispatch({
            type: SET_HISOBOT_STATUS,
            payload: data
        })    
}         



export const getMaktablar = (id, type) => async (dispatch,getState) => {

    const {labbay} = getState()

    dispatch({
        type: SET_LOADING,
        payload: true
    })
    try {
        const formData = new FormData();
        formData.append("id", id)
        formData.append("type", type)
        formData.append("yil", labbay.yil)
        formData.append("sektor", window.localStorage.getItem("sektor"))
        let res = await axios.post(`${BaseUrl}mehnat/tumanmaktablar`,formData)
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


export const getMaktab = (id) => async (dispatch, getState) => {

    const {mehnat} = getState()

    if(id != mehnat.maktab_id) {
        // dispatch({
        //     type: GET_SINGLE_MAKTAB,
        //     payload: []
        // })
        dispatch({
            type: SET_LOADING,
            payload: true
        })
        try {
            const formData = new FormData();
            formData.append("id", id)
            let res = await axios.post(`${BaseUrl}mehnat/singlemaktab`,formData)
              
            dispatch({
                type: GET_SINGLE_MAKTAB,
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
    dispatch({
        type: SET_LOADING,
        payload: true
    })
    try {
        const formData = new FormData();
        formData.append("id", id)
        let res = await axios.post(`${BaseUrl}mehnat/singlemaktab`,formData)
          

        dispatch({
            type: GET_SINGLE_MAKTAB,
            payload: res.data
        })
        
        dispatch({
            type: SET_MAKTAB_ID,
            payload: id
        })

        dispatch({
            type: SET_LOADING,
            payload: false
        })
        
        
    } catch (error) {
        message.error("Aloqa yo'q")
    }
}






export const setSecs = (data)=> (dispatch) => {
    dispatch({
        type: SET_SEC,
        payload:data
    })
}
export const setYil = (data)=> (dispatch) => {
    dispatch({
        type: SET_YIL,
        payload: data
    })
}
export const setHstatus = (data)=> (dispatch) => {
    dispatch({
        type: SET_HISOBOT_STATUS,
        payload:data
    })
}