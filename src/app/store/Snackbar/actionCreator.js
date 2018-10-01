import {
    TOGGLE_SNACKBAR,
  } from './actionType'
  
  export function toggleSnackBar (snackMessage) {
    return {
      type: TOGGLE_SNACKBAR,
      snackMessage,
    }
  }