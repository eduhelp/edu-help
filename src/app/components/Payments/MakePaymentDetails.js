import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

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


export class MakePaymentDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      paymentEntryInfo: {
        payment_mode: '',
        from_bank: '',
        to_bank: '',
        transaction_id: ''
      }
    }
  }

  handleChange = (stName) => (event) => {
    this.setState({ paymentEntryInfo: { 
      ...this.state.paymentEntryInfo,
      [stName] : event.target.value
    }})
    setTimeout(()=> {
      this.props.submitCB(this.state.paymentEntryInfo)
    }, 100)
  }

  render() {
    const { classes, authInfo, makePaymentObj  } = this.props
    return (
      <div>
        <Paper className={classes.paper}>
        <Grid container>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        Payment Level
                    </Grid>
                    <Grid item xs={6}>
                        {makePaymentObj.payment_level}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        Payment From
                    </Grid>
                    <Grid item xs={6}>
                        {authInfo.data.username}({authInfo.data.data.user_id})
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        Payment To
                    </Grid>
                    <Grid item xs={6}>
                      {makePaymentObj.receiverInfo.username}({makePaymentObj.receiverInfo.user_id})
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        Payment Value
                    </Grid>
                    <Grid item xs={6}>
                        {makePaymentObj.payment_value}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        Payment Mode
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-with-placeholder"
                            label="Enter Payment mode"
                            placeholder="Placeholder"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={this.state.paymentEntryInfo.payment_mode}
                            onChange={this.handleChange('payment_mode')}
                        /> 
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        From Bank
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-with-placeholder"
                            label="Enter From Bank"
                            placeholder="Placeholder"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={this.state.paymentEntryInfo.from_bank}
                            onChange={this.handleChange('from_bank')}
                        /> 
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        To Bank
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-with-placeholder"
                            label="Enter To Bank"
                            placeholder="Placeholder"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={this.state.paymentEntryInfo.to_bank}
                            onChange={this.handleChange('to_bank')}
                        /> 
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        Transaction Id
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-with-placeholder"
                            label="Enter Transaction Id"
                            placeholder="Placeholder"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={this.state.paymentEntryInfo.transaction_id}
                            onChange={this.handleChange('transaction_id')}
                        /> 
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(MakePaymentDetails)
