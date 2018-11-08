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
import Radio from '@material-ui/core/Radio';
import { getFormatedDate, compareSSDate } from '../Common/Utils'
import Dialog from '../Common/Dialog'
import UserDetails from '../Dashboard/UserDetails'
import PaymentDetails from '../Dashboard/PaymentDetails'

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
  countText: {
    fontSize: '20',
    color: '#ff0000',
  },
};


export class MySmartSpreader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        selectedLevel: '2',
        selectedStatus: 'Active',
        displayList: [],
        dialogOpenStatus: false,
        dialogTitle: '',
        dialogContent: '',
        myLevel: '',
        totalCount: ''
    }
  }

  handleLevelChange = event =>  {
    const activeList = _.filter(this.props.mySmartSpreadersList, (n) => { return (n.current_status == 'Active' && n.payment_level == event.target.value)})
    const levelActiveObj = _.filter(this.props.allActiveSSList, (n) => { return (n.level == event.target.value )})
    const myLevel = _.findIndex(levelActiveObj[0].list, (n) => { return n.user_id == this.props.authInfo.data.user_id }) + 1
    const totalCount = levelActiveObj[0].list.length
    this.setState({displayList: activeList, selectedStatus: 'Active', selectedLevel: event.target.value, myLevel, totalCount })
  }

  componentWillMount () {
    let activeList = _.filter(this.props.mySmartSpreadersList, (n) => { return (n.payment_level == this.state.selectedLevel)})
    activeList = _.filter(activeList, (n) => { return (n.current_status == 'Active')})
    const levelActiveObj = _.filter(this.props.allActiveSSList, (n) => { return (n.level == this.state.selectedLevel)})
    const myLevel = _.findIndex(levelActiveObj[0].list, (n) => { return n.user_id == this.props.authInfo.data.user_id }) + 1
    const totalCount = levelActiveObj[0].list.length
    this.setState({displayList: activeList,selectedStatus: 'Active', myLevel, totalCount})

    console.log('this.props.maintenanceStatus >> ')
    console.log(this.props.maintenanceStatus)
  }

  handleStatusChange = event => {
    this.setState({ selectedStatus: event.target.value })
    if(event.target.value !== 'All') {
        const activeList = _.filter(this.props.mySmartSpreadersList, (n) => { return n.current_status == event.target.value && n.payment_level == this.state.selectedLevel})
        this.setState({displayList: activeList})
    } else {
        this.setState({displayList: this.props.mySmartSpreadersList})
    }
    
  }

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

openMaintenanceScreen = event => {
    this.setState({
        dialogOpenStatus: true,
        dialogTitle: this.props.maintenanceStatus.title,
        dialogContent: this.props.maintenanceStatus.message
    })
 }

 openDispute = (paymentObject) => event => {
    this.props.openDisputeCB('OpenDispute', paymentObject, 'Receiver')
  }

  viewDispute = (disputeObj) => event => {
    this.props.viewDisputeCB(disputeObj)
 }

 cancelTransaction = (paymentInfo) => event => {
    const sendData = {
        payment_id: paymentInfo.payment_id,
        user_id: this.props.authInfo.data.user_id,
        receiver_type: paymentInfo.receiver_type,
        payment_level: paymentInfo.payment_level,
        receiver_id: paymentInfo.to_id
    }
    this.props.cancelTransaction(sendData)
    window.location.replace('/dashboard')
}

  render() {
    const { classes, mySmartSpreadersList } = this.props
    return (
      <div id="mainContainer">
        <Dialog
            dialogOpenStatus = {this.state.dialogOpenStatus}
            dialogTitle = {this.state.dialogTitle}
            dialogContent = {this.state.dialogContent}
            closeCB = {this.closeDialog}
        />

        <h4>Smart Spreaders</h4>
        {(mySmartSpreadersList.length >= 1) ? (
            <div>
                <Paper className={classes.paperCenter}>
                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple">Select Level</InputLabel>
                                <Select
                                    value={this.state.selectedLevel}
                                    onChange={this.handleLevelChange}
                                >
                                    <MenuItem value='2'>
                                        Level 2 Queue
                                    </MenuItem>
                                    <MenuItem value='3'>
                                        Level 3 Queue
                                    </MenuItem>
                                    <MenuItem value='4'>
                                        Level 4 Queue
                                    </MenuItem>
                                    <MenuItem value='5'>
                                        Level 5 Queue
                                    </MenuItem>
                                    <MenuItem value='6'>
                                        Level 6 Queue
                                    </MenuItem>
                                    <MenuItem value='7'>
                                        Level 7 Queue
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <Radio
                                            checked={this.state.selectedStatus === 'Active'}
                                            onChange={this.handleStatusChange}
                                            value='Active'
                                            name="radio-button-demo"
                                            aria-label="A"
                                        /> Active
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Radio
                                            checked={this.state.selectedStatus === 'InProgress'}
                                            onChange={this.handleStatusChange}
                                            value='InProgress'
                                            name="radio-button-demo"
                                            aria-label="A"
                                        /> InProgress
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Radio
                                            checked={this.state.selectedStatus === 'Completed'}
                                            onChange={this.handleStatusChange}
                                            value='Completed'
                                            name="radio-button-demo"
                                            aria-label="A"
                                        /> Completed
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Radio
                                            checked={this.state.selectedStatus === 'All'}
                                            onChange={this.handleStatusChange}
                                            value='All'
                                            name="radio-button-demo"
                                            aria-label="A"
                                        /> All
                                    </Grid>
                                </Grid>
                            </Grid>
                    </Grid>
                </Paper>
                {(this.state.selectedLevel && this.state.displayList.length > 0) ? (
                    <Paper className={classes.paper}>
                        <Grid item xs={12} className={classes.rowHead}>
                            <Grid container>
                                <Grid item xs={2}>
                                    Level
                                </Grid>
                                <Grid item xs={2}>
                                    From User
                                </Grid>
                                <Grid item xs={2}>
                                    Status
                                </Grid>
                                {this.state.selectedStatus !== 'Active' &&
                                    <Grid item xs={2}>
                                        Receiver Confirm Date
                                    </Grid>
                                }
                                {this.state.selectedStatus !== 'Active' &&
                                    <Grid item xs={2}>
                                        Completed Date
                                    </Grid>
                                }
                                {this.state.selectedStatus !== 'Active' &&
                                    <Grid item xs={2}>
                                        Payment Id
                                    </Grid>
                                }
                                {this.state.selectedStatus == 'Active' &&
                                    <Grid item xs={4}>
                                        Running Status ( Your Position / Active List )
                                    </Grid>
                                }

                            </Grid>
                        </Grid>
                        {this.state.displayList.map((option, index) => {
                            let disputeObj = ''
                            let checkDate = ''
                            if(option.paymentInfo) {
                                disputeObj = _.find(this.props.myDisputes, (n) => { return (n.payment_id == option.paymentInfo.payment_id) })
                                if (option.paymentInfo.confirm_status == 'Initiated') {
                                    checkDate = compareSSDate(option.paymentInfo.receiver_confirm_date)
                                    console.log(checkDate)
                                }
                            }
                            const receivePaymentLink = '/receive_payment/'+option.payment_level
                            return (
                                <Grid item xs={12} className={index % 2 ? classes.rowOdd : classes.rowEven}>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            {option.payment_level}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {option.giverInfo &&
                                                <span className={classes.navLink} onClick={this.showUserDetails(option.giverInfo)}>
                                                    {option.giverInfo.username} 
                                                </span>
                                            }
                                        </Grid>
                                        <Grid item xs={2}>
                                            {option.current_status}
                                            {option.current_status == 'InProgress' && 
                                                <div>
                                                    {this.props.maintenanceStatus.status !== 'Active' ? (
                                                        <span className={classes.navLink} onClick={this.openMaintenanceScreen}> Confirm Payment </span>
                                                    ) : (
                                                        <div>
                                                            {option.paymentInfo.confirm_status == 'Initiated' ? (
                                                                <div>
                                                                <span> Payment Initiated </span>
                                                                {checkDate == 'greater' && (
                                                                    <div className={classes.navLink} onClick={this.cancelTransaction(option.paymentInfo)}>I like to reassign</div>
                                                                )}
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <Link className={classes.navLink} to={receivePaymentLink}> Confirm Payment </Link>
                                                                    {disputeObj ? (
                                                                        <div className={classes.navLink} onClick={this.viewDispute(disputeObj)}>View Dispute</div>
                                                                    ) : (
                                                                        <div>
                                                                            {this.props.maintenanceStatus.status !== 'Active' ? (
                                                                                <span className={classes.navLink} onClick={this.openMaintenanceScreen}> Open Dispute </span>
                                                                            ) : (
                                                                                <div className={classes.navLink} onClick={this.openDispute(option.paymentInfo)}>Open Dispute</div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                
                                                            )
                                                            }
                                                        </div>
                                                        
                                                    )}
                                                </div>
                                            }
                                        </Grid>
                                        {(option.paymentInfo && this.state.selectedStatus !== 'Active') &&
                                            <Grid item xs={2}>
                                                {getFormatedDate(option.paymentInfo.receiver_confirm_date)}
                                            </Grid>
                                        }
                                        {this.state.selectedStatus !== 'Active' &&
                                            <Grid item xs={2}>
                                                {getFormatedDate(option.completed_date)}
                                            </Grid>
                                        }
                                        {this.state.selectedStatus !== 'Active' &&
                                            <Grid item xs={2}>
                                                {option.paymentInfo && 
                                                    <span className={classes.navLink} onClick={this.showPaymentDetails(option.paymentInfo)}>
                                                        View Details
                                                    </span>
                                                }
                                            </Grid>
                                        }
                                        {this.state.selectedStatus == 'Active' &&
                                            <Grid item xs={4} className={classes.countText}>
                                                {this.state.myLevel} / {this.state.totalCount}
                                            </Grid>
                                        }
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Paper>
                ) : (
                    <Paper className={classes.paperCenter}>
                        You are not in level {this.state.selectedLevel} Queue
                    </Paper>
                )
                }
            </div>
        ) : (
            <Paper className={classes.paperCenter}>
                <Grid container>
                    <Grid item xs={12}>
                        Sorry ! You are not into any smart spreader queue, if you wish to become a smart spreader please do the following
                    </Grid>
                    <Grid item xs={12}>
                        You need to Refer 6 people.
                    </Grid>
                </Grid>
            </Paper>
        )}
      </div>)
  }
}

export default withStyles(styles)(MySmartSpreader)
