import { combineReducers } from 'redux'
import login from './login'
import loader from './loader'
import register from './register'
import appointments from './appointments'

export default combineReducers({
  login,
  loader,
  register,
  appointments
})