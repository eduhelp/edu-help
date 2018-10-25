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
import { getUserStatus } from '../Common/Utils'
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
};


export class LevelStatus extends React.Component {
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
    const { classes } = this.props
    return (
      <div id="mainContainer">
        <Dialog
            dialogOpenStatus = {this.state.dialogOpenStatus}
            dialogTitle = {this.state.dialogTitle}
            dialogContent = {this.state.dialogContent}
            closeCB = {this.closeDialog}
        />
        <h4 className={classes.margin0}>Level Status</h4>
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
                {(this.state.selectedLevel && this.state.displayList.length > 0) ? (
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
                        {this.state.displayList.map((option, index) => {
                            return (
                                <Grid item xs={12} className={index % 2 ? classes.rowOdd : classes.rowEven}>
                                    <Grid container>
                                        <Grid item xs={1}>
                                            {this.state.selectedLevel}
                                        </Grid>
                                        <Grid item xs={3}>
                                            <span className={classes.navLink} onClick={this.showUserDetails(option.nodeInfo)}>
                                                {option.nodeInfo.username} 
                                            </span>
                                        </Grid>
                                        <Grid item xs={2}>
                                            {getUserStatus(option.nodeInfo.status, option.sponsorPayment.confirm_status)}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Grid>
                ) : (
                    <Grid item xs={12} className={classes.marginTop10}>
                    Select Level From Dropdown{this.state.selectedLevel}
                    </Grid>
                )
                }
            </Grid>
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(LevelStatus)
