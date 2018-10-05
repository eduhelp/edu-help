import { fromJS } from 'immutable'
import {
  GET_USERS_SUCCESS,
  ADD_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GET_USER_DETAILS_SUCCESS,
  GET_AUTH_INFO_SUCCESS,
} from './actionType'
import { setCookie, deleteCookie } from '../../components/Common/Utils'

export const initialState = fromJS({
  usersList : [],
  successMsg : '',
  authInfo: {
    isAuth: false
  },
  userDetails: {}
})


export default function usersReducer (state = initialState, action) {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return state
        .set('usersList', fromJS(action.data))
    
    case ADD_USER_SUCCESS:
      return state
        .set('successMsg', fromJS('sucess'))
    
    case LOGIN_SUCCESS:
      const dt = new Date()
      const authInfo = {isAuth: true, data: action.data, expTime: dt }
      setCookie('username', action.data.username, 1)
      setCookie('user_id', action.data.user_id, 1)
      window.localStorage.setItem('AuthInfo', JSON.stringify(action.data));
      return state
        .set('authInfo', fromJS(authInfo))
    
    case LOGOUT_SUCCESS:
      const authInfoFail = {isAuth: false }
      deleteCookie('username')
      deleteCookie('user_id')
      window.localStorage.removeItem('AuthInfo');
      return state
        .set('authInfo', fromJS(authInfoFail))
    
    case GET_USER_DETAILS_SUCCESS:
      return state
        .set('userDetails', fromJS(action.data))
    
    case GET_AUTH_INFO_SUCCESS:
      const authInfoReload = {isAuth: true, data: action.data, expTime: dt }
      return state
        .set('authInfo', fromJS(authInfoReload))
        
    default:
      return state
  }
}
