import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  paper: {
    margin: 10,
    padding: 10,
  },
  rowOdd: {
    padding: 10,
    background: '#ebebeb',
  },
  rowEven: {
    padding: 10,
    background: '#fbfbfb',
  },
  textField: {
    margin: 0,
    width: 250,
  },
  btnRow: {
    textAlign: 'center',
    padding: 5,
    marginTop: 5,
  },
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
      },
      paymentEntryError: {
        payment_mode: {
          error: false,
          text: ''
        },
        from_bank: {
          error: false,
          text: ''
        },
        to_bank: {
          error: false,
          text: ''
        },
        transaction_id: {
          error: false,
          text: ''
        },
        transaction_date: {
          error: false,
          text: ''
        }
      }
    }
  }

  componentWillMount(){
    this.setState({ paymentEntryInfo: this.props.paymentEntryInfo })
  }

  setErrorState = (stname, err, msg) => {
    this.setState({ 
      paymentEntryError: {
        ...this.state.paymentEntryError,
        [stname]: {
          error: err,
          text: msg
        }
      }
     })
  }

  validateForm = () => {
    console.log('start validate')
    const paymentEntryInfo = this.state.paymentEntryInfo
    if(!paymentEntryInfo.payment_mode) {
      this.setErrorState('payment_mode', true, 'Payment Mode required')
      return false
    }
    if(!paymentEntryInfo.from_bank) {
      this.setErrorState('from_bank', true, 'From Bank required')
      return false
    }
    if(!paymentEntryInfo.to_bank) {
      this.setErrorState('to_bank', true, 'To Bank required')
      return false
    }
    if(!paymentEntryInfo.transaction_id) {
      this.setErrorState('transaction_id', true, 'Transaction ID required')
      return false
    }
    if(!paymentEntryInfo.transaction_date) {
      this.setErrorState('transaction_date', true, 'Transaction Date required')
      return false
    }
    return true
  }
  handleSubmit = event => {
    console.log('start submit')
    if (this.validateForm()) {
      console.log('no error')
      setTimeout(()=> {
        this.props.submitCB(this.state.paymentEntryInfo)
      }, 100)
    }
  }

  handleChange = (stName) => (event) => {
    this.setErrorState(stName, false, '')
    this.setState({ paymentEntryInfo: { 
      ...this.state.paymentEntryInfo,
      [stName] : event.target.value
    }})
  }

  render() {
    const { classes, authInfo, makePaymentObj  } = this.props
    const { paymentEntryInfo, paymentEntryError } = this.state
    return (
      <div>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={6}>
              <Grid container>
              <Grid item xs={12} className={classes.rowOdd}>
                <Grid container>
                    <Grid item xs={6}>
                        Payment Level
                    </Grid>
                    <Grid item xs={6}>
                        {makePaymentObj.payment_level}
                    </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.rowEven}>
                <Grid container>
                    <Grid item xs={6}>
                        Payment From
                    </Grid>
                    <Grid item xs={6}>
                        {authInfo.data.username}
                    </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.rowOdd}>
                <Grid container>
                    <Grid item xs={6}>
                        Payment To
                    </Grid>
                    <Grid item xs={6}>
                      {makePaymentObj.receiverInfo.username}
                    </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.rowEven}>
                <Grid container>
                    <Grid item xs={6}>
                        Payment Value
                    </Grid>
                    <Grid item xs={6}>
                        {makePaymentObj.payment_value}
                    </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.rowOdd}>
                <Grid container>
                    <Grid item xs={6}>
                        Payment Mode
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-with-placeholder"
                            label="Enter Payment mode"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={paymentEntryInfo.payment_mode}
                            onChange={this.handleChange('payment_mode')}
                            error={paymentEntryError.payment_mode.error}
                            helperText={paymentEntryError.payment_mode.text}
                        /> 
                    </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.rowEven}>
                <Grid container>
                    <Grid item xs={6}>
                        From Bank
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-with-placeholder"
                            label="Enter From Bank"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={paymentEntryInfo.from_bank}
                            onChange={this.handleChange('from_bank')}
                            error={paymentEntryError.from_bank.error}
                            helperText={paymentEntryError.from_bank.text}
                        /> 
                    </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.rowOdd}>
                <Grid container>
                    <Grid item xs={6}>
                        To Bank
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-with-placeholder"
                            label="Enter To Bank"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={paymentEntryInfo.to_bank}
                            onChange={this.handleChange('to_bank')}
                            error={paymentEntryError.to_bank.error}
                            helperText={paymentEntryError.to_bank.text}
                        /> 
                    </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.rowEven}>
                <Grid container>
                    <Grid item xs={6}>
                        Transaction Id
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-with-placeholder"
                            label="Enter Transaction Id"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={paymentEntryInfo.transaction_id}
                            onChange={this.handleChange('transaction_id')}
                            error={paymentEntryError.transaction_id.error}
                            helperText={paymentEntryError.transaction_id.text}
                        /> 
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.rowEven}>
                  <Grid container>
                    <Grid item xs={6}>
                        Transaction Date
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-with-placeholder"
                            type='date'
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={paymentEntryInfo.transaction_date}
                            onChange={this.handleChange('transaction_date')}
                            error={paymentEntryError.transaction_date.error}
                            helperText={paymentEntryError.transaction_date.text}
                        /> 
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.btnRow}>
                  <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleSubmit}
                      className={classes.button}
                  >
                      Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
            </Grid>
          </Grid>
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(MakePaymentDetails)
