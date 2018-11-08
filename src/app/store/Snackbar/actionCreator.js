import {
    TOGGLE_SNACKBAR,
    TOGGLE_LOADER,
  } from './actionType'
  
  export function toggleSnackBar (snackMessage) {
    return {
      type: TOGGLE_SNACKBAR,
      snackMessage,
    }
  }

  export function toggleLoader (loadStatus) {
    const loaderMsg = { status: loadStatus }
    return {
      type: TOGGLE_LOADER,
      loaderMsg,
    }
  }
  