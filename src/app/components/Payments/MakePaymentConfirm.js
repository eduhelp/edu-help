import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  paper: {
    margin: 10,
    padding: 10,
  },
  rowOdd: {
    padding: 10,
    background: '#ebebeb',
  },
  rowEven: {
    padding: 10,
    background: '#fbfbfb',
  }
};


export class MakePaymentConfirm extends React.Component {
  constructor() {
    super()
    
  }
  

  render() {
    const { classes, authInfo, makePaymentObj, paymentEntryInfo } = this.props
    return (
      <div id="mainContainer">
        <Paper className={classes.paper}>
            <Grid container>
                <Grid item xs={6}>
                    <Grid container>
                        <Grid item xs={12} className={classes.rowOdd}>
                            <Grid container>
                                <Grid item xs={6}>
                                    Payment Level
                                </Grid>
                                <Grid item xs={6}>
                                    {makePaymentObj.payment_level}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.rowEven}>
                            <Grid container>
                                <Grid item xs={6}>
                                    Payment From
                                </Grid>
                                <Grid item xs={6}>
                                {authInfo.data.username}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.rowOdd}>
                            <Grid container>
                                <Grid item xs={6}>
                                    Payment To
                                </Grid>
                                <Grid item xs={6}>
                                {makePaymentObj.receiverInfo.username}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.rowEven}>
                            <Grid container>
                                <Grid item xs={6}>
                                    Payment Value
                                </Grid>
                                <Grid item xs={6}>
                                    {makePaymentObj.payment_value}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.rowOdd}>
                            <Grid container>
                                <Grid item xs={6}>
                                    Payment Mode
                                </Grid>
                                <Grid item xs={6}>
                                    {paymentEntryInfo.payment_mode}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.rowEven}>
                            <Grid container>
                                <Grid item xs={6}>
                                    From Bank
                                </Grid>
                                <Grid item xs={6}>
                                    {paymentEntryInfo.from_bank}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.rowOdd}>
                            <Grid container>
                                <Grid item xs={6}>
                                    To Bank
                                </Grid>
                                <Grid item xs={6}>
                                    {paymentEntryInfo.to_bank} 
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.rowEven}>
                            <Grid container>
                                <Grid item xs={6}>
                                    Transaction Id
                                </Grid>
                                <Grid item xs={6}>
                                    {paymentEntryInfo.transaction_id} 
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.rowOdd}>
                            <Grid container>
                                <Grid item xs={6}>
                                    Transaction Date
                                </Grid>
                                <Grid item xs={6}>
                                    {paymentEntryInfo.transaction_date} 
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                </Grid>
            </Grid>
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(MakePaymentConfirm)
