import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dialog from '../Common/Dialog'
import UserDetails from '../Dashboard/UserDetails'
import PaymentDetails from '../Dashboard/PaymentDetails'
import Button from '@material-ui/core/Button';
import { getDisputePhotos, getDisputeComments, cancelTransaction } from '../../store/Disputes/actionCreator'
import { getFormatedDate } from '../Common/Utils'
import { confirmLevelPayment } from '../../store/Payments/actionCreator'
import AddScreenshot from './AddScreenshot'
import AddComment from './AddComment'

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  paper: {
    margin: 10,
    padding: 10,
  },
  paperCenter: {
    margin: 10,
    padding: 10,
    textAlign: 'center',
  },
  marginLeft20: {
    marginLeft: 20,
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
  photoRow: {
      padding: 5,
  },
  button: {
      margin: 5,
  },
};


export class DisputeDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        selectedStatus: 'Open',
        displayList: [],
        dialogOpenStatus: false,
        dialogTitle: '',
        dialogContent: '',
        listPhotos: [],
    }
  }

  componentWillMount () {
    this.loadDetails()
  }

  loadDetails = () => {
    const sendData = {
        dispute_id : this.props.disputeObj.dispute_id
    }
    this.props.getDisputePhotos(sendData)
    this.props.getDisputeComments(sendData)
  }


  componentWillReceiveProps (nextProps) {
      if(nextProps.disputePhotos) {
        this.setState({listPhotos: nextProps.disputePhotos})
      }
        
  }

  handleStatusChange = event => {
    this.setState({ selectedStatus: event.target.value })
    if(event.target.value !== 'All') {
        const activeList = _.filter(this.props.myDisputes, (n) => { return n.dispute_status == event.target.value})
        this.setState({displayList: activeList})
    } else {
        this.setState({displayList: this.props.myDisputes})
    }
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
    this.loadDetails()
    this.setState({
      dialogOpenStatus: false,
      dialogTitle: '',
      dialogContent: ''
    })
}

    addScreenShot = event => {
        this.setState({
            dialogOpenStatus: true,
            dialogTitle: "Add Screenshots",
            dialogContent: <AddScreenshot disputeObj={this.props.disputeObj} authInfo={this.props.authInfo} closeCB = {this.closeDialog} />
        })
    } 
    addDisputeComment = event => {
        this.setState({
            dialogOpenStatus: true,
            dialogTitle: "Add Dispute Comment",
            dialogContent: <AddComment disputeObj={this.props.disputeObj} authInfo={this.props.authInfo} closeCB = {this.closeDialog} />
        })
    } 

    cancelTransaction = event => {
        const sendData = {
            payment_id: this.props.disputeObj.payment_id,
            dispute_id: this.props.disputeObj.dispute_id,
            user_id: this.props.authInfo.data.user_id,
            receiver_type: this.props.disputeObj.paymentInfo.receiver_type,
            payment_level: this.props.disputeObj.paymentInfo.payment_level,
            receiver_id: this.props.disputeObj.paymentInfo.to_id
        }
        this.props.cancelTransaction(sendData)
        window.location.replace('/dashboard')
    }

    confirmTransaction = event => {
        const sendData = {
            payment_id: this.props.disputeObj.payment_id,
            to_id: this.props.disputeObj.paymentInfo.to_id,
            receiver_type: this.props.disputeObj.paymentInfo.receiver_type,
            user_id: this.props.disputeObj.paymentInfo.from_id,
            sponsor_id: this.props.disputeObj.paymentInfo.to_id,
            payment_level: this.props.disputeObj.paymentInfo.payment_level,
            confirmed_by: 'Admin'
          }
          this.props.confirmLevelPayment(sendData)
          window.location.replace('/dashboard')
    }

  render() {
    const { classes, disputeObj, disputeComments, authInfo } = this.props
    return (
      <div id="mainContainer">
        <Dialog
            dialogOpenStatus = {this.state.dialogOpenStatus}
            dialogTitle = {this.state.dialogTitle}
            dialogContent = {this.state.dialogContent}
            closeCB = {this.closeDialog}
        />

        <h4>My Disputes</h4>
        {(disputeObj) ? (
            <div>
                <Paper className={classes.paperCenter}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={3}>
                                    Dispute ID : {disputeObj.dispute_id}
                                </Grid>
                                <Grid item xs={3}>
                                    Dispute Type : {disputeObj.dispute_type}
                                </Grid>
                                <Grid item xs={3}>
                                    Dispute from > to : {disputeObj.disputeFromUserInfo.username} / {disputeObj.disputeToUserInfo.username}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Grid container>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <Grid item xs={12}>
                                <Grid item xs={12} className={classes.rowOdd}>
                                    initial message: {disputeObj.message}
                                </Grid>
                                {disputeComments.map((option, index) => {
                                    let addedBy = ''
                                    if (option.added_by == '1') {
                                        addedBy = 'admin'
                                    } else if(disputeObj.disputeFromUserInfo.user_id == option.added_by) {
                                        addedBy = disputeObj.disputeFromUserInfo.username
                                    } else if(disputeObj.disputeToUserInfo.user_id == option.added_by) {
                                        addedBy = disputeObj.disputeToUserInfo.username
                                    } 
                                    return (
                                        <Grid item xs={12} className={(index % 2 ? classes.rowOdd : classes.rowEven)}>
                                            {option.message} <br/>
                                            - {addedBy}
                                        </Grid>
                                    )
                                })
                                }
                                {disputeObj.dispute_status == 'Open' && 
                                    <Grid item xs={12} className={classes.photoRow}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={this.addDisputeComment}
                                            className={classes.button}
                                            >
                                            Add Comment
                                        </Button>
                                    </Grid>
                                }
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            {this.state.listPhotos.map((option, index) => {
                                const url = `screenshots/${option.file_name}`
                                return (
                                    <Grid container className={(index % 2 ? classes.rowOdd : classes.rowEven)}>
                                        <Grid item xs={4}>
                                            <img src={url} width="150" alt="images" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            added by {option.added_by} on {getFormatedDate(option.added_date)}
                                        </Grid>
                                    </Grid>
                                )
                            })}
                            {disputeObj.dispute_status == 'Open' && 
                                <Grid item xs={12} className={classes.photoRow}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={this.addScreenShot}
                                        className={classes.button}
                                        >
                                        Add Screenshot
                                    </Button>
                                </Grid>
                            }
                        </Paper>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.props.cancelCB}
                    className={classes.button}
                    >
                    Back to details page
                </Button>
                {(authInfo.data.user_id == '1' && disputeObj.dispute_status == 'Open') && 
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.cancelTransaction}
                        className={classes.button}
                        >
                        Cancel Transaction
                    </Button>
                }
                {(authInfo.data.user_id == '1' && disputeObj.dispute_status == 'Open') && 
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.confirmTransaction}
                        className={classes.button}
                        >
                        Confirm Transaction
                    </Button>
                }
            </div>
        ) : (
            <Paper className={classes.paperCenter}>
                <Grid container>
                    <Grid item xs={12}>
                        Invlalid Dispute object, please contact admin
                    </Grid>
                </Grid>
            </Paper>
        )}
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getDisputePhotos,
    getDisputeComments,
    cancelTransaction,
    confirmLevelPayment,
  }, dispatch)

const mapStateToProps = state => ({
    disputePhotos: state.getIn(['DisputesContainer', 'disputePhotos']).toJS(),
    disputeComments: state.getIn(['DisputesContainer', 'disputeComments']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisputeDetails))
