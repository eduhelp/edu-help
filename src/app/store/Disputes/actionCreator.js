import {
  OPEN_DISPUTE_SUCCESS,
  } from './actionType'
  import { TOGGLE_SNACKBAR } from './../Snackbar/actionType'
  import { postService } from '../../services/Registration'

  export function openDispute (payload) {
    return dispatch => {
      return postService('disputes/open', payload)
      .then((resp) => {
        dispatch({data: resp, type: OPEN_DISPUTE_SUCCESS})
      })
      .catch((error) => {
        dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
      })
    }
  }