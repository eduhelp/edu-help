import {
  GET_USERS,
  GET_USERS_SUCCESS,
  ADD_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GET_USER_DETAILS_SUCCESS,
  GET_AUTH_INFO_SUCCESS,
  UPDATE_USER_INFO_SUCCESS,
} from './actionType'
import { TOGGLE_SNACKBAR } from './../Snackbar/actionType'
// import config from './../../config/apiConfig'
import { getService, postService } from '../../services/Registration'

export function getUsers () {
  return { type: GET_USERS }
}

export function getUsersAPI () {
  return getService('users')
    .then((resp) => {
      return resp
    })
    .catch((error) => {
      throw(error)
    })
}


export function getUsersAPITemp () {
  return dispatch => {
    return getService('usersList')
    .then((resp) => {
      dispatch({data: resp, type: GET_USERS_SUCCESS})
    })
    .catch((error) => {
      dispatch({ type: GET_USERS_FAIL})
    })
  }
}

export function addUser (payload) {
  return dispatch => {
    return postService('addUser', payload)
    .then((resp) => {
      dispatch({data: resp, type: ADD_USER_SUCCESS})
      //dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
    })
    .catch((error) => {
      dispatch({ type: ADD_USER_FAIL})
    })
  }
}

export function userLogin (payload) {
  return dispatch => {
    return postService('userLogin', payload)
    .then((resp) => {
      dispatch({data: resp, type: LOGIN_SUCCESS})
      var succSnackbar = {status: true, variant: 'success', message: 'successfully logged in'}
      dispatch({ snackMessage: succSnackbar, type: TOGGLE_SNACKBAR })
    })
    .catch((error) => {
      dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
    })
  } 
}

export function userLogout () {
  console.log("ready to logout")
  /*return dispatch => {
    return postService('userLogin', payload)
    .then((resp) => {
      dispatch({data: resp, type: LOGIN_SUCCESS})
    })
    .catch((error) => {
      dispatch({ type: LOGIN_FAIL})
    })
  } */
  return { type: LOGOUT_SUCCESS }
}


export function changeUserStatus (payload) {
  return dispatch => {
    return postService('changeUserStatus', payload)
    .then((resp) => {
      dispatch({data: resp, type: ADD_USER_SUCCESS})
    })
    .catch((error) => {
      dispatch({ type: ADD_USER_FAIL})
    })
  }
}

export function getUserDetails (payload) {
  return dispatch => {
    return postService('getUserDetails', payload)
    .then((resp) => {
      dispatch({data: resp, type: GET_USER_DETAILS_SUCCESS })
    })
    .catch((error) => {
      dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
    })
  }
}

export function getAuthInfo (payload) {
  return {data: payload, type: GET_AUTH_INFO_SUCCESS }
}

export function updateUserInfo(payload) {
  return dispatch => {
    return postService('updateUserInfo', payload)
    .then((resp) => {
      dispatch({ data: resp, type: GET_AUTH_INFO_SUCCESS })
      const succMsg = {status: true, variant: 'success', message: 'Your details updated successfully'}
      dispatch({ snackMessage: succMsg, type: TOGGLE_SNACKBAR })
    })
    .catch((error) => {
      dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
    })
  }
}
