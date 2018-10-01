import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

const styles = {
  list: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },
  drawerBlock: {
    width: 300,
    padding: 20,
    outline: 'none',
  },
}

class SwipeableTemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  componentWillReceiveProps (nextProps) {
    this.setState({
      right: nextProps.openStatus,
    })
  }

  toggleDrawer = (side, openStatus) => () => {
    this.setState({
      [side]: openStatus,
    })
    this.props.closeCallback()
  };

  render () {
    const { classes } = this.props

    return (
      <div>
        <SwipeableDrawer
          anchor={this.props.drawerPosition}
          open={this.state.right}
          swipeAreaWidth={0}
          onClose={this.toggleDrawer('right', false)}
          onOpen={this.toggleDrawer('right', true)}
        >
          <div
            tabIndex={0}
            role="button"
            className={classes.drawerBlock}
          >
            {this.props.drawerContent}
          </div>
        </SwipeableDrawer>
      </div>
    )
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SwipeableTemporaryDrawer)