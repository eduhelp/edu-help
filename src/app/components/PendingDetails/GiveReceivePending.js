import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getFormatedDate } from '../Common/Utils'
import LoadingHOC from '../Common/HOC/LoadingHOC'
import { Link } from 'react-router-dom'

const styles = {
    root: {
        display: 'flex',
        height: 300,
    },
    paper: {
        margin: 10,
        padding: 10,
    },
    marginLeft20: {
        marginLeft: 20,
    },
    textField: {
        width:250,
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
    notifyTitle: {
        fontSize: 18,
        fontWeight: 400,
    },
    msgRow: {
        fontSize: 14,
        padding: '10px 0px',
    },
 
};


export class GiveReceivePending extends React.Component {
  constructor(props) {
    super(props)
    
  }


  

  render() {
    const { classes, pendingDetails, title, helpText } = this.props
    return (
      <div id="mainContainer">
      <Paper className={classes.paper}>
        <h2> {title}  - Pending details </h2>
        {pendingDetails.length <= 0 ? (
            <Grid container>
                <Grid item xs={12}>
                    You don't have any pending list
                </Grid>
            </Grid>
        ) : (
            <Grid container>
                <Grid item xs={12} className={classes.rowHead}>
                    <Grid container>
                        <Grid item xs={1}>
                            Level
                        </Grid>
                        <Grid item xs={1}>
                            Status
                        </Grid>
                        <Grid item xs={2}>
                            {helpText}
                        </Grid>
                        <Grid item xs={2}>
                            Transaction Date
                        </Grid>
                        <Grid item xs={2}>
                            Paid Status
                        </Grid>
                        <Grid item xs={2}>
                            Payment For
                        </Grid>
                        <Grid item xs={2}>
                            Action
                        </Grid>
                    </Grid>
                </Grid>
                {pendingDetails.map((option, key) => {
                    const receivePaymentLink = '/receive_payment/'+option.payment_level
                    const giveHelpLink = '/dashboard/giveHelp'
                    const classKey = key % 2 == 0 ? classes.rowOdd : classes.rowEven
                    return (
                        <Grid item xs={12} className={classKey}>
                            <Grid container>
                                <Grid item xs={1}>
                                    {option.payment_level}
                                </Grid>
                                <Grid item xs={1}>
                                    {option.confirm_status}
                                </Grid>
                                <Grid item xs={2}>
                                    {option.disp_name}
                                </Grid>
                                <Grid item xs={2}>
                                    {getFormatedDate(option.transaction_date)}
                                </Grid>
                                <Grid item xs={2}>
                                    {option.paid_status}
                                </Grid>
                                <Grid item xs={2}>
                                    {option.receiver_type}
                                </Grid>
                                {title == 'Give Help' && 
                                    <Grid item xs={2}>
                                        {option.paid_status == 'Pending' && 
                                            <Link className={classes.navLink} to={giveHelpLink}> Enter Payment Transaction Details </Link>
                                        }
                                    </Grid>
                                }
                                {title == 'Receive Help' && 
                                    <Grid item xs={2}>
                                        {option.confirm_status == 'Pending' && 
                                            <Link className={classes.navLink} to={receivePaymentLink}> Confirm Payment </Link>
                                        }
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
        )}
    </Paper>
        
      </div>)
  }
}

export default LoadingHOC('pendingDetails')(withStyles(styles)(GiveReceivePending))
