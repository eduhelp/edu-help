import {
  MY_TREE_SUCCESS,
  MY_TOP_LEVEL_SUCCESS,
  ACTIVE_SMART_SPREADER_SUCCESS,
  } from './actionType'
  import { TOGGLE_SNACKBAR } from './../Snackbar/actionType'
  import { postService } from '../../services/Registration'

  export function getMyTree (payload) {
    return dispatch => {
      return postService('placements/myTree', payload)
      .then((resp) => {
        dispatch({data: resp, type: MY_TREE_SUCCESS})
      })
      .catch((error) => {
        dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
      })
    }
  }

  export function getMyTopLevel (payload) {
    return dispatch => {
      return postService('placements/myTopLevel', payload)
      .then((resp) => {
        dispatch({data: resp, type: MY_TOP_LEVEL_SUCCESS})
      })
      .catch((error) => {
        dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
      })
    }
  }

  export function getActiveSmartSpreader (payload) {
    return dispatch => {
      return postService('placements/activeSmartSpreader', payload)
      .then((resp) => {
        dispatch({data: resp, type: ACTIVE_SMART_SPREADER_SUCCESS})
      })
      .catch((error) => {
        dispatch({ snackMessage: error.response.data, type: TOGGLE_SNACKBAR })
      })
    }
  }