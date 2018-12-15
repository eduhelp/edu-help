import {
  OPEN_DISPUTE_SUCCESS,
  GET_MY_DISPUTES_SUCCESS,
  DISPUTE_PHOTOS_SUCCESS,
  DISPUTE_COMMENTS_SUCCESS,
  GET_NOTIFICATIONS_SUCCESS,
  OPEN_NOTIFY_STATUS,
  } from './actionType'
  import { TOGGLE_SNACKBAR } from './../Snackbar/actionType'
  import { postService } from '../../services/Registration'

  export function openDispute (payload) {
    return dispatch => {
      return postService('disputes/open', payload)
      .then((resp) => {
        dispatch({data: resp, type: OPEN_DISPUTE_SUCCESS})
        const succMsg = {status: true, variant: 'success', message: 'dispute created successfully..'}
        dispatch({ snackMessage: succMsg, type: TOGGLE_SNACKBAR })
      })
      .catch((error) => {
        dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
      })
    }
  }

  export function getMyDisputes (payload) {
    return dispatch => {
      return postService('disputes/getMyDisputes', payload)
      .then((resp) => {
        dispatch({data: resp, type: GET_MY_DISPUTES_SUCCESS})
      })
      .catch((error) => {
        dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
      })
    }
  }
  
  export function getDisputePhotos (payload) {
    return dispatch => {
      return postService('disputes/getDisputePhotos', payload)
      .then((resp) => {
        dispatch({data: resp, type: DISPUTE_PHOTOS_SUCCESS})
      })
      .catch((error) => {
        dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
      })
    }
  }

  export function addScreenshot (payload) {
    return dispatch => {
      return postService('disputes/addScreenshot', payload)
      .then((resp) => {
        const succMsg = {status: true, variant: 'success', message: 'Screenshot added..'}
        dispatch({ snackMessage: succMsg, type: TOGGLE_SNACKBAR })
      })
      .catch((error) => {
        dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
      })
    }
  }

  export function addDisputeComment (payload) {
    return dispatch => {
      return postService('disputes/addDisputeComment', payload)
      .then((resp) => {
        const succMsg = {status: true, variant: 'success', message: 'comment added..'}
        dispatch({ snackMessage: succMsg, type: TOGGLE_SNACKBAR })
      })
      .catch((error) => {
        dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
      })
    }
  }

  export function getDisputeComments (payload) {
    return dispatch => {
      return postService('disputes/getDisputeComments', payload)
      .then((resp) => {
        dispatch({data: resp, type: DISPUTE_COMMENTS_SUCCESS})
      })
      .catch((error) => {
        dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
      })
    }
  }
  
  export function getAllDisputes (payload) {
    return dispatch => {
      return postService('disputes/getAllDisputes', payload)
      .then((resp) => {
        dispatch({data: resp, type: GET_MY_DISPUTES_SUCCESS})
      })
      .catch((error) => {
        dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
      })
    }
  }

  export function cancelTransaction (payload) {
    return dispatch => {
      return postService('disputes/cancelTransaction', payload)
      .then((resp) => {
        const succMsg = {status: true, variant: 'success', message: 'Transaction successfully cancelled...'}
        dispatch({ snackMessage: succMsg, type: TOGGLE_SNACKBAR })
      })
      .catch((error) => {
        dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
      })
    }
  }

  export function addNotification (payload) {
    return dispatch => {
      return postService('disputes/addNotification', payload)
      .then((resp) => {
        const succMsg = {status: true, variant: 'success', message: 'Notification added successfully...'}
        dispatch({ snackMessage: succMsg, type: TOGGLE_SNACKBAR })
      })
      .catch((error) => {
        dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
      })
    }
  }

  export function getNotifications () {
    return dispatch => {
      return postService('disputes/getNotifications', {})
      .then((resp) => {
        dispatch({data: resp, type: GET_NOTIFICATIONS_SUCCESS})
      })
      .catch((error) => {
        dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
      })
    }
  }

  export function openNotifyStatus () {
    const loaderMsg = { status: true }
    return {
      type: OPEN_NOTIFY_STATUS,
      loaderMsg,
    }
  }
  
  
  