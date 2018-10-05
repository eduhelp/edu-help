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
  }
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
      console.log('receiverInfo')
      console.log(nextProps.receiverInfo)
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
                                    <h6>BankInfo : </h6>
                                    <Grid container>
                                        <Grid item xs={6}>
                                        <Radio
                                            checked={this.state.selectedValue === userDetails.user_id}
                                            onChange={this.handleChange}
                                            value={userDetails.user_id}
                                            name="radio-button-demo"
                                            aria-label="A"
                                        />
                                        </Grid>
                                        <Grid item xs={6}>
                                        Name : {userDetails.username}
                                        <br />User Id : {userDetails.user_id}
                                        <br />Mobile: {userDetails.mobile}
                                        <br />Payment Mode: 
                                        <br />Account No:
                                        </Grid>
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
                                    <h6>BankInfo : </h6>
                                    <Grid container>
                                        <Grid item xs={6}>
                                        <Radio
                                            checked={this.state.selectedValue === smartSpreaderInfo.user_id}
                                            onChange={this.handleChange}
                                            value={smartSpreaderInfo.user_id}
                                            name="radio-button-demo"
                                            aria-label="A"
                                        />
                                        </Grid>
                                        <Grid item xs={6}>
                                            Name : {smartSpreaderInfo.username}
                                            <br />User Id : {smartSpreaderInfo.user_id}
                                            <br />Mobile: {smartSpreaderInfo.mobile}
                                            <br />Payment Mode: 
                                            <br />Account No:
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </Grid>
            </Grid>
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(FindReceiver)
