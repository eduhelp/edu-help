import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getSmartSpreaders } from '../../store/Registration/actionCreator'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
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


export class SmartSpreader extends React.Component {
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
    var sendData = {
        payment_level: event.target.value
    }
    this.props.getSmartSpreaders(sendData)
    this.setState({ selectedLevel: event.target.value })
  }

  componentWillReceiveProps (nextProps) {
    const activeList = _.filter(nextProps.smartSpreadersList, (n) => { return n.current_status == 'Active'})
    this.setState({displayList: activeList})
  }

  handleStatusChange = event => {
    this.setState({ selectedStatus: event.target.value })
    if(event.target.value !== 'All') {
        const activeList = _.filter(this.props.smartSpreadersList, (n) => { return n.current_status == event.target.value})
        this.setState({displayList: activeList})
    } else {
        this.setState({displayList: this.props.smartSpreadersList})
    }
    
  }

  showUserDetails = (userInfo) => event => {
    this.setState({
        dialogOpenStatus: true,
        dialogTitle: "User Details",
        dialogContent: <UserDetails details={userInfo} />
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

        <h4>Smart Spreaders</h4>
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
                {this.state.displayList.length > 0 && 
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={4}>
                                <Radio
                                    checked={this.state.selectedStatus === 'Active'}
                                    onChange={this.handleStatusChange}
                                    value='Active'
                                    name="radio-button-demo"
                                    aria-label="A"
                                /> Active
                            </Grid>
                            <Grid item xs={4}>
                                <Radio
                                    checked={this.state.selectedStatus === 'Completed'}
                                    onChange={this.handleStatusChange}
                                    value='Completed'
                                    name="radio-button-demo"
                                    aria-label="A"
                                /> Completed
                            </Grid>
                            <Grid item xs={4}>
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
                }
            </Grid>
        </Paper>
        {(this.state.selectedLevel && this.state.displayList.length > 0) ? (
            <Paper className={classes.paper}>
                <Grid item xs={12} className={classes.rowHead}>
                    <Grid container>
                        <Grid item xs={1}>
                            ID
                        </Grid>
                        <Grid item xs={3}>
                            User Id
                        </Grid>
                        <Grid item xs={2}>
                            Status
                        </Grid>
                        <Grid item xs={2}>
                            Added Date
                        </Grid>
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
                        
                    </Grid>
                </Grid>
                {this.state.displayList.map((option, index) => {
                    return (
                        <Grid item xs={12} className={index % 2 ? classes.rowOdd : classes.rowEven}>
                            <Grid container>
                                <Grid item xs={1}>
                                    {option.spreader_id}
                                </Grid>
                                <Grid item xs={3}>
                                    <span className={classes.navLink} onClick={this.showUserDetails(option)}>
                                        {option.username} ({option.user_id})
                                    </span>
                                </Grid>
                                <Grid item xs={2}>
                                    {option.current_status}
                                </Grid>
                                <Grid item xs={2}>
                                    {getFormatedDate(option.added_date)}
                                </Grid>
                                <Grid item xs={2}>
                                    {getFormatedDate(option.completed_date)}
                                </Grid>
                                <Grid item xs={2}>
                                    <span className={classes.navLink} onClick={this.showPaymentDetails(option)}>
                                        {option.payment_id}
                                    </span>
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                })}
            </Paper>
        ) : (
            <Paper className={classes.paperCenter}>
                No Smart spreaders in level {this.state.selectedLevel}
            </Paper>
        )
        }
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getSmartSpreaders,
  }, dispatch)

const mapStateToProps = state => ({
    smartSpreadersList: state.getIn(['RegistrationContainer', 'smartSpreadersList']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SmartSpreader))
