import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MailFolderListItems from './MenuData'
import { Route, Switch } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Home from '../Home/Home'
import Registration from '../Registration/Registration'
import Dashboard from '../Dashboard/Dashboard'
import ConfirmReceiver from '../Payments/ConfirmReceiver'
import MakePayment from '../Payments/MakePayment'
import ReceivePayment from '../Payments/ReceivePayment'
import Profile from '../Profile/Profile'
import MyTree from '../Placements/MyTree'
import Faq from '../Placements/Faq'
import Button from '@material-ui/core/Button';
import { Dialog } from '@material-ui/core';
import Notification from '@material-ui/icons/NotificationsNone'
import Login from './Login'
import SideDrawer from '../Common/SideDrawer'
import SmartSpreader from '../SmartSpreader/SmartSpreader';
import Disputes from '../Disputes/Disputes'
import AboutPlan from '../Placements/AboutPlan'
// import NotFound from '../NotFoundPage/NotFoundPage'
// import { ReactComponent as Logo } from '../../images/logo.svg'
import Main from './Picture1.png';


const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#f5f5f5',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    borderRight: '0px',
    background: '#333',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    height: '100%',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
    height: '100%',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  logo: {
    height: 26,
    margin: '0 18px 0 -12px',
  },
  sideNavIcon: {
    color: '#fff',
    '&:hover': {
      background: '#1967d2',
    },
  },
  navText: {
    color: '#fff',
  },
  menuHover: {
    '&:hover': {
      background: '#1967d2',
    },
  },
  divider: {
    background: '#666',
  },
  listPadding: {
    padding: 0,
  },
  companyTitle: {
    color: '#000',
    fontSize: 28,
    fontFamily: 'sans-serif',
  },
  userInfo: {
      position: 'absolute',
      right: 10,
  },
  userNameDisp: {
      color: '#000',
  },
})

class MiniDrawer extends React.Component {
  state = {
    open: false,
    drawerOpenStatus: false,
  };
  componentWillReceiveProps() {
      if (!this.props.authInfo.isAuth) {
        this.setState({ drawerOpenStatus: false })
      }
  }
  handleDrawerOpen = () => {
    this.setState({ open: true })
  };

  handleDrawerClose = () => {
    this.setState({ open: false })
  };

  openDrawer = () => {
    this.setState({ drawerOpenStatus: true })
  }

  closeDrawer = () => {
    this.setState({ drawerOpenStatus: false })
  }

  confirmLogout = () => {
       this.props.userLogout()
  }
  registerNow = () => {
    const regLink = window.location.origin+"/registration?n="+window.localStorage.getItem('regSponsorId')
    window.location.href = regLink
  }

  render () {
    const { classes, theme, authInfo } = this.props
    const { isAuth, data } = authInfo
    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton

              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
            
              <MenuIcon />

            </IconButton>
            <div className={classes.companyTitle}>Edu Help</div>

            <div className={classes.userInfo}>
                {(isAuth) ? (
                    <div className={classes.userNameDisp}> 
                        Welcome {data.username} 
                        <Button color="black" className={classes.companyTitle} >
                        <Notification/>
                        </Button> 
                        <Button color="primary" className={classes.button} onClick={this.confirmLogout}>
                             Logout
                        </Button>
                    </div>
                ) : (
                  <div className={classes.userNameDisp}> 
                    {window.localStorage.getItem('regSponsorId') && 
                      <Button color="primary" className={classes.button} onClick={this.registerNow}>
                        Register
                    </Button>
                    }
                    <Button color="primary" className={classes.button} onClick={this.openDrawer}>
                        Login
                    </Button>
                  </div>
                    
                )}
            </div>
            <SideDrawer
              drawerPosition="right"
              drawerContent={<Login closeDrawer={this.closeDrawer} />}
              openStatus={this.state.drawerOpenStatus}
              closeCallback={this.closeDrawer}
            />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose} className={classes.sideNavIcon}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider className={classes.divider} />
          <List className={classes.listPadding}>
            <MailFolderListItems
              color={classes.navText}
              bg={classes.menuHover}
              authInfo={this.props.authInfo}
            />
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.contentContainer}>
            <Grid container>
              <Grid item xs={12}>
                {/* routes */}
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about_plan" component={AboutPlan} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/confirm_receiver/:levelIndex/:paymentTo" component={ConfirmReceiver} />
                    <Route path="/make_payment/:levelIndex/:paymentTo" component={MakePayment} />
                    <Route path="/receive_payment/:levelIndex" component={ReceivePayment} />
                    <Route path="/my_tree" component={MyTree} />
                    <Route path="/faq" component={Faq} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/smart_spreaders' component={SmartSpreader} />
                    <Route path='/disputes' component={Disputes} />
                </Switch>
              </Grid>
            </Grid>
          </div>
        </main>
      </div>
    )
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(MiniDrawer)