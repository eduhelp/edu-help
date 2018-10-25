import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { updatePaymentInfo } from '../../store/Registration/actionCreator'

const styles = {
    root: {
        display: 'flex',
        height: 300,
      },
      paper: {
        margin: '10px 0px',
        padding: '10px',
      },
      marginLeft20: {
        marginLeft: 20,
      },
      textField: {
        width:200,
      },
      btnRow: {
          textAlign: 'center',
          padding: 5,
          marginTop: 5,
      },
       formControl: {
      width: 250,
  },
 
};


export class PaymentInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        bank_ac_name: '',
        bank_ac_number: '',
        bank_name: '',
        bank_branch: '',
        bank_ifsc_code: '',
        account_type: 'Savings',
        wallet_paytm_number: '',
        wallet_gp_number: '',
        bankInfoError: {
            bank_ac_name: {
              error: false,
              text: ''
            },
            bank_ac_number: {
              error: false,
              text: ''
            },
            confirm_bank_ac_number: {
                error: false,
                text: '' 
            },
            bank_name: {
              error: false,
              text: ''
            },
            bank_branch: {
              error: false,
              text: ''
            },
            bank_ifsc_code: {
              error: false,
              text: ''
            },
            account_type: {
              error: false,
              text: ''
            }
          }
    }
  }

    componentWillMount(){
        const authInfo = this.props.authInfo 
        if (authInfo.bank_details) {
            const bank_details = authInfo.bank_details
            this.setState({ 
                bank_ac_name: bank_details.bank_ac_name,
                bank_ac_number: bank_details.bank_ac_number,
                confirm_bank_ac_number: bank_details.bank_ac_number,
                bank_name: bank_details.bank_name,
                bank_branch: bank_details.bank_branch,
                account_type: bank_details.account_type,
                bank_ifsc_code: bank_details.bank_ifsc_code,
                wallet_paytm_number: bank_details.wallet_paytm_number,
                wallet_gp_number: bank_details.wallet_gp_number,
                wallet_paytm_name: bank_details.wallet_paytm_name,
                wallet_gp_name: bank_details.wallet_gp_name
            })
        } else {
            /*this.setState({ 
                wallet_paytm_number: authInfo.mobile,
                wallet_gp_number: authInfo.mobile,
                wallet_paytm_name: authInfo.username,
                wallet_gp_name: authInfo.username
            }) */
        }
        
    }

    handleChange = (stName) => (event) => {
        this.setErrorState(stName, false, '')
        this.setState({ 
            [stName] : event.target.value
        })
    }

    handleBlurChange = (stName) => event => {
        const enteredValue = event.target.value
      
        if(stName == 'bank_ac_name') {
          if(!enteredValue) {
            this.setErrorState('bank_ac_name', true, 'Account Name required')
          }
        }

        if(stName == 'bank_name') {
            if(!enteredValue) {
              this.setErrorState('bank_name', true, 'Bank Name required')
            }
        }

        if(stName == 'bank_ac_number') {
            if(!enteredValue) {
              this.setErrorState('bank_ac_number', true, 'Account Number required')
            }
        }

        if(stName == 'confirm_bank_ac_number') {
            if(enteredValue !== this.state.bank_ac_number) {
              this.setErrorState('confirm_bank_ac_number', true, "did't match with account number")
            }
        }

        if(stName == 'bank_ifsc_code') {
            if(!enteredValue) {
              this.setErrorState('bank_ifsc_code', true, 'IFSC Code required')
            }
        }

    }

    validateForm = () => {
        if(!this.state.bank_ac_name) {
            this.setErrorState('bank_ac_name', true, 'Account Name required')
            return false
        }
  
        if(!this.state.bank_ac_name) {
            this.setErrorState('bank_name', true, 'Bank Name required')
            return false
        }
  
        if(!this.state.bank_ac_name) {
            this.setState('bank_ac_number', true, 'Account Number required')
            return false
        }
  
        if(this.state.confirm_bank_ac_number !== this.state.bank_ac_number) {
            this.setErrorState('confirm_bank_ac_number', true, "did't match with account number")
            return false
        }
  
        if(!this.state.bank_ifsc_code) {
            this.setErrorState('bank_ifsc_code', true, 'IFSC Code required')
            return false
        }
        return true
    }

    setErrorState = (stname, err, msg) => {
        this.setState({ 
            bankInfoError: {
            ...this.state.bankInfoError,
            [stname]: {
              error: err,
              text: msg
            }
          }
         })
      }

    handleUpdate = event => {
        if(this.validateForm()) {
            const mode = (this.props.authInfo.bank_details) ? 'update' : 'add'
            const sendData = {
                mode: mode,
                user_id: this.props.authInfo.user_id,
                bank_ac_name: this.state.bank_ac_name,
                bank_ac_number: this.state.bank_ac_number,
                bank_name: this.state.bank_name,
                bank_branch: this.state.bank_branch,
                account_type: this.state.account_type,
                bank_ifsc_code: this.state.bank_ifsc_code,
                wallet_paytm_number: this.state.wallet_paytm_number,
                wallet_gp_number: this.state.wallet_gp_number,
                wallet_paytm_name: this.state.wallet_paytm_name,
                wallet_gp_name: this.state.wallet_gp_name
            }
            this.props.updatePaymentInfo(sendData)
        }
    }

  render() {
    const { classes, authInfo } = this.props
    const { bankInfoError } = this.state
    return (
      <div id="mainContainer">
        <Paper className={classes.paper}>
        <Grid item xs={12} className={classes.marginLeft20}>
            <h3>Bank Info</h3>
        </Grid>
        <Grid item xs={12} className={classes.marginLeft20}>
          <Grid container>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12} className={classes.marginLeft20}>
                    <TextField
                        id="outlined-with-placeholder"
                        label="Bank Account Name"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={this.state.bank_ac_name}
                        onChange={this.handleChange('bank_ac_name')}
                        onBlur={this.handleBlurChange('bank_ac_name')}
                        error={bankInfoError.bank_ac_name.error}
                        helperText={bankInfoError.bank_ac_name.text}
                    /> 
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                    <TextField
                        id="outlined-with-placeholder"
                        label="Bank Account Number"
                        className={classes.textField}
                        type='password'
                        margin="normal"
                        variant="outlined"
                        value={this.state.bank_ac_number}
                        onChange={this.handleChange('bank_ac_number')}
                        onBlur={this.handleBlurChange('bank_ac_number')}
                        error={bankInfoError.bank_ac_number.error}
                        helperText={bankInfoError.bank_ac_number.text}
                    /> 
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                    <TextField
                            id="outlined-with-placeholder"
                            label="IFSC CODE"
                            placeholder="Placeholder"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={this.state.bank_ifsc_code}
                            onChange={this.handleChange('bank_ifsc_code')}
                            onBlur={this.handleBlurChange('bank_ifsc_code')}
                            error={bankInfoError.bank_ifsc_code.error}
                            helperText={bankInfoError.bank_ifsc_code.text}
                        /> 
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                 <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-Account-type">Select Account Type</InputLabel>
                        <Select
                            value={this.state.account_type}
                            onChange={this.handleChange('account_type')}
                            onBlur={this.handleBlurChange('account_type')}
                        >
                            <MenuItem value='Current'>
                             Current
                            </MenuItem>
                            <MenuItem value='Savings'>
                            Savings
                            </MenuItem>
                           
                        </Select>
                    </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
            <Grid container>
                <Grid item xs={12} className={classes.marginLeft20}>
                    <TextField
                        id="bank_name"
                        label="Bank Name"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={this.state.bank_name}
                        onChange={this.handleChange('bank_name')}
                        onBlur={this.handleBlurChange('bank_name')}
                        error={bankInfoError.bank_name.error}
                        helperText={bankInfoError.bank_name.text}
                    /> 
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                    <TextField
                        id="outlined-with-placeholder"
                        label="Confirm Account Number"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={this.state.confirm_bank_ac_number}
                        onChange={this.handleChange('confirm_bank_ac_number')}
                        onBlur={this.handleBlurChange('confirm_bank_ac_number')}
                        error={bankInfoError.confirm_bank_ac_number.error}
                        helperText={bankInfoError.confirm_bank_ac_number.text}
                    />
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                    <TextField
                        id="outlined-with-placeholder"
                        label="Branch Name"
                        placeholder="Placeholder"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={this.state.bank_branch}
                        onChange={this.handleChange('bank_branch')}
                        onBlur={this.handleBlurChange('bank_branch')}
                        error={bankInfoError.bank_branch.error}
                        helperText={bankInfoError.bank_branch.text}
                    /> 
                </Grid>
                
              </Grid>
            </Grid>
          </Grid>
          </Grid>
          <Grid item xs={12} className={classes.marginLeft20}>
            <h3>Wallet Info</h3>
            </Grid>
            <Grid item xs={12} className={classes.marginLeft20}>
          <Grid container>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12} className={classes.marginLeft20}>
                    <TextField
                        id="outlined-with-placeholder"
                        label="PAYTM Mobile Number"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={this.state.wallet_paytm_number}
                        onChange={this.handleChange('wallet_paytm_number')}
                    /> 
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                        <TextField
                            id="outlined-with-placeholder"
                            label="Google Pay(TEZ) Number"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={this.state.wallet_gp_number}
                            onChange={this.handleChange('wallet_gp_number')}
                        />  
                </Grid>

              </Grid>
            </Grid>
            <Grid item xs={6}>
            <Grid container>
                <Grid item xs={12} className={classes.marginLeft20}>
                    <TextField
                        id="outlined-with-placeholder"
                        label="PAYTM Account Name"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={this.state.wallet_paytm_name}
                        onChange={this.handleChange('wallet_paytm_name')}
                    />
                    
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                    <TextField
                        id="outlined-with-placeholder"
                        label="Google Pay(TEZ) Name"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={this.state.wallet_gp_name}
                        onChange={this.handleChange('wallet_gp_name')}
                    /> 
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          </Grid>

            
          <Grid item xs={12} className={classes.btnRow}>
            <Button
                variant="contained"
                color="primary"
                onClick={this.handleUpdate}
                className={classes.button}
            >
                {authInfo.bank_details ? 'Update' : 'Submit'}
            </Button>
          </Grid>
        </Paper>
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updatePaymentInfo
  }, dispatch)

const mapStateToProps = state => ({
    // usersList: state.getIn(['RegistrationContainer', 'usersList']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PaymentInfo))
