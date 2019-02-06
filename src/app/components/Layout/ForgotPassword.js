import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { checkAvailability, sendForgotPassword } from '../../store/Registration/actionCreator'
import { ValidateEmail } from '../Common/Utils'

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  textField: {
      width: '250px',
  },
  button: {
      margin: 10,
  },
};


export class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        email: '',
        userInfoError: {
            email: {
                error: '',
                text: ''
            }
        }
    }
  }

  handleChange = (name) => event => {
    event.preventDefault()
    this.setState({[name]:event.target.value})
    if(ValidateEmail(event.target.value)) {
        const sendData = {
            field_name: 'email',
            field_value: event.target.value
          }
          this.props.checkAvailability(sendData)
    }
    
  }
  
  setErrorState = (stname, err, msg) => {
    this.setState({ 
      userInfoError: {
        ...this.state.userInfoError,
        [stname]: {
          error: err,
          text: msg
        }
      }
     })
  }

  handleBlurChange = (stName) => event => {
    const enteredValue = event.target.value
    if(stName == 'email') {
        if(!enteredValue) {
          this.setErrorState('email', true, 'Email required')
        } else if(!ValidateEmail(enteredValue)) {
          this.setErrorState('email', true, 'Invalid Email')
        } else if(!this.props.availableStatus['email']) {
          this.setErrorState('email', true, 'Email not exists') 
        }
      }
  }
  loginSubmit = () => {
      
    let isValid = true
      if(this.state.email == '') {
        this.setErrorState('email', true, 'Email required')
        isValid = false
      } else if(!ValidateEmail(this.state.email)) {
        this.setErrorState('email', true, 'Invalid Email')
        isValid = false
      } else if(!this.props.availableStatus['email']) {
        this.setErrorState('email', true, 'Email not exists')
        isValid = false
      }
      if(isValid) {
          var sendData = {
              email : this.state.email
          }
        this.props.sendForgotPassword(sendData)
      }
  }

  

  render() {
    const { classes, closeCallback } = this.props
    const { userInfoError, email } = this.state
    const loginBtnStatus = (email !== '') ? false : true
    return (
      <div id="mainContainer">
        <Grid container>
            <Grid item xs={12}>
                <h3>Forgot Password</h3>
            </Grid> 
            <Grid item xs={12}>
                <TextField
                    id="outlined-with-placeholder"
                    label="Enter Email address"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    error={userInfoError.email.error}
                    helperText={userInfoError.email.text}
                    // onBlur={this.handleBlurChange('email')}
                  />
            </Grid>
            <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={closeCallback}
                  className={classes.button}
                >
                  Cancel
                </Button>
                <Button
                  disabled={loginBtnStatus}
                  variant="contained"
                  color="primary"
                  onClick={this.loginSubmit}
                  className={classes.button}
                >
                  Submit
                </Button>
            </Grid>
        </Grid>
        

      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    checkAvailability,
    sendForgotPassword,
  }, dispatch)

const mapStateToProps = state => ({
    availableStatus: state.getIn(['RegistrationContainer', 'availableStatus']).toJS(),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ForgotPassword))
