import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { withStyles } from '@material-ui/core/styles'

import SnackbarContent from './SnackbarContent'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  snackbar: {
    zIndex: '1399 !important',
    top: 8,
    right: 8,
  },
})

class GrouperSnackbars extends React.Component {
    state = {
      open: false,
    };

    componentWillReceiveProps (nextProps) {
      this.setState({ open: nextProps.openStatus })
      if (nextProps.openStatus) {
        const _this = this
        setTimeout(function () {
          _this.props.toggleSnackBar({})
        }, 6000)
      }
    }

    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return
      }

      this.setState({ open: false })
    };

    render () {
      const { classes, variant, message } = this.props
      const dispMessage = (
        <span
          id="snackbar-message-id"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )
      return (
        <div>
          {message &&
          <Snackbar
            className={classes.snackbar}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <SnackbarContent
              onClose={this.handleClose}
              variant={variant}
              message={dispMessage}
            />
          </Snackbar>}
        </div>
      )
    }
}

export default withStyles(styles)(GrouperSnackbars)