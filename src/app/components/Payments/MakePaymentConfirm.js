import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
 
};


export class MakePaymentConfirm extends React.Component {
  constructor() {
    super()
    
  }
  

  render() {
    const { classes, paymentInfo, paymentEntryInfo } = this.props
    return (
      <div id="mainContainer">
        <Paper>
        <Grid container>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        Payment Level
                    </Grid>
                    <Grid item xs={6}>
                        {paymentInfo.payment_level}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        Payment From
                    </Grid>
                    <Grid item xs={6}>
                        {paymentInfo.from_id}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        Payment To
                    </Grid>
                    <Grid item xs={6}>
                        {paymentInfo.to_id}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        Payment Value
                    </Grid>
                    <Grid item xs={6}>
                        {paymentInfo.payment_value}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        Payment Mode
                    </Grid>
                    <Grid item xs={6}>
                        {paymentEntryInfo.payment_mode}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        From Bank
                    </Grid>
                    <Grid item xs={6}>
                        {paymentEntryInfo.from_bank}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        To Bank
                    </Grid>
                    <Grid item xs={6}>
                        {paymentEntryInfo.to_bank} 
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        Transaction Id
                    </Grid>
                    <Grid item xs={6}>
                        {paymentEntryInfo.transaction_id} 
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(MakePaymentConfirm)
