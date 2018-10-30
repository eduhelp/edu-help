import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getUserStatus } from '../Common/Utils'
import Dialog from '../Common/Dialog'
import UserDetails from './UserDetails'
import PaymentDetails from './PaymentDetails'

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  paper: {
    padding: 10,
  },
  paperCenter: {
    padding: 10,
    textAlign: 'center',
  },
  marginLeft20: {
    marginLeft: 20,
  },
  marginTop10: {
    marginTop: 10,
  },
  rowHead: {
    padding: 10,
    background: '#333',
    color: '#fff'
  },
  rowOdd: {
    padding: 10,
    background: '#ebebeb',
  },
  rowEven: {
    padding: 10,
    background: '#fbfbfb',
  },
  formControl: {
      width: 250,
  },
  navLink: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};


export class MyReferrals extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        selectedLevel: '',
        selectedStatus: 'Active',
        displayList: [],
        dialogOpenStatus: false,
        dialogTitle: '',
        dialogContent: ''
    }
  }

  handleLevelChange = event =>  {
    const activeList = _.filter(this.props.myTree, (n) => { return n.level == event.target.value})
    this.setState({displayList: activeList, selectedLevel: event.target.value })
  }

  componentWillReceiveProps (nextProps) {
    const activeList = _.filter(nextProps.smartSpreadersList, (n) => { return n.current_status == 'Active'})
    this.setState({displayList: activeList,selectedStatus: 'Active'})
  }
 /*
  handleStatusChange = event => {
    this.setState({ selectedStatus: event.target.value })
    if(event.target.value !== 'All') {
        const activeList = _.filter(this.props.smartSpreadersList, (n) => { return n.current_status == event.target.value})
        this.setState({displayList: activeList})
    } else {
        this.setState({displayList: this.props.smartSpreadersList})
    }
    
  } */

  showUserDetails = (userInfo) => event => {
    this.setState({
        dialogOpenStatus: true,
        dialogTitle: "User Details",
        dialogContent: <UserDetails details={userInfo} mode='show' />
    })
  }
  showPaymentDetails = (paymentInfo) => event => {
    this.setState({
        dialogOpenStatus: true,
        dialogTitle: "Payment Details",
        dialogContent: <PaymentDetails details={paymentInfo} />
    })
  }
  closeDialog = () => {
    this.setState({
      dialogOpenStatus: false,
      dialogTitle: '',
      dialogContent: ''
    })
}

  render() {
    const { classes, myReferrals, myTree } = this.props
    let placedLevel = ''
    console.log(myTree)
    return (
      <div id="mainContainer">
        <Dialog
            dialogOpenStatus = {this.state.dialogOpenStatus}
            dialogTitle = {this.state.dialogTitle}
            dialogContent = {this.state.dialogContent}
            closeCB = {this.closeDialog}
        />
        <h4>My Referrals</h4>
        <Paper className={classes.paperCenter}>
             <Grid container>
                {(myReferrals.length > 0) ? (
                    <Grid container className={classes.marginTop10}>
                        <Grid item xs={12} className={classes.rowHead}>
                            <Grid container>
                                <Grid item xs={1}>
                                    Level
                                </Grid>
                                <Grid item xs={3}>
                                    User Name
                                </Grid>
                                <Grid item xs={2}>
                                    Status
                                </Grid>
                            </Grid>
                        </Grid>
                        {myReferrals.map((option, index) => {
                            console.log(option.user_id)
                            //placedLevel = _.find(myTree, (n) => { return n.user_id == option.user_id })
                            //placedLevel = 'test'
                            return (
                                <Grid item xs={12} className={index % 2 ? classes.rowOdd : classes.rowEven} key={index}>
                                    <Grid container>
                                        <Grid item xs={1}>
                                            {placedLevel ? (
                                                <span>{placedLevel.level}</span>
                                            ) : (
                                                <span>Placement not done</span>
                                            )}
                                            
                                        </Grid>
                                        <Grid item xs={3}>
                                            <span className={classes.navLink} onClick={this.showUserDetails(option)}>
                                                {option.username} 
                                            </span>
                                        </Grid>
                                        <Grid item xs={2}>
                                            {getUserStatus(option.status, option.paymentInfo.confirm_status)}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Grid>
                ) : (
                    <Grid item xs={12} className={classes.marginTop10}>
                        No Direct referrals
                    </Grid>
                )
                }
            </Grid>
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(MyReferrals)
