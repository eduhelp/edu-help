import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getFormatedDate } from '../Common/Utils'

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  rowHead: {
    padding: 5,
    background: '#ebebeb',
  },
  rowDetails: {
    padding: 5,
    background: '#fbfbfb',
  },
};


export class PaymentDetails extends React.Component {
  constructor() {
    super()
    
  }
  
  componentWillMount() {
    console.log('this.props.details')
    console.log(this.props.details)
  }

  render() {
    const { classes, details } = this.props
    return (
      <div id="mainContainer">
        <Grid container>
            <Grid item xs={12} className={classes.rowHead}>
                <Grid container>
                    <Grid item xs={6}>
                        From Username  To Username
                    </Grid>
                    <Grid item xs={6}>
                        {details.giver_name} -> {details.receiver_name}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowDetails}>
                <Grid container>
                    <Grid item xs={6}>
                        level / value
                    </Grid>
                    <Grid item xs={6}>
                        {details.payment_level} / {details.payment_value}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowHead}>
                <Grid container>
                    <Grid item xs={6}>
                        Payment Mdoe
                    </Grid>
                    <Grid item xs={6}>
                        {details.payment_mode}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowDetails}>
                <Grid container>
                    <Grid item xs={6}>
                        From Bank -> To Bank 
                    </Grid>
                    <Grid item xs={6}>
                        {details.from_bank} -> {details.to_bank}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowHead}>
                <Grid container>
                    <Grid item xs={6}>
                        Transaction Id / date
                    </Grid>
                    <Grid item xs={6}>
                        {details.transaction_id} / {getFormatedDate(details.transaction_date)}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowDetails}>
                <Grid container>
                    <Grid item xs={6}>
                        Receiver Type
                    </Grid>
                    <Grid item xs={6}>
                        {details.receiver_type}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowHead}>
                <Grid container>
                    <Grid item xs={6}>
                        Confirm Status
                    </Grid>
                    <Grid item xs={6}>
                        {details.confirm_status}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>)
  }
}

export default withStyles(styles)(PaymentDetails)
