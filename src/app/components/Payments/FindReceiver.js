import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  paper: {
    margin: 10,
    padding: 10,
    textAlign: 'center',
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


export class FindReceiver extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        receiverInfo: '',
        selectedValue: '',
    }
  }
  
  componentWillReceiveProps(nextProps) {
     this.setState({ 
        receiverInfo: nextProps.receiverInfo,
        selectedValue: nextProps.receiverInfo.receiver_id
     })
  }

  render() {
    const { classes, smartSpreaderInfo, userDetails } = this.props
    return (
      <div id="mainContainer">
        <Paper className={classes.paper}>
            <Grid container>
                <Grid item xs={12} className={classes.marginLeft20}>
                {(this.props.receiverInfo.level_eligibility) ? (
                    <h3>Select Level-{this.props.receiverInfo.payment_level} parent</h3>
                ) : (
                    <h3>Select smart spreader</h3>
                )}
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                    {(this.props.receiverInfo.level_eligibility) ? (
                        <div>
                            <Grid container>
                                <Grid item xs={12}>
                                    As per your parent tree, your Level-{this.props.receiverInfo.payment_level} parent information given below,<br />
                                    please make the Rs-{this.props.receiverInfo.payment_value} and confirm the same. <br />
                                    please click on the 'Next' button to proceed.
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container className={classes.rowHead}>
                                        <Grid item xs={2}> Select </Grid>
                                        <Grid item xs={4}> User Info</Grid>
                                        <Grid item xs={4}> Bank Info</Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className={classes.rowDetails}>
                                    <Grid container>
                                        <Grid item xs={2}>
                                        <Radio
                                            checked={this.state.selectedValue === userDetails.user_id}
                                            onChange={this.handleChange}
                                            value={userDetails.user_id}
                                            name="radio-button-demo"
                                            aria-label="A"
                                        />
                                        </Grid>
                                        <Grid item xs={4}>
                                        Name : {userDetails.username}
                                        <br />User Id : {userDetails.user_id}
                                        <br />Mobile: {userDetails.mobile}
                                        </Grid>
                                        {userDetails.bank_details && 
                                        <Grid item xs={4}>
                                            Bank A/C Name: {userDetails.bank_details.bank_ac_name}
                                            <br />Bank Account No: {userDetails.bank_details.bank_ac_number}
                                            <br />Bank Account No: {userDetails.bank_details.bank_ac_number}
                                            <br />Bank Name: {userDetails.bank_details.bank_ac_number}
                                            <br />Branch Name: {userDetails.bank_details.bank_ac_number}
                                            <br />IFSC Code: {userDetails.bank_details.bank_ac_number}<br />
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
                            {smartSpreaderInfo[0].message === 'no smart spreader' ? (
                                <div>
                                    As per your parent tree, your Level-{this.props.receiverInfo.payment_level} parent {userDetails.username} is not eleigible <br />
                                    to receive any payment from level-{this.props.receiverInfo.payment_level}, you can wait till {userDetails.username} is get eleigible
                                    <br /><br />OR<br /><br />
                                    And the is no Active smart spreader, please try after some time.
                                </div>
                            ) : (
                                <Grid container>
                                    <Grid item xs={12}>
                                        As per your parent tree, your Level-{this.props.receiverInfo.payment_level} parent {userDetails.username} is not eleigible <br />
                                        to receive any payment from level-{this.props.receiverInfo.payment_level}, you can wait till {userDetails.username} is get eleigible
                                        <br /><br />OR<br /><br />
                                        You can pay to the smart spreader (information given below), to make process faster.
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container className={classes.rowHead}>
                                            <Grid item xs={2}> Select </Grid>
                                            <Grid item xs={4}> User Info</Grid>
                                            <Grid item xs={4}> Bank Info</Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} className={classes.rowDetails}>
                                        <Grid container>
                                            <Grid item xs={2}>
                                            <Radio
                                                checked={this.state.selectedValue === smartSpreaderInfo.user_id}
                                                onChange={this.handleChange}
                                                value={smartSpreaderInfo.user_id}
                                                name="radio-button-demo"
                                                aria-label="A"
                                            />
                                            </Grid>
                                            <Grid item xs={4}>
                                                Name : {smartSpreaderInfo.username}
                                                <br />User Id : {smartSpreaderInfo.user_id}
                                                <br />Mobile: {smartSpreaderInfo.mobile}
                                            </Grid>
                                            {smartSpreaderInfo.bank_details && 
                                            <Grid item xs={4}>
                                                Bank A/C Name: {smartSpreaderInfo.bank_details.bank_ac_name}
                                                <br />Bank Account No: {smartSpreaderInfo.bank_details.bank_ac_number}
                                                <br />Bank Account No: {smartSpreaderInfo.bank_details.bank_ac_number}
                                                <br />Bank Name: {smartSpreaderInfo.bank_details.bank_ac_number}
                                                <br />Branch Name: {smartSpreaderInfo.bank_details.bank_ac_number}
                                                <br />IFSC Code: {smartSpreaderInfo.bank_details.bank_ac_number}<br />
                                                <br />Paytm Wallet : {smartSpreaderInfo.bank_details.wallet_paytm_name} ({smartSpreaderInfo.bank_details.wallet_paytm_number})
                                                <br />Google Pay : {smartSpreaderInfo.bank_details.wallet_gp_name} ({smartSpreaderInfo.bank_details.wallet_gp_number})
                                            </Grid>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                            }
                        </div>
                    )}
                </Grid>
            </Grid>
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(FindReceiver)
