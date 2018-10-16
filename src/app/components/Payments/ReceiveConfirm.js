import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  detailRow: {
      margin: 10,
  },
  Paper: {
      maring: 10,
  },
};


export class ReceiveConfirm extends React.Component {
  constructor() {
    super()
    
  }
  

  render() {
    const { classes, paymentInfo, confirmPendingList } = this.props
    const pay_info = _.find(confirmPendingList,(o) => o.payment_id === paymentInfo.payment_id)
    return (
      <div id="mainContainer">
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12} className={classes.marginLeft20}>
              <h3>Payment Received Confirm </h3>
            </Grid>
            <Grid item xs={12} className={classes.marginLeft20}>
                <div className={classes.detailRow}>
                    Payment ID : {pay_info.payment_id}
                </div>
                <div className={classes.detailRow}>
                    Payment from : {pay_info.from_id}
                </div>
                <div className={classes.detailRow}>
                    Payment Level : {pay_info.payment_level}
                </div>
                <div className={classes.detailRow}>
                    Payment Mode: {pay_info.payment_mode}
                </div>
                <div className={classes.detailRow}>
                    Transaction Id : {pay_info.transaction_id}
                </div>
                <div className={classes.detailRow}>
                    From Bank : {pay_info.from_bank}
                </div>
                <div className={classes.detailRow}>
                    To Bank : {pay_info.to_bank}
                </div>
            </Grid>
            <Grid item xs={12} className={classes.marginLeft20}>
              <h5>I verified the above transaction ID and I confirm the same.</h5>
            </Grid>
          </Grid>
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(ReceiveConfirm)
