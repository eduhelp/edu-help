import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
};


export class UserStatus extends React.Component {
  constructor() {
    super()
    
  }
  

  render() {
    const { classes, authInfo, myPaymentList } = this.props
    let currentStatus = ''
    if (authInfo.data.status == 'Active') {
        currentStatus = 'Active'
    } else if (authInfo.data.status == 'Inactive') {
        const sponsor_payment = _.find(myPaymentList, (n) => {return n.payment_level == '1'})
        if(sponsor_payment && sponsor_payment.confirm_status == 'Pending') {
            currentStatus = 'Inactive - Receiver Confirmation Pending'
        } else {
            currentStatus = 'Inactive - Give Help Pending'
        }
    }
    const regLink = window.location.origin+"/registration?n="+authInfo.data.username
    return (
      <div id="mainContainer">
        <Grid item xs={12}>
            <h3> Account Status : {currentStatus} </h3>
            <h5> Refer Link : {regLink} </h5>
        </Grid>
      </div>)
  }
}

export default withStyles(styles)(UserStatus)
