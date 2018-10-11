import { fromJS } from 'immutable'
import {
  GET_USERS_SUCCESS,
  ADD_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GET_USER_DETAILS_SUCCESS,
  GET_AUTH_INFO_SUCCESS,
  UPDATE_USER_INFO_SUCCESS,
  CHECK_AVAILABLE_SUCCESS,
  SMART_SPREADERS_SUCCESS,
} from './actionType'
import { setCookie, deleteCookie } from '../../components/Common/Utils'

export const initialState = fromJS({
  usersList : [],
  successMsg : '',
  authInfo: {
    isAuth: false
  },
  userDetails: {},
  availableStatus: {
    username: false,
    mobile: false
  },
  smartSpreadersList: []
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
    
    case UPDATE_USER_INFO_SUCCESS:
      window.localStorage.setItem('AuthInfo', JSON.stringify(action.data));
      return state
        .set('authInfo', fromJS(authInfo))

    case CHECK_AVAILABLE_SUCCESS:
      const stausTempArr = ['availableStatus', action.data.field_name]
      return state
        .setIn(stausTempArr, action.data.availableStatus)
    
    case SMART_SPREADERS_SUCCESS:
    console.log('reducer')
    console.log(action.data)
      return state
        .set('smartSpreadersList', fromJS(action.data))

    default:
      return state
  }
}
