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
  rowHead: {
    padding: 10,
    background: '#ebebeb',
  },
  rowDetails: {
    padding: 10,
    background: '#fbfbfb',
  },
};


export class SelectReceiver extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        receiverInfo: '',
        selectedValue: '',
    }
  }
  
  componentWillReceiveProps(nextProps) {
      console.log('receiverInfo')
      console.log(nextProps.receiverInfo)
     this.setState({ 
        receiverInfo: nextProps.receiverInfo,
        selectedValue: nextProps.receiverInfo.receiver_id
     })
  }

  handleChange = (event) => {
      console.log('radio btn clicked >> '+event.target.value)
    this.setState({ selectedValue: event.target.value });
    const receiverType = this.props.receiverInfo.level_eligibility ? 'Root Parent' : 'Smart Spreader'
    console.log('receiverType >> '+receiverType)
    this.setState({ ...this.state.receiverInfo, receiver_id : event.target.value });
    /*this.setState({ 
      ...this.state.receiverInfo,
      receiver_id : "22",
      receiver_type: "test"
    })  */
    setTimeout(()=> {
        console.log('aftereeee')
        console.log(this.state.receiverInfo)
        console.log(this.state.selectedValue)
      this.props.submitCB(this.state.receiverInfo)
    }, 100)
  }

  render() {
    const { classes, smartSpreaderInfo, userDetails } = this.props
    return (
      <div id="mainContainer">
        <Paper className={classes.paper}>
            <Grid container>
                <Grid item xs={12} className={classes.marginLeft20}>
                {(this.props.receiverInfo.level_eligibility) ? (
                    <h3>Confirm to Select Level-{this.props.receiverInfo.payment_level} parent</h3>
                ) : (
                    <h3>Confirm to Select smart spreader</h3>
                )}
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                    {(this.props.receiverInfo.level_eligibility) ? (
                        <div>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid container className={classes.rowHead}>
                                        <Grid item xs={4}> User Info</Grid>
                                        <Grid item xs={4}> Bank Info</Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className={classes.rowDetails}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                        Name : {userDetails.username}
                                        <br />Mobile: {userDetails.mobile}
                                        </Grid>
                                        {userDetails.bank_details && 
                                        <Grid item xs={4}>
                                            Bank A/C Name: {userDetails.bank_details.bank_ac_name}
                                            <br />Bank Account No: {userDetails.bank_details.bank_ac_number}
                                            <br />Bank Name: {userDetails.bank_details.bank_name}
                                            <br />Branch Name: {userDetails.bank_details.bank_branch}
                                            <br />IFSC Code: {userDetails.bank_details.bank_ifsc_code}<br />
                                            <br />Paytm Wallet : {userDetails.bank_details.wallet_paytm_name} ({userDetails.bank_details.wallet_paytm_number})
                                            <br />Google Pay : {userDetails.bank_details.wallet_gp_name} ({userDetails.bank_details.wallet_gp_number})
                                        </Grid>
                                         }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    ) : (
                        <div>
                            <Grid container>
                                <Grid item xs={12}>
                                    As per your parent tree, your Level-{this.props.receiverInfo.payment_level} parent {userDetails.username} is not eleigible <br />
                                    to receive any payment from level-{this.props.receiverInfo.payment_level}, you can wait till {userDetails.username} is get eleigible
                                    <br /><br />OR<br /><br />
                                    You can pay to the smart spreader (information given below), to make process faster.
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container className={classes.rowHead}>
                                        <Grid item xs={4}> User Info</Grid>
                                        <Grid item xs={4}> Bank Info</Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className={classes.rowDetails}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            Name : {smartSpreaderInfo.username}
                                            <br />Mobile: {smartSpreaderInfo.mobile}
                                        </Grid>
                                        {smartSpreaderInfo.bank_details && 
                                        <Grid item xs={4}>
                                            Bank A/C Name: {smartSpreaderInfo.bank_details.bank_ac_name}
                                            <br />Bank Account No: {smartSpreaderInfo.bank_details.bank_ac_number}
                                            <br />Bank Name: {smartSpreaderInfo.bank_details.bank_name}
                                            <br />Branch Name: {smartSpreaderInfo.bank_details.bank_branch}
                                            <br />IFSC Code: {smartSpreaderInfo.bank_details.bank_ifsc_code}
                                            <br />Paytm Wallet : {smartSpreaderInfo.bank_details.wallet_paytm_name} ({smartSpreaderInfo.bank_details.wallet_paytm_number})
                                            <br />Google Pay : {smartSpreaderInfo.bank_details.wallet_gp_name} ({smartSpreaderInfo.bank_details.wallet_gp_number})
                                        </Grid>
                                         }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                        I Agree to make payment the above mentioned details.
                </Grid>
            </Grid>
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(SelectReceiver)
