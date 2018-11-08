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
    padding: 10,
  },
};


export class UserStatus extends React.Component {
  constructor() {
    super()
    
  }
  

  render() {
    const { classes, authInfo, myPaymentList } = this.props
    let currentStatus = ''
    if (authInfo.data.status == 'Inactive') {
      const sponsor_payment = _.find(myPaymentList, (n) => {return n.payment_level == '1'})
      if(sponsor_payment && sponsor_payment.confirm_status == 'Pending') {
          currentStatus = 'Inactive - Receiver Confirmation Pending'
      } else {
          currentStatus = 'Inactive - Give Help Pending'
      }
    } else {
      currentStatus = authInfo.data.status
    }
    const regLink = "https://"+window.location.host+"/registration?n="+authInfo.data.username
    return (
      <div id="mainContainer">
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={6}>
                <h3> Account Status : {currentStatus} </h3>
                {currentStatus == 'Active' && 
                  <h5> Refer Link : <a href={regLink} target='_blank'>{regLink}</a> </h5>
                }
            </Grid>
            <Grid item xs={6}>
              <h3> Give Level Status : {authInfo.data.give_level_status} </h3>
              <h3> Receive Level Status : {authInfo.data.receive_level_status} </h3>
            </Grid>
          </Grid>
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(UserStatus)
