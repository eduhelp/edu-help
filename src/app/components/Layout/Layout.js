import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import MiniDrawer from './DrawerComponent'
import { userLogout, getAuthInfo } from '../../store/Registration/actionCreator'
import Snackbars from '../Common/Snackbars'
import { toggleSnackBar } from '../../store/Snackbar/actionCreator'
import Auth from '../Auth/Auth'
import { checkCookie, getCookie } from '../../components/Common/Utils'

const styles = theme => ({
  header: {
    height: 56,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      height: 48,
    },
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
  },
  contentContainer: {
    padding: theme.spacing.unit, // Default <Grid container> spacing is 16. Use 8px padding for bug in material-ui Grid. See https://github.com/callemall/material-ui/issues/7466#issuecomment-316356427
  },
  sideNavFooterList: {
    color: theme.typography.body1.color,
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: theme.typography.caption.fontSize,
    listStyle: 'none',
    margin: 0,
    padding: theme.spacing.unit * 1.5,
    '& li': {
      padding: theme.spacing.unit / 2,
    },
    '& a': {
      color: theme.typography.caption.color,
      textDecoration: 'none',
      transition: theme.transitions.create('color', {duration: theme.transitions.duration.shorter}),
      '&:hover': {
        color: theme.palette.primary[500],
      },
    },
  },
})

export class Layout extends React.Component {
  static defaultProps = {
    layoutActions: {},
    notificationActions: {},
  }

  componentWillMount() {
    const chCookie = checkCookie()
    if (this.props.authInfo.isAuth === false && chCookie === true) {
      const sendData = JSON.parse(window.localStorage.getItem('AuthInfo'))
      this.props.getAuthInfo(sendData)
    }
    
  }

  componentWillReceiveProps(nextProps) {
    const chCookie = checkCookie()
    if (!chCookie) {
      window.location.replace('/')
    } 
  }

  render () {
    return (
      <div>
        <Helmet
          defaultTitle="CGN International"
          titleTemplate="%s - CGN International"
        />
        <Snackbars
          variant={this.props.snackbarMessage.variant}
          message={this.props.snackbarMessage.message}
          openStatus={this.props.snackbarMessage.status}
          toggleSnackBar={this.props.toggleSnackBar}
        />
        <MiniDrawer 
          authInfo = {this.props.authInfo}
          userLogout = {this.props.userLogout}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    userLogout,
    toggleSnackBar,
    getAuthInfo,
  }, dispatch)

const mapStateToProps = state => ({
  authInfo: state.getIn(['RegistrationContainer', 'authInfo']).toJS(),
  snackbarMessage: state.getIn(['SnackbarContainer', 'snackbarMessage']).toJS(),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Layout))