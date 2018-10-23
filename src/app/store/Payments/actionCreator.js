import {
  GET_PAYMENTS_SUCCESS,
  GET_PAYMENTS_FAIL,
  GET_LEVEL_PAYMENTS_SUCCESS,
  MY_CONFIRM_PENDING_LIST,
  MY_PAYMENT_LIST_SUCCESS,
  LEVEL_ELIGIBILIY_SUCCESS,
  CONFIRM_RECEIVER_SUCCESS,
  RECEIVED_PAYMENT_LIST_SUCCESS,
} from './actionType'
// import config from './../../config/apiConfig'
import { TOGGLE_SNACKBAR } from './../Snackbar/actionType'
import { postService } from '../../services/Registration'


export function getPaymentDetails (payload) {
  return dispatch => {
    return postService('payments/paymentDetails',payload)
    .then((resp) => {
      dispatch({data: resp, type: GET_PAYMENTS_SUCCESS})
    })
    .catch((error) => {
      dispatch({ type: GET_PAYMENTS_FAIL})
    })
  }
}

export function getLevelPayments () {
  return dispatch => {
    return postService('payments/levelPayments')
    .then((resp) => {
      dispatch({data: resp, type: GET_LEVEL_PAYMENTS_SUCCESS})
    })
    .catch((error) => {
      dispatch({ type: GET_PAYMENTS_FAIL})
    })
  }
}

export function getReceivedPayments () {
  return dispatch => {
    return postService('payments/receivedPayments')
    .then((resp) => {
      dispatch({data: resp, type: GET_RECEIVED_PAYMENTS_SUCCESS})
    })
    .catch((error) => {
      dispatch({ type: GET_PAYMENTS_FAIL})
    })
  }
}

export function makeLevelPayment (payload) {
  return dispatch => {
    return postService('payments/makeLevelPayment', payload)
    .then((resp) => {
      // dispatch({data: resp, type: MAKE_PAYMENT_SUCCESS})
      var succSnackbar = {status: true, variant: 'success', message: 'payment details successfully updated'}
      dispatch({ snackMessage: succSnackbar, type: TOGGLE_SNACKBAR })
    })
    .catch((error) => {
      dispatch({ type: MAKE_PAYMENT_FAIL})
    })
  }
}

export function myConfirmPendingList (payload) {
  return dispatch => {
    return postService('payments/myConfirmPendingList', payload)
    .then((resp) => {
      dispatch({data: resp, type: MY_CONFIRM_PENDING_LIST})
    })
    .catch((error) => {
      dispatch({ type: RECEIVE_PAYMENT_LIST_FAIL})
    })
  }
}

export function confirmLevelPayment (payload) {
  console.log('confirmLevelPayment - action creator')
  return dispatch => {
    return postService('payments/confirmLevelPayment', payload)
    .then((resp) => {
      dispatch({data: resp, type: CONFIRM_PAYMENT_SUCCESS})
      var succSnackbar = {status: true, variant: 'success', message: 'payment confirmed and entry placed'}
      dispatch({ snackMessage: succSnackbar, type: TOGGLE_SNACKBAR })
    })
    .catch((error) => {
      dispatch({ type: CONFIRM_PAYMENT_FAIL})
    })
  }
}

export function getMyPaymentList (payload) {
  return dispatch => {
    return postService('payments/myPaymentList', payload)
    .then((resp) => {
      dispatch({data: resp, type: MY_PAYMENT_LIST_SUCCESS})
    })
    .catch((error) => {
      dispatch({ type: MY_PAYMENT_LIST_FAIL})
    })
  }
}

export function getLevelEligibility (payload) {
  return dispatch => {
    return postService('payments/levelEligibility', payload)
    .then((resp) => {
      dispatch({data: resp, type: LEVEL_ELIGIBILIY_SUCCESS})
    })
    .catch((error) => {
      dispatch({ type: MY_PAYMENT_LIST_FAIL})
    })
  }
}

export function addConfirmReceiver (payload) {
  return dispatch => {
    return postService('payments/addConfirmReceiver', payload)
    .then((resp) => {
      dispatch({data: resp, type: CONFIRM_RECEIVER_SUCCESS})
      var succSnackbar = {status: true, variant: 'success', message: 'Receiver confirmed'}
      dispatch({ snackMessage: succSnackbar, type: TOGGLE_SNACKBAR })
    })
    .catch((error) => {
      dispatch({ type: MY_PAYMENT_LIST_FAIL})
    })
  }
}

export function getReceivedPaymentList (payload) {
  return dispatch => {
    return postService('payments/myReceivedPaymentList', payload)
    .then((resp) => {
      dispatch({data: resp, type: RECEIVED_PAYMENT_LIST_SUCCESS})
    })
    .catch((error) => {
      dispatch({ type: MY_PAYMENT_LIST_FAIL})
    })
  }
}