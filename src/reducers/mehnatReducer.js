import  {GET_MAKTABLAR, GET_SHAHAR_TALIM, GET_SINGLEH, GET_SINGLE_MAKTAB, SET_HISOBOT_STATUS, SET_LOADING, SET_MAKTAB_ID, SET_SEC, SET_YIL} from '../actions/mehnatTypes'

const initialScale = {
    shahartalim: [],
    singleH: [],
    loading: false,
    Hstatus: {
        type: 0,
        status: "tuman"
    },
    maktablar: [],
    maktab: [],
    yil: new Date().getFullYear() - 1,
    maktab_id: null
}
export default (state = initialScale, action)=> {
    switch (action.type) {
        case GET_SHAHAR_TALIM:
            return {
                ...state,
                shahartalim: action.payload
            }
      
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

            case SET_YIL:
                return {
                    ...state,
                    yil: action.payload
                }

            case SET_HISOBOT_STATUS:
            return {
                ...state,
                Hstatus: action.payload
            }
            case GET_SINGLE_MAKTAB:
                return {
                    ...state,
                    maktab: action.payload
                }
                
            case SET_MAKTAB_ID:
                return {
                    ...state,
                    maktab_id: action.payload
                }
        
        default:
            return state
    }
}