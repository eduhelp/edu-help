import {
  GET_PAYMENTS_SUCCESS,
  GET_PAYMENTS_FAIL,
  GET_LEVEL_PAYMENTS_SUCCESS,
  RECEIVE_PAYMENT_LIST_SUCCESS,
  MY_PAYMENT_LIST_SUCCESS,
  LEVEL_ELIGIBILIY_SUCCESS,
  CONFIRM_RECEIVER_SUCCESS,
} from './actionType'
// import config from './../../config/apiConfig'
import { postService } from '../../services/Registration'


export function getPaymentDetails (payload) {
  return dispatch => {
    return postService('paymentDetails',payload)
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
    return postService('levelPayments')
    .then((resp) => {
      dispatch({data: resp, type: GET_LEVEL_PAYMENTS_SUCCESS})
    })
    .catch((error) => {
      dispatch({ type: GET_PAYMENTS_FAIL})
    })
  }
}

export function makeLevelPayment (payload) {
  return dispatch => {
    return postService('makeLevelPayment', payload)
    .then((resp) => {
      dispatch({data: resp, type: MAKE_PAYMENT_SUCCESS})
    })
    .catch((error) => {
      dispatch({ type: MAKE_PAYMENT_FAIL})
    })
  }
}

export function getReceivePaymentList (payload) {
  return dispatch => {
    return postService('receivePaymentList', payload)
    .then((resp) => {
      dispatch({data: resp, type: RECEIVE_PAYMENT_LIST_SUCCESS})
    })
    .catch((error) => {
      dispatch({ type: RECEIVE_PAYMENT_LIST_FAIL})
    })
  }
}

export function confirmLevelPayment (payload) {
  return dispatch => {
    return postService('confirmLevelPayment', payload)
    .then((resp) => {
      dispatch({data: resp, type: CONFIRM_PAYMENT_SUCCESS})
    })
    .catch((error) => {
      dispatch({ type: CONFIRM_PAYMENT_FAIL})
    })
  }
}

export function getMyPaymentList (payload) {
  return dispatch => {
    return postService('myPaymentList', payload)
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
    return postService('levelEligibility', payload)
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
    return postService('addConfirmReceiver', payload)
    .then((resp) => {
      dispatch({data: resp, type: CONFIRM_RECEIVER_SUCCESS})
    })
    .catch((error) => {
      dispatch({ type: MY_PAYMENT_LIST_FAIL})
    })
  }
}


