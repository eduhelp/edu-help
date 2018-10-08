import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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
  marginLeft20: {
    marginLeft: 20,
  },
  textField: {
    width:200,
  },
  group: {
    display: 'inline',
  },
  btnRow: {
    textAlign: 'center',
    padding: 5,
    marginTop: 5,
  },
};



export class UserInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      availableStatus: {},
      userInfo: {
        username: '',
        pwd: '',
        mobile: '',
        email: '',
        dob: '',
        gender: '',
        address: '',
        zipcode: ''
      },
      userInfoError: {
        username: {
          error: false,
          text: ''
        },
        pwd: {
          error: false,
          text: ''
        },
        mobile: {
          error: false,
          text: ''
        },
        email: {
          error: false,
          text: ''
        },
      }
    }
  }

  componentWillMount(){
    this.setState({ userInfo: this.props.userInfo })
  }

handleChange = (stName) => (event) => {
    this.setErrorState(stName, false, '')
    this.setState({ userInfo: { 
      ...this.state.userInfo,
      [stName] : event.target.value
    }})
    if(stName === 'username' || stName === 'mobile') {
      this.props.checkAvailabilityCB(stName, event.target.value)
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

ValidateEmail = (emailField)  =>
{
  var atposition=emailField.indexOf("@");  
  var dotposition=emailField.lastIndexOf(".");  
  if (atposition<1 || dotposition<atposition+2 || dotposition+2>=emailField.length){  
    return false;  
  } 
  return true
}

validateUserInfo = () => {
  const userInfo = this.state.userInfo
  if(!userInfo.username) {
    this.setErrorState('username', true, 'Username required')
    return false
  } else if(this.props.availableStatus['username']) {
    this.setErrorState('username', true, 'Username already exists')
    return false
  } 

  if(!userInfo.pwd) {
    this.setErrorState('pwd', true, 'Password required')
    return false
  } else if(userInfo.pwd.length < 6) {
    this.setErrorState('pwd', true, 'Minimum 6 chatacters required')
    return false
  }

  if(!userInfo.email) {
    this.setErrorState('email', true, 'Email required')
    return false
  } else if(!this.ValidateEmail(userInfo.email)) {
    this.setErrorState('email', true, 'Invalid Email')
    return false
  }

  if(!userInfo.mobile) {
    this.setErrorState('mobile', true, 'Mobile number required')
    return false
  } else if(this.props.availableStatus['mobile']) {
    this.setErrorState('mobile', true, 'Mobile number already exists')
    return false
  }

  return true
}

handleSubmit = event => {
  if(this.validateUserInfo()) {
    console.log('ready to insert')
    setTimeout(()=> {
      this.props.submitCB(this.state.userInfo)
    }, 100)
  } 
}

  render() {
    const { classes } = this.props
    const { userInfo, userInfoError } = this.state
    console.log(userInfoError)
    return (
      <div>
        <Paper className={classes.paper}>
        <Grid item xs={12} className={classes.marginLeft20}>
          <Grid container>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <TextField
                    id="outlined-with-placeholder"
                    label="Enter User Name*"
                    placeholder="Placeholder"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={userInfo.username}
                    onChange={this.handleChange('username')}
                    error={userInfoError.username.error}
                    helperText={userInfoError.username.text}
                  /> 
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <TextField
                    id="outlined-with-placeholder"
                    label="Enter email*"
                    placeholder="Placeholder"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={userInfo.email}
                    onChange={this.handleChange('email')}
                    error={userInfoError.email.error}
                    helperText={userInfoError.email.text}
                  /> 
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <TextField
                    id="date"
                    label="Enter dob"
                    placeholder="Placeholder"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                    value={userInfo.dob}
                    onChange={this.handleChange('dob')}
                  />
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <TextField
                    id="outlined-with-placeholder"
                    label="Enter address"
                    placeholder="Placeholder"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={userInfo.address}
                    onChange={this.handleChange('address')}
                  /> 
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
            <Grid container>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <TextField
                    id="outlined-with-placeholder"
                    label="Enter Password*"
                    type='password'
                    placeholder="Placeholder"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    maxLength="8"
                    value={userInfo.pwd}
                    onChange={this.handleChange('pwd')}
                    error={userInfoError.pwd.error}
                    helperText={userInfoError.pwd.text}
                  /> 
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <TextField
                    id="outlined-with-placeholder"
                    label="Enter mobile*"
                    placeholder="Placeholder"
                    type='number'
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={userInfo.mobile}
                    inputProps={{
                      maxLength: 10,
                    }}
                    onChange={this.handleChange('mobile')}
                    error={userInfoError.mobile.error}
                    helperText={userInfoError.mobile.text}
                  /> 
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      aria-label="Gender"
                      name="gender"
                      className={classes.group}
                      value={userInfo.gender}
                      onChange={this.handleChange('gender')}
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <TextField
                    id="outlined-with-placeholder"
                    label="Enter pincode"
                    placeholder="Placeholder"
                    type='number'
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    inputProps={{
                      maxLength: 6,
                    }}
                    value={userInfo.pincode}
                    onChange={this.handleChange('pincode')}
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
                onClick={this.handleSubmit}
                className={classes.button}
            >
                Submit
            </Button>
          </Grid>
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(UserInfo)
