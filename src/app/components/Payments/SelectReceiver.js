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
    textAlign: 'center',
  }
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
                                    <h6>BankInfo : </h6>
                                    <Grid container>
                                        
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
                                    <h6>BankInfo : </h6>
                                    <Grid container>
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
                <Grid item xs={12} className={classes.marginLeft20}>
                        I Agree to make payment the above mentioned details.
                </Grid>
            </Grid>
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(SelectReceiver)
