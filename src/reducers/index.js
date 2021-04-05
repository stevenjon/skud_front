import {combineReducers} from 'redux';
import userReducer from './userReducer';
import mehnatReducer from './mehnatReducer'
import adminReducer from './adminReducer'

export default combineReducers({
    labbay: userReducer,
    mehnat: mehnatReducer,
    admin: adminReducer
})