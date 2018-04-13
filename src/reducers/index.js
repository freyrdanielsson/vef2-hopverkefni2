import { combineReducers } from 'redux'
import auth from './auth'
import register from './register'

export default combineReducers({
  auth,
  register,
})
