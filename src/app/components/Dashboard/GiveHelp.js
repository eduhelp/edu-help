import React from 'react'
import _ from 'lodash'
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
    console.log('calling confirmReceiver')
    this.props.confirmReceiverCB('ConfirmReceiver',levelIndex, treeParentId, levelEligibility, treeParentInfo)
   }

   makePayment = (paymentObject) => event => {
    console.log('ready to make payemnt to ')
    console.log(paymentObject)
    this.props.makePaymentCB('MakePayment', paymentObject)
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
  openDispute = (paymentInfo) => event => {
    this.setState({
        dialogOpenStatus: true,
        dialogTitle: "Open Dispute",
        dialogContent: <OpenDispute details={paymentInfo} authInfo={this.props.authInfo} />
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
    const { classes, myPaymentList, myTree } = this.props
    const level1SponsorObject = _.find(myPaymentList, (n) => { return (n.payment_level == 1) })
    let nextLevelCheck = true
    let receivedCheck = false
    return (
      <div id="mainContainer">
        <Dialog
            dialogOpenStatus = {this.state.dialogOpenStatus}
            dialogTitle = {this.state.dialogTitle}
            dialogContent = {this.state.dialogContent}
            closeCB = {this.closeDialog}
        />
        <h4 className={classes.margin0}>Give Help</h4>
        <Paper className={classes.paper}>
             <Grid container>
                <Grid container className={classes.marginTop10}>
                    <Grid item xs={12} className={classes.rowHead}>
                        <Grid container>
                            <Grid item xs={3}>
                                Level
                            </Grid>
                            <Grid item xs={3}>
                                Parent (User ID)
                            </Grid>
                            <Grid item xs={3}>
                                Bank Details
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
                                <span className={classes.navLink} onClick={this.showUserDetails(this.props.sponsorDetails)}>
                                    {this.props.sponsorDetails.username} ({this.props.sponsorDetails.user_id})
                                </span>
                            </Grid>
                            <Grid item xs={3}>
                                {(level1SponsorObject.receiverInfo.bank_details && 
                                    <span className={classes.navLink} onClick={this.showBankDetails(this.props.sponsorDetails.username,level1SponsorObject.receiverInfo)}>Bank Details</span>
                                )}
                            </Grid>
                            <Grid item xs={3}>
                                {(level1SponsorObject.paid_status == 'Completed' && level1SponsorObject.confirm_status == 'Pending') ? (
                                    <div>
                                        <div>Payment Done and Waiting to receiver confirmation</div>
                                        <div className={classes.navLink} onClick={this.showPaymentDetails(level1SponsorObject)}>Payment Details</div>
                                        <div className={classes.navLink} onClick={this.createDispute(level1SponsorObject)}>Create Dispute</div>
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
                        if(option.level >= 3) {
                            const checkLevel = option.level - 2
                            const curReceivedObject = _.find(this.props.myReceivedList, (n) => { return (n.payment_level == checkLevel && n.confirm_status == 'Confirmed') })
                            if(curReceivedObject) {
                                receivedCheck = true
                            }
                        } else {
                            receivedCheck = true
                        }
                        if(option.level > 1 && nextLevelCheck && receivedCheck)  {
                            /*if(!curPaymentObject && nextLevelCheck) {
                                nextLevelCheck = false
                            }*/
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
                                            {option.nodeInfo.username} ({option.nodeInfo.user_id})
                                        </span>
                                    </Grid>
                                    <Grid item xs={3}>
                                        {(option.nodeInfo.bank_details && 
                                            <span className={classes.navLink} onClick={this.showBankDetails(option.nodeInfo.username,option.nodeInfo)}>Bank Details</span>
                                        )}
                                    </Grid>
                                    <Grid item xs={3}>
                                        {(curPaymentObject) ? (
                                            <div>
                                                {(curPaymentObject.paid_status == 'Completed' && curPaymentObject.confirm_status == 'Pending') ? (
                                                    <div>
                                                        <div>Payment Done and Waiting to receiver confirmation</div>
                                                        <div className={classes.navLink} onClick={this.showPaymentDetails(curPaymentObject)}>Payment Details</div>
                                                        <div className={classes.navLink} onClick={this.openDispute(curPaymentObject)}>Open Dispute</div>
                                                    </div>
                                                ) : (curPaymentObject.paid_status == 'Completed' && curPaymentObject.confirm_status == 'Confirmed') ? (
                                                    <div>
                                                        <div>Payment Done and receiver confirmed</div>
                                                        <div className={classes.navLink} onClick={this.showPaymentDetails(curPaymentObject)}>Payment Details</div>
                                                    </div>
                                                ) : (curPaymentObject.paid_status == 'Pending') ? (
                                                    <span className={classes.navLink} onClick={this.makePayment(curPaymentObject)}>Make Payment</span>
                                                ) : (
                                                    <span>Issue with payment, contact admin</span>
                                                )}
                                            </div>
                                        ) : (
                                            <span className={classes.navLink} onClick={this.confirmReceiver(option.level, option.nodeInfo.user_id, option.levelEligibility, option.nodeInfo)}>Confirm Receiver</span>
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
      </div>)
  }
}

export default withStyles(styles)(GiveHelp)
