import { createStore, combineReducers } from 'redux'
import blogReducer from './blogReducer'
import userReducer from './userReducer'
import userlistReducer from './userlistReducer'

const reducer = combineReducers({ blogs: blogReducer, user: userReducer, userlist: userlistReducer })

const store = createStore(reducer)

export default store