import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dialog from '../Common/Dialog'
import UserDetails from './UserDetails'
import PaymentDetails from './PaymentDetails'
import OpenDispute from '../Disputes/OpenDispute'
import BankDetails from './BankDetails'

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


export class GiveHelp extends React.Component {
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


  confirmReceiver = (levelIndex, treeParentId, levelEligibility, treeParentInfo) => event => {
    this.props.confirmReceiverCB('ConfirmReceiver',levelIndex, treeParentId, levelEligibility, treeParentInfo)
   }

   makePayment = (paymentObject) => event => {
    this.props.makePaymentCB('MakePayment', paymentObject)
  }

  openDispute = (paymentObject) => event => {
    this.props.openDisputeCB('OpenDispute', paymentObject, 'Giver')
  }

  viewDispute = (disputeObj) => event => {
      this.props.viewDisputeCB(disputeObj)
  }

  showUserDetails = (userInfo) => event => {
    this.setState({
        dialogOpenStatus: true,
        dialogTitle: "User Details",
        dialogContent: <UserDetails details={userInfo} mode='show' />
    })
  }
  showBankDetails = (username, receiverInfo) => event => {
    this.setState({
        dialogOpenStatus: true,
        dialogTitle: username+"'s Bank Details",
        dialogContent: <BankDetails details={receiverInfo.bank_details} />
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
    const { classes, myPaymentList, myTree, authInfo } = this.props
    const level1SponsorObject = _.find(myPaymentList, (n) => { return (n.payment_level == 1) })
    let nextLevelCheck = true
    let receivedCheck = false
    let level1DisputeObj = ''
    if(level1SponsorObject) {
        level1DisputeObj = _.find(this.props.myDisputes, (n) => { return (n.payment_id == level1SponsorObject.payment_id) })
    }
    return (
      <div id="mainContainer">
        <Dialog
            dialogOpenStatus = {this.state.dialogOpenStatus}
            dialogTitle = {this.state.dialogTitle}
            dialogContent = {this.state.dialogContent}
            closeCB = {this.closeDialog}
        />
        <h4 className={classes.margin0}>Give Help</h4>
        {authInfo.data.bank_details ? (
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid container className={classes.marginTop10}>
                        <Grid item xs={12} className={classes.rowHead}>
                            <Grid container>
                                <Grid item xs={3}>
                                    Level
                                </Grid>
                                <Grid item xs={3}>
                                    Parent User Name
                                </Grid>
                                <Grid item xs={3}>
                                    Payment to
                                </Grid>
                                <Grid item xs={3}>
                                    Status
                                </Grid>
                            </Grid>
                        </Grid>
                        {level1SponsorObject && 
                        <Grid item xs={12} className={classes.rowOdd}>
                            <Grid container>
                                <Grid item xs={3}>
                                    to sponsor
                                </Grid>
                                <Grid item xs={3}>
                                    <span className={classes.navLink} onClick={this.showUserDetails(level1SponsorObject.receiverInfo)}>
                                        {level1SponsorObject.receiverInfo.username} 
                                    </span>
                                </Grid>
                                <Grid item xs={3}>
                                    {(level1SponsorObject.receiverInfo.bank_details && 
                                        <div>
                                            <div>mobile: {level1SponsorObject.receiverInfo.mobile}</div>
                                            <span className={classes.navLink} onClick={this.showBankDetails(level1SponsorObject.receiverInfo.username,level1SponsorObject.receiverInfo)}>Bank Details</span>
                                        </div>
                                    )}
                                </Grid>
                                <Grid item xs={3}>
                                    {(level1SponsorObject.paid_status == 'Completed' && level1SponsorObject.confirm_status == 'Pending') ? (
                                        <div>
                                            <div>Payment Done and Waiting to receiver confirmation</div>
                                            <div className={classes.navLink} onClick={this.showPaymentDetails(level1SponsorObject)}>Payment Details</div>
                                            {level1DisputeObj ? (
                                                <div className={classes.navLink} onClick={this.viewDispute(level1DisputeObj)}>View Dispute</div>
                                            ) : (
                                                <div className={classes.navLink} onClick={this.openDispute(level1SponsorObject)}>Open Dispute</div>
                                            )}
                                        </div>
                                    ) : (level1SponsorObject.paid_status == 'Completed' && level1SponsorObject.confirm_status == 'Confirmed') ? (
                                        <div>
                                            <div>Payment Done and receiver confirmed</div>
                                            <div className={classes.navLink} onClick={this.showPaymentDetails(level1SponsorObject)}>Payment Details</div>
                                        </div>
                                    ) : (level1SponsorObject.paid_status == 'Pending') ? (
                                        <span className={classes.navLink} onClick={this.makePayment(level1SponsorObject)}>Make Payment</span>
                                    ) : (
                                        <span>Issue with payment, contact admin</span>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                        }
                        {this.props.myTopLevel.map((option, key) => {
                            receivedCheck = false
                            const curPaymentObject = _.find(this.props.myPaymentList, (n) => { return (n.payment_level == option.level) })
                            if(option.level >= 4) {
                                const checkLevel = option.level - 2
                                const curReceivedObject = _.find(this.props.myReceivedList, (n) => { return (n.payment_level >= checkLevel && n.confirm_status == 'Confirmed' && n.receiver_type == 'RootParent') })
                                if(curReceivedObject) {
                                    receivedCheck = true
                                }
                            } else {
                                if(option.level == '3') {
                                    const mySponsorPaymentObj = _.find(this.props.myPaymentList, (n) => { return (n.payment_level == '1') })
                                    // const level2PaymentObj = _.find(this.props.myPaymentList, (n) => { return (n.payment_level == '2') })
                                    // const l3curReceivedObject = _.find(this.props.myReceivedList, (n) => { return (n.payment_level == '1' && n.confirm_status == 'Confirmed') })
                                    // if(mySponsorPaymentObj && level2PaymentObj && l3curReceivedObject) {
                                    if(mySponsorPaymentObj) {
                                        receivedCheck = true
                                    }
                                } else {
                                    receivedCheck = true
                                }
                            }
                            let disputeObj = ''
                            if(curPaymentObject) {
                                disputeObj = _.find(this.props.myDisputes, (n) => { return (n.payment_id == curPaymentObject.payment_id) })
                            }
                            
                            if(option.level > 1 && nextLevelCheck && receivedCheck)  {
                                if(!curPaymentObject && nextLevelCheck && option.level >= 3) {
                                    nextLevelCheck = false
                                }
                                if(nextLevelCheck) {
                                    const curfirstObject = _.find(this.props.myPaymentList, (n) => { return (n.payment_level == '1') })
                                    if(!curfirstObject) {
                                        nextLevelCheck = false
                                    }
                                }
                                const levText = 'level '+option.level
                                return (
                                    <Grid container className={classes.dataRowEven} className={key % 2 ? classes.rowEven : classes.rowOdd} key={key}>
                                        <Grid item xs={3}>
                                            {levText}
                                        </Grid>
                                        <Grid item xs={3}>
                                            <span className={classes.navLink} onClick={this.showUserDetails(option.nodeInfo)}>
                                                {option.nodeInfo.username} 
                                            </span>
                                        </Grid>
                                        <Grid item xs={3}>
                                            {(curPaymentObject && 
                                                <div>
                                                    <div>{curPaymentObject.receiver_name} / {curPaymentObject.receiver_type}</div>
                                                    <div>mobile: {curPaymentObject.receiverInfo.mobile}</div>
                                                    <span className={classes.navLink} onClick={this.showBankDetails(curPaymentObject.receiver_name, curPaymentObject.receiverInfo)}>Bank Details</span>
                                                </div>
                                            )}
                                        </Grid>
                                        <Grid item xs={3}>
                                            {(curPaymentObject) ? (
                                                <div>
                                                    {(curPaymentObject.paid_status == 'Completed' && curPaymentObject.confirm_status == 'Pending') ? (
                                                        <div>
                                                            <div>Payment Done and Waiting to receiver confirmation</div>
                                                            <div className={classes.navLink} onClick={this.showPaymentDetails(curPaymentObject)}>Payment Details</div>
                                                            {disputeObj ? (
                                                                <div className={classes.navLink} onClick={this.viewDispute(disputeObj)}>View Dispute</div>
                                                            ) : (
                                                                <div className={classes.navLink} onClick={this.openDispute(curPaymentObject)}>Open Dispute</div>
                                                            )}
                                                            
                                                        </div>
                                                    ) : (curPaymentObject.paid_status == 'Completed' && curPaymentObject.confirm_status == 'Confirmed') ? (
                                                        <div>
                                                            <div>Payment Done and receiver confirmed</div>
                                                            <div className={classes.navLink} onClick={this.showPaymentDetails(curPaymentObject)}>Payment Details</div>
                                                        </div>
                                                    ) : (curPaymentObject.paid_status == 'Pending') ? (
                                                        <span className={classes.navLink} onClick={this.makePayment(curPaymentObject)}>Enter Payment Transaction Details</span>
                                                    ) : (
                                                        <span>Issue with payment, contact admin</span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className={classes.navLink} onClick={this.confirmReceiver(option.level, option.nodeInfo.user_id, option.levelEligibility, option.nodeInfo)}>View & Confirm Receiver Details</span>
                                            )
                                            }
                                        </Grid>
                                    </Grid>
                                )
                            }
                        })
                        }
                    </Grid>
                </Grid>
            </Paper>
        ) : (
            <Paper className={classes.paperCenter}>
                Pleae add your <Link className={classes.navLink} to='/profile/bank' >bank details</Link>, before giving help to any level.
            </Paper>
        )}
      </div>)
  }
}

export default withStyles(styles)(GiveHelp)
