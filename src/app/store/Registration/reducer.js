import { fromJS } from 'immutable'
import {
  GET_USERS_SUCCESS,
  ADD_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GET_USER_DETAILS_SUCCESS,
} from './actionType'

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
      console.log("reducer - get users")
      const mockJson = [{
        id: 123,
        name: 'saktija'
      },{
        id: 234,
        name: 'meenu'
      }]
      return state
        .set('usersList', fromJS(action.data))
    
    case ADD_USER_SUCCESS:
      return state
        .set('successMsg', fromJS('sucess'))
    
    case LOGIN_SUCCESS:
      const dt = new Date()
      const authInfo = {isAuth: true, data: action.data, expTime: dt }
      return state
        .set('authInfo', fromJS(authInfo))
    
    case LOGOUT_SUCCESS:
      const authInfoFail = {isAuth: false }
      return state
        .set('authInfo', fromJS(authInfoFail))
    
    case GET_USER_DETAILS_SUCCESS:
      return state
        .set('userDetails', fromJS(action.data[0]))
        
    default:
      return state
  }
}
