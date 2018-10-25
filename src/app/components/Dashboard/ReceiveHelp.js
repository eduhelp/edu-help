import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getFormatedDate } from '../Common/Utils'
import Dialog from '../Common/Dialog'
import UserDetails from '../Dashboard/UserDetails'
import PaymentDetails from '../Dashboard/PaymentDetails'

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
  leftAlign: {
      textAlign: 'left',
  },
  col1: {
    background: '#2dd22a47',
    padding: 5,
  },
  col2: {
    background: '#2dd22a24',
    padding: 5,
},
};


export class ReceiveHelp extends React.Component {
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
    let activeList = ''
      if (event.target.value == '1') {
        activeList = this.props.myReferrals
      } else {
        activeList = _.filter(this.props.myTree, (n) => { return n.level == event.target.value})
      }
      console.log('activeList')
      console.log(activeList)
    this.setState({displayList: activeList, selectedLevel: event.target.value })
  }

  componentWillReceiveProps (nextProps) {
      console.log('myTree')
      console.log(nextProps.myTree)
      console.log('myReceivedList')
      console.log(nextProps.myReceivedList)
  }

  showUserDetails = (userInfo) => event => {
    this.setState({
        dialogOpenStatus: true,
        dialogTitle: "User Details",
        dialogContent: <UserDetails details={userInfo} mode='show' />
    })
  }
  getUserDetails = (user_id) => event => {
    this.setState({
        dialogOpenStatus: true,
        dialogTitle: "User Details",
        dialogContent: <UserDetails user_id={user_id} mode='get' />
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

openDispute = (paymentObject) => event => {
    console.log('receiver - payment obj')
    console.log(paymentObject)
    this.props.openDisputeCB('OpenDispute', paymentObject, 'Receiver')
  }

  viewDispute = (disputeObj) => event => {
    this.props.viewDisputeCB(disputeObj)
 }

  render() {
    const { classes, authInfo, levelPayments } = this.props
    const { selectedLevel, displayList } = this.state
    let  totalUsers, levelPaymentObj, maxReceivable, pendingPayment = 0, receivedPayment = 0, missedPayment = 0
    console.log(displayList)
    if(selectedLevel) {
        totalUsers = Math.pow(2, selectedLevel)
        levelPaymentObj = _.find(levelPayments, (n) => {return n.level_index == selectedLevel})
        maxReceivable = totalUsers * parseInt(levelPaymentObj.level_payment)
        displayList.map((option, idnex) => {
            if (selectedLevel == '1') {
                if (option.paymentInfo.confirm_status == 'Confirmed') {
                    receivedPayment += option.paymentInfo.payment_value
                } else if (option.paymentInfo.confirm_status == 'Pending') {
                    pendingPayment += option.paymentInfo.payment_value
                }
            } else {
                if(option.levelPayment) {
                    if(option.levelPayment.to_id !== authInfo.data.user_id) {
                        missedPayment += option.levelPayment.payment_value
                    } else {
                        if (option.levelPayment.confirm_status == 'Confirmed') {
                            receivedPayment += option.levelPayment.payment_value
                        } else if (option.levelPayment.confirm_status == 'Pending') {
                            pendingPayment += option.levelPayment.payment_value
                        }
                    }
                }
            }
        })
    }
    return (
      <div id="mainContainer">
        <Dialog
            dialogOpenStatus = {this.state.dialogOpenStatus}
            dialogTitle = {this.state.dialogTitle}
            dialogContent = {this.state.dialogContent}
            closeCB = {this.closeDialog}
        />
        <h4 className={classes.margin0}>Receive Help</h4>
        <Paper className={classes.paperCenter}>
             <Grid container>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple">Select Level</InputLabel>
                        <Select
                            value={this.state.selectedLevel}
                            onChange={this.handleLevelChange}
                        >
                            <MenuItem value='1'>
                                From Referrals
                            </MenuItem>
                            <MenuItem value='2'>
                                Level 2
                            </MenuItem>
                            <MenuItem value='3'>
                                Level 3
                            </MenuItem>
                            <MenuItem value='4'>
                                Level 4
                            </MenuItem>
                            <MenuItem value='5'>
                                Level 5
                            </MenuItem>
                            <MenuItem value='6'>
                                Level 6
                            </MenuItem>
                            <MenuItem value='7'>
                                Level 7
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {selectedLevel && 
                    <Grid container className={classes.marginTop10}>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={2} className={classes.col1}>
                                    Users : {displayList.length} / {totalUsers}
                                </Grid>
                                <Grid item xs={3} className={classes.col2}>
                                    level Payment : {levelPaymentObj.level_payment}
                                </Grid>
                                <Grid item xs={3} className={classes.col1}>
                                    Received: {receivedPayment} / {maxReceivable}
                                </Grid>
                                <Grid item xs={2} className={classes.col2}>
                                    Waiting: {pendingPayment}
                                </Grid>
                                <Grid item xs={2} className={classes.col1}>
                                    Missed : {missedPayment}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                }
                {(displayList.length > 0) ? (
                    <Grid container className={classes.marginTop10}>
                        <Grid item xs={12} className={classes.rowHead}>
                            <Grid container>
                                <Grid item xs={1}>
                                    Level
                                </Grid>
                                <Grid item xs={3}>
                                    User Name
                                </Grid>
                                <Grid item xs={8} className={classes.leftAlign}>
                                    Received Status
                                </Grid>
                            </Grid>
                        </Grid>
                        {displayList.map((option, index) => {
                            let paymentObj = ''
                            let userObj = ''
                            let missedInfo = false
                            if (selectedLevel == '1') {
                                paymentObj = option.paymentInfo
                                userObj = option
                            } else {
                                if(option.levelPayment) {
                                    if(option.levelPayment.to_id !== authInfo.data.user_id) {
                                        missedInfo = true
                                    } else {
                                        paymentObj = option.levelPayment
                                    }
                                }
                                userObj = option.nodeInfo
                            }
                            const receivePaymentLink = '/receive_payment/'+selectedLevel

                            let disputeObj = ''
                            if(paymentObj) {
                                disputeObj = _.find(this.props.myDisputes, (n) => { return (n.payment_id == paymentObj.payment_id) })
                            }

                            return (
                                <Grid item xs={12} className={index % 2 ? classes.rowOdd : classes.rowEven} key={index}>
                                    <Grid container>
                                        <Grid item xs={1}>
                                            {selectedLevel}
                                        </Grid>
                                        <Grid item xs={3}>
                                            <span className={classes.navLink} onClick={this.showUserDetails(userObj)}>
                                                {userObj.username} 
                                            </span>
                                        </Grid>
                                        <Grid item xs={8} className={classes.leftAlign}>
                                            {paymentObj ? (
                                                <div>
                                                    {paymentObj.confirm_status == 'Confirmed' && 
                                                        <div>Payment received and confirmed on {getFormatedDate(paymentObj.confirm_date)} | status : {paymentObj.confirm_status}</div>
                                                    }
                                                    {paymentObj.confirm_status == 'Pending' && 
                                                        <div>
                                                            <div>Payment paid on {getFormatedDate(paymentObj.paid_date)} | status : {paymentObj.confirm_status}</div>
                                                            <div><Link className={classes.navLink} to={receivePaymentLink}> Confirm Payment </Link></div>
                                                            {disputeObj ? (
                                                                <div className={classes.navLink} onClick={this.viewDispute(disputeObj)}>View Dispute</div>
                                                            ) : (
                                                                <div className={classes.navLink} onClick={this.openDispute(paymentObj)}>Open Dispute</div>
                                                            )}
                                                        </div>
                                                    }
                                                    <div className={classes.navLink} onClick={this.showPaymentDetails(paymentObj)}>Payment Details</div>
                                                </div>
                                            ) : (
                                                <div>
                                                    {missedInfo ? (
                                                        <span>
                                                            You missed this level-{this.state.selectedLevel} payment, payment received by smart spreader - 
                                                            <span onClick={this.getUserDetails(option.levelPayment.to_id)}>{option.levelPayment.to_id}</span>
                                                        </span>
                                                    ) : (
                                                        <span>Payment not done</span>
                                                    )} 
                                                </div>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Grid>
                ) : (
                    <Grid item xs={12} className={classes.marginTop10}>
                     Select Level From DropDown {this.state.selectedLevel}
                    </Grid>
                )
                }
            </Grid>
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(ReceiveHelp)
