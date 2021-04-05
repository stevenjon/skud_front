import { GET_MAKTABLAR, GET_MUTA, GET_USERS, GET_YILLAR, SET_LOADING } from "../actions/adminTypes"

const initialScale = {
    loading: false,
    maktablar: [],
    users: [],
    muta: [],
    yillar: []
}
export default (state = initialScale, action)=> {
    switch (action.type) {
        case SET_LOADING: 
        return {
            ...state,
            loading: action.payload
        }
        case GET_MAKTABLAR: 
        return {
            ...state,
            maktablar: action.payload
        }
         
        case GET_USERS: 
        return {
            ...state,
            users: action.payload
        }
        case GET_YILLAR: 
        return {
            ...state,
            yillar: action.payload
        }
        
        case GET_MUTA: 
        return {
            ...state,
            muta: action.payload
        }
        default:
            return state
    }
}