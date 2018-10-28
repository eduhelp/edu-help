import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import { getFormatedDate } from '../Common/Utils'
import Dialog from '../Common/Dialog'
import UserDetails from '../Dashboard/UserDetails'
import PaymentDetails from '../Dashboard/PaymentDetails'
import LoadingHOC from '../Common/HOC/LoadingHOC'

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
};


export class MyDisputes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        selectedStatus: 'Open',
        displayList: [],
        dialogOpenStatus: false,
        dialogTitle: '',
        dialogContent: ''
    }
  }

  componentWillMount () {
    console.log('myDisputes - comp')
    console.log(this.props.myDisputes)
    const activeList = _.filter(this.props.myDisputes, (n) => { return (n.dispute_status == 'Open')})
    console.log('activeList')
    console.log(activeList)
    this.setState({displayList: activeList, selectedStatus: 'Open'})
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
  showDetailsPage = (disputeObj) => event => {
    this.props.detailsCB(disputeObj)
  }
  closeDialog = () => {
    this.setState({
      dialogOpenStatus: false,
      dialogTitle: '',
      dialogContent: ''
    })
}

  render() {
    const { classes, myDisputes, title } = this.props
    return (
      <div id="mainContainer">
        <Dialog
            dialogOpenStatus = {this.state.dialogOpenStatus}
            dialogTitle = {this.state.dialogTitle}
            dialogContent = {this.state.dialogContent}
            closeCB = {this.closeDialog}
        />

        <h4>{ title }</h4>
        {(myDisputes.length >= 1) ? (
            <div>
                <Paper className={classes.paperCenter}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Radio
                                        checked={this.state.selectedStatus === 'Open'}
                                        onChange={this.handleStatusChange}
                                        value='Open'
                                        name="radio-button-demo"
                                        aria-label="A"
                                    /> Open
                                </Grid>
                                <Grid item xs={3}>
                                    <Radio
                                        checked={this.state.selectedStatus === 'Closed'}
                                        onChange={this.handleStatusChange}
                                        value='Closed'
                                        name="radio-button-demo"
                                        aria-label="A"
                                    /> Closed
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
                {(this.state.selectedStatus && this.state.displayList.length > 0) ? (
                    <Paper className={classes.paper}>
                        <Grid item xs={12} className={classes.rowHead}>
                            <Grid container>
                                <Grid item xs={1}>
                                    Dispute Id
                                </Grid>
                                <Grid item xs={2}>
                                    Dispute Type
                                </Grid>
                                <Grid item xs={2}>
                                    Dispute From
                                </Grid>
                                <Grid item xs={2}>
                                    Dispute To
                                </Grid>
                                <Grid item xs={2}>
                                    Payment Id
                                </Grid>
                                <Grid item xs={1}>
                                    For level
                                </Grid>
                                <Grid item xs={1}>
                                    Status
                                </Grid>
                                <Grid item xs={1}>
                                    Added Date
                                </Grid>
                            </Grid>
                        </Grid>
                        {this.state.displayList.map((option, index) => {
                            return (
                                <Grid item xs={12} className={index % 2 ? classes.rowOdd : classes.rowEven} key={index}>
                                    <Grid container>
                                        <Grid item xs={1}>
                                            {option.dispute_id} - <span className={classes.navLink} onClick={this.showDetailsPage(option)}>Details</span>
                                        </Grid>
                                        <Grid item xs={2}>
                                            {option.dispute_type}
                                        </Grid>
                                        <Grid item xs={2}>
                                            <span className={classes.navLink} onClick={this.showUserDetails(option.disputeFromUserInfo)}>
                                                {option.disputeFromUserInfo.username} 
                                            </span>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <span className={classes.navLink} onClick={this.showUserDetails(option.disputeToUserInfo)}>
                                                {option.disputeToUserInfo.username}
                                            </span>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <span className={classes.navLink} onClick={this.showPaymentDetails(option.paymentInfo)}>
                                                {option.payment_id}
                                            </span>
                                        </Grid>
                                        <Grid item xs={1}>
                                            {option.paymentInfo.payment_level}
                                        </Grid>
                                        <Grid item xs={1}>
                                            {option.dispute_status}
                                        </Grid>
                                        <Grid item xs={1}>
                                            {getFormatedDate(option.added_date)}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Paper>
                ) : (
                    <Paper className={classes.paperCenter}>
                        You don't have any {this.state.selectedStatus} disputes
                    </Paper>
                )
                }
            </div>
        ) : (
            <Paper className={classes.paperCenter}>
                <Grid container>
                    <Grid item xs={12}>
                        You don't have any disputes
                    </Grid>
                </Grid>
            </Paper>
        )}
      </div>)
  }
}

export default LoadingHOC('myDisputes')(withStyles(styles)(MyDisputes))
