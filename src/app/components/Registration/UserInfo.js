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
import CheckCircle from '@material-ui/icons/CheckCircle'
import Cancel from '@material-ui/icons/Cancel'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { getAge, ValidateEmail } from '../Common/Utils'

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
    width:250,
  },
  group: {
    display: 'inline',
  },
  btnRow: {
    textAlign: 'center',
    padding: 5,
    marginTop: 5,
  },
  rowOdd: {
    padding: 10,
    background: '#ebebeb',
  },
  rowEven: {
    padding: 10,
    background: '#fbfbfb',
  },
  textRight: {
    textAlign: 'right',
    paddingRgiht: 5,
  },
  textLeft: {
    textAlign: 'left',
    paddingLeft: 5,
  },
  navLink: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  checkBlock: {
    paddingTop: 35,
  },
  checkIconSuccess: {
    color: 'green',
  },
  checkIconFail: {
    color: 'red',
  },
  selectBox: {
    width: 220,
  },
};



export class UserInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      listStates : ['Arunachal Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Lakshadweep', 'National Capital Territory of Delhi', 'Puducherry'],
      availableStatus: {},
      userInfo: {
        fullname: '',
        username: '',
        pwd: '',
        confirmpwd: '',
        mobile: '',
        email: '',
        dob: '',
        gender: '',
        address: '',
        pincode: ''
      },
      userInfoError: {
        fullname: {
          error: false,
          text: ''
        },
        username: {
          error: false,
          text: ''
        },
        pwd: {
          error: false,
          text: ''
        },
        confirmpwd: {
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
        dob: {
          error: false,
          text: ''
        },
        pincode: {
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
    if(stName === 'username' || stName === 'mobile' || stName === 'email') {
      this.props.checkAvailabilityCB(stName, event.target.value)
    }
}

handleBlurChange = (stName) => event => {
  const enteredValue = event.target.value

  if(stName == 'fullname') {
    if(!enteredValue) {
      this.setErrorState('fullname', true, 'Fullname required')
    }
  }

  if(stName == 'username') {
    var firstFourChar = enteredValue.substring(0, 4);
    if(!enteredValue) {
      this.setErrorState('username', true, 'Username required')
    } else if(enteredValue.length < 4 || enteredValue.length > 10) {
      this.setErrorState('username', true, 'Username should be 4 to 10 characters')
    } else if(/^[a-zA-Z0-9]*$/.test(enteredValue) == false) {
      this.setErrorState('username', true, 'Special characters not allowed')
    } else if(/^[a-zA-Z]*$/.test(firstFourChar) == false) {
      this.setErrorState('username', true, 'First four letters should be a alphabets')
    } else if(this.props.availableStatus['username']) {
      this.setErrorState('username', true, 'Username already exists')
    }
  }

  if(stName == 'pwd') {
    if(!enteredValue) {
      this.setErrorState('pwd', true, 'Password required')
    } else if(enteredValue.length < 6 || enteredValue.length > 20) {
      this.setErrorState('pwd', true, 'Password should be 6 to 20 characters')
    }
  }

  if(stName == 'confirmpwd') {
    if(enteredValue !== this.state.userInfo.pwd) {
      this.setErrorState('confirmpwd', true, 'Should be same as password')
    }
  }

  if(stName == 'email') {
    if(!enteredValue) {
      this.setErrorState('email', true, 'Email required')
    } else if(!ValidateEmail(enteredValue)) {
      this.setErrorState('email', true, 'Invalid Email')
    } else if(this.props.availableStatus['email']) {
      this.setErrorState('email', true, 'Email already exists')
    }
  }

  if(stName == 'mobile') {
    if(!enteredValue) {
      this.setErrorState('mobile', true, 'Mobile number required')
    } else if(/^[0-9]*$/.test(enteredValue) == false) {
      this.setErrorState('mobile', true, 'Invalid mobile number')
    } else if(enteredValue.length !== 10) {
      this.setErrorState('mobile', true, 'mobile number should be 10 characters long')
    } else if(this.props.availableStatus['mobile']) {
      this.setErrorState('mobile', true, 'Mobile number already exists')
    }
  }

  if(stName == 'dob') {
    const age = getAge(enteredValue)
    if(!enteredValue) {
      this.setErrorState('dob', true, 'Date of birth required')
    } else if(age < 18) {
      this.setErrorState('dob', true, 'Your Age : '+age+', Age should be 18+')
    }
  }

  if(stName == 'pincode') {
    if(/^[0-9]*$/.test(enteredValue) == false) {
      this.setErrorState('pincode', true, 'Invalid pincode')
    } else if(enteredValue.length !== 6) {
      this.setErrorState('pincode', true, 'pincode should be 6 characters long')
    } 
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



validateUserInfo = () => {
  const userInfo = this.state.userInfo
  if(!userInfo.fullname) {
    this.setErrorState('fullname', true, 'Fullname required')
    return false
  }

  var firstFourChar = userInfo.username.substring(0, 4);
  if(!userInfo.username) {
    this.setErrorState('username', true, 'Username required')
    return false
  } else if(userInfo.username.length < 4 || userInfo.username.length > 10) {
    this.setErrorState('username', true, 'Username should be 4 to 10 characters')
    return false
  } else if(/^[a-zA-Z0-9]*$/.test(userInfo.username) == false) {
    this.setErrorState('username', true, 'Special characters not allowed')
    return false
  } else if(/^[a-zA-Z]*$/.test(firstFourChar) == false) {
    this.setErrorState('username', true, 'First four letters should be a alphabets')
    return false
  } else if(this.props.availableStatus['username']) {
    this.setErrorState('username', true, 'Username already exists')
    return false
  }

  if(!userInfo.pwd) {
    this.setErrorState('pwd', true, 'Password required')
    return false
  } else if(userInfo.pwd.length < 6 || userInfo.pwd.length > 20) {
    this.setErrorState('pwd', true, 'Password should be 6 to 20 characters')
    return false
  }

  if(!userInfo.email) {
    this.setErrorState('email', true, 'Email required')
    return false
  } else if(!ValidateEmail(userInfo.email)) {
    this.setErrorState('email', true, 'Invalid Email')
    return false
  } else if(this.props.availableStatus['email']) {
    this.setErrorState('email', true, 'Email already exists')
    return false
  }

  if(!userInfo.mobile) {
    this.setErrorState('mobile', true, 'Mobile number required')
    return false
  } else if(/^[0-9]*$/.test(userInfo.mobile) == false) {
    this.setErrorState('mobile', true, 'Invalid mobile number')
  } else if(userInfo.mobile.length !== 10) {
    this.setErrorState('mobile', true, 'mobile number should be 10 characters long')
  } else if(this.props.availableStatus['mobile']) {
    this.setErrorState('mobile', true, 'Mobile number already exists')
    return false
  }

  const age = getAge(userInfo.dob)
  if(!userInfo.dob) {
    this.setErrorState('dob', true, 'Date of birth required')
    return false
  } else if(age < 18) {
    this.setErrorState('dob', true, 'Your Age : '+age+', Age should be 18+')
    return false
  }

  if(/^[0-9]*$/.test(userInfo.pincode) == false) {
    this.setErrorState('pincode', true, 'Invalid Pincode')
    return false
  } else if(userInfo.pincode.length !== 6) {
    this.setErrorState('pincode', true, 'pincode number should be 6 characters long')
    return false
  }

  return true
}

handleSubmit = event => {
  if(this.validateUserInfo()) {
    setTimeout(()=> {
      this.props.submitCB(this.state.userInfo)
    }, 100)
  } 
}

checkExist = (field_name, field_value) => event => {
  this.props.checkAvailabilityCB(field_name, field_value)
}

  render() {
    const { classes } = this.props
    const { userInfo, userInfoError, listStates } = this.state
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
                    label="Enter Full Name*"
                    placeholder="Placeholder"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={userInfo.fullname}
                    onChange={this.handleChange('fullname')}
                    error={userInfoError.fullname.error}
                    helperText={userInfoError.fullname.text}
                  />
                </Grid>
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
                    onBlur={this.handleBlurChange('pwd')}
                  /> 
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <Grid container>
                    <Grid item xs={6}>
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
                        onBlur={this.handleBlurChange('email')}
                      /> 
                    </Grid>
                    <Grid item xs={6} className={classes.checkBlock}>
                      {(!this.props.availableStatus['email']) ? (
                        <CheckCircle className={classes.checkIconSuccess} />
                      ) : (
                        <Cancel className={classes.checkIconFail} />
                      )
                      }
                      <span className={classes.navLink} onClick={this.checkExist('email', userInfo.email)}>
                        check Availability
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <TextField
                    id="date"
                    label="Enter dob"
                    placeholder="Placeholder"
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                    value={userInfo.dob}
                    onChange={this.handleChange('dob')}
                    error={userInfoError.dob.error}
                    helperText={userInfoError.dob.text}
                    onBlur={this.handleBlurChange('dob')}
                  />
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">Country</InputLabel>
                    <Select
                      value={userInfo.country}
                      onChange={this.handleChange('country')}
                      className={classes.selectBox}
                    >
                      <MenuItem value='India'>India</MenuItem>
                    </Select>
                  </FormControl> 
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <TextField
                    id="outlined-with-placeholder"
                    label="Enter City"
                    placeholder="Placeholder"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={userInfo.city}
                    onChange={this.handleChange('city')}
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
                <Grid container>
                  <Grid item xs={6}>
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
                      onBlur={this.handleBlurChange('username')}
                    />
                  </Grid>
                  <Grid item xs={6} className={classes.checkBlock}>
                    {(!this.props.availableStatus['username']) ? (
                      <CheckCircle className={classes.checkIconSuccess} />
                    ) : (
                      <Cancel className={classes.checkIconFail} />
                    )
                    }
                    <span className={classes.navLink} onClick={this.checkExist('username', userInfo.username)}>
                      check Availability
                    </span>
                  </Grid>
                </Grid>
              </Grid> 
                <Grid item xs={12} className={classes.marginLeft20}>
                  <TextField
                    id="outlined-with-placeholder"
                    label="Confirm Password*"
                    type='password'
                    placeholder="Placeholder"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    maxLength="8"
                    value={userInfo.confirmpwd}
                    onChange={this.handleChange('confirmpwd')}
                    error={userInfoError.confirmpwd.error}
                    helperText={userInfoError.confirmpwd.text}
                    onBlur={this.handleBlurChange('confirmpwd')}
                  /> 
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <Grid container>
                    <Grid item xs={6}>
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
                        onBlur={this.handleBlurChange('mobile')}
                      />  
                    </Grid>
                    <Grid item xs={6} className={classes.checkBlock}>
                      {(!this.props.availableStatus['mobile']) ? (
                        <CheckCircle className={classes.checkIconSuccess} />
                      ) : (
                        <Cancel className={classes.checkIconFail} />
                      )
                      }
                      <span className={classes.navLink} onClick={this.checkExist('mobile', userInfo.mobile)}>
                        check Availability
                      </span>
                    </Grid>
                  </Grid>

                  
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
                      <FormControlLabel value="transgender" control={<Radio />} label="Trans Gender" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">State</InputLabel>
                    <Select
                      value={userInfo.state}
                      onChange={this.handleChange('state')}
                      className={classes.selectBox}
                    >
                      <MenuItem value=''>None</MenuItem>
                      {this.state.listStates.map((option, key) => {
                        return (<MenuItem value={option} key={key}>{option}</MenuItem>)
                      })}
                      
                    </Select>
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
                    error={userInfoError.pincode.error}
                    helperText={userInfoError.pincode.text}
                    onBlur={this.handleBlurChange('pincode')}
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
