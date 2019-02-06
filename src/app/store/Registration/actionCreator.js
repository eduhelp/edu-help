import {
  GET_USERS,
  GET_USERS_SUCCESS,
  ADD_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GET_USER_DETAILS_SUCCESS,
  GET_AUTH_INFO_SUCCESS,
  CHECK_AVAILABLE_SUCCESS,
  SMART_SPREADERS_SUCCESS,
  MY_REFERRALS_SUCCESS,
  MY_SMART_SPREADER_LIST_SUCCESS,
  GET_MAINTENANCE_STATUS,
  FORGOT_PASSWORD_SUCCESS,
  REMOVE_FORGOT_PASSWORD,
} from './actionType'
import { TOGGLE_SNACKBAR } from './../Snackbar/actionType'
// import config from './../../config/apiConfig'
import { getService, postService } from '../../services/Registration'

export function getUsers () {
  return dispatch => {
    return postService('users/usersList')
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
    return postService('users/addUser', payload)
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
    return postService('users/userLogin', payload)
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

export function getUserDetails (payload) {
  return dispatch => {
    return postService('users/getUserDetails', payload)
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
    return postService('users/updateUserInfo', payload)
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

export function updatePaymentInfo(payload) {
  return dispatch => {
    return postService('users/updatePaymentInfo', payload)
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

export function changePassword(payload) {
  return dispatch => {
    return postService('users/changePassword', payload)
    .then((resp) => {
      dispatch({ data: resp, type: GET_AUTH_INFO_SUCCESS })
      const succMsg = {status: true, variant: 'success', message: 'password successfully changed'}
      dispatch({ snackMessage: succMsg, type: TOGGLE_SNACKBAR })
    })
    .catch((error) => {
      dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
    })
  }
}

export function checkAvailability(payload) {
  return dispatch => {
    return postService('users/checkAvailability', payload)
    .then((resp) => {
      dispatch({ data: resp, type: CHECK_AVAILABLE_SUCCESS })
    })
    .catch((error) => {
      dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
    })
  }
}

export function getSmartSpreaders(payload) {
  return dispatch => {
    return postService('users/getSmartSpreaders', payload)
    .then((resp) => {
      console.log('then clock')
      dispatch({ data: resp, type: SMART_SPREADERS_SUCCESS })
    })
    .catch((error) => {
      console.log('catch clock')
      const errMsg = {status: true, variant: 'error', message: 'problem while get the smart spreaders'}
      dispatch({ snackMessage: errMsg, type: TOGGLE_SNACKBAR })
    })
  }
}

export function getMyReferrals(payload) {
  return dispatch => {
    return postService('users/myReferrals', payload)
    .then((resp) => {
      dispatch({ data: resp, type: MY_REFERRALS_SUCCESS })
    })
    .catch((error) => {
      const errMsg = {status: true, variant: 'error', message: 'problem while retieve my referrals'}
      dispatch({ snackMessage: errMsg, type: TOGGLE_SNACKBAR })
    })
  }
}

export function getMySmartSpreadersList(payload) {
  return dispatch => {
    return postService('users/getMySmartSpreadersList', payload)
    .then((resp) => {
      dispatch({ data: resp, type: MY_SMART_SPREADER_LIST_SUCCESS })
    })
    .catch((error) => {
      const errMsg = {status: true, variant: 'error', message: 'problem while retieve my referrals'}
      dispatch({ snackMessage: errMsg, type: TOGGLE_SNACKBAR })
    })
  }
}

export function changeUserStatus(payload) {
  return dispatch => {
    return postService('users/changeUserStatus', payload)
    .then((resp) => {
      dispatch({ data: resp, type: GET_USERS_SUCCESS })
      const sucMsg = {status: true, variant: 'success', message: 'user status successfully chagned'}
      dispatch({ snackMessage: sucMsg, type: TOGGLE_SNACKBAR })
    })
    .catch((error) => {
      const errMsg = {status: true, variant: 'error', message: 'problem while change user status'}
      dispatch({ snackMessage: errMsg, type: TOGGLE_SNACKBAR })
    })
  }
}

export function getMaintenanceStatus() {
  return dispatch => {
    return postService('users/getMaintenanceStatus', {})
    .then((resp) => {
      dispatch({ data: resp, type: GET_MAINTENANCE_STATUS })
    })
    .catch((error) => {
      const errMsg = {status: true, variant: 'error', message: 'problem while change user status'}
      dispatch({ snackMessage: errMsg, type: TOGGLE_SNACKBAR })
    })
  }
}

export function updateMaintenance(payload) {
  return dispatch => {
    return postService('users/updateMaintenance', payload)
    .then((resp) => {
      dispatch({ data: resp, type: GET_MAINTENANCE_STATUS })
      const sucMsg = {status: true, variant: 'success', message: 'Mainenenace status successfully chagned'}
      dispatch({ snackMessage: sucMsg, type: TOGGLE_SNACKBAR })
    })
    .catch((error) => {
      const errMsg = {status: true, variant: 'error', message: 'problem while change user status'}
      dispatch({ snackMessage: errMsg, type: TOGGLE_SNACKBAR })
    })
  }
}

export function sendForgotPassword(payload) {
  return dispatch => {
    return postService('emails/sendForgotPassword', payload)
    .then((resp) => {
      dispatch({ data: resp, type: FORGOT_PASSWORD_SUCCESS })
    })
    .catch((error) => {
      dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
    })
  }
}

export function removeForgotPasswordMessage () {
  return {
    type: REMOVE_FORGOT_PASSWORD
  }
}
