import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { changeDateFormat, getAge, ValidateEmail } from '../Common/Utils'

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
  textField1: {
      width:200,
      borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
  },
  btnRow: {
      textAlign: 'center',
      padding: 5,
  },
  group: {
    display: 'inline',
  },
  checkIconFail: {
    color: 'red',
  },
};


export class MyInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listStates : ['Arunachal Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Lakshadweep', 'National Capital Territory of Delhi', 'Puducherry'],
      availableStatus: {},
      userInfo: {
        user_id: '',
        fullname: '',
        mobile: '',
        email: '',
        dob: '',
        gender: '',
        country: '',
        state: '',
        city: '',
        address: '',
        pincode: ''
      },
      userInfoError: {
        fullname: {
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
        state: {
          error: false,
          text: ''
        },
      }
    }
  }

  componentWillMount(){
    console.log(this.props.authInfo)
    const dob = changeDateFormat(this.props.authInfo.dob)
    this.setState({
        userInfo: {
          ...this.state.userInfo,
          user_id: this.props.authInfo.user_id,
          fullname: this.props.authInfo.fullname,
          mobile: this.props.authInfo.mobile,
          email: this.props.authInfo.email,
          dob: dob,
          gender: this.props.authInfo.gender,
          address: this.props.authInfo.address,
          country: this.props.authInfo.country,
          state: this.props.authInfo.state,
          city: this.props.authInfo.city,
          pincode: this.props.authInfo.pincode
        }
        
    })
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
  
    if(stName == 'fullname') {
      if(!enteredValue) {
        this.setErrorState('fullname', true, 'Fullname required')
      }
    }
    
    if(stName == 'email') {
      if(!enteredValue) {
        this.setErrorState('email', true, 'Email required')
      } else if(!ValidateEmail(enteredValue)) {
        this.setErrorState('email', true, 'Invalid Email')
      } else if(this.props.availableStatus['email'] && enteredValue!== this.props.authInfo.email) {
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
      } else if(this.props.availableStatus['mobile'] && enteredValue!== this.props.authInfo.mobile) {
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

    if(stName == 'state') {
      if(enteredValue == 'None') {
        this.setErrorState('state', true, 'State required')
      } 
    }

  }

  validateUserInfo = () => {
    const userInfo = this.state.userInfo
    if(!userInfo.fullname) {
      this.setErrorState('fullname', true, 'Fullname required')
      return false
    }
  
    if(!userInfo.email) {
      this.setErrorState('email', true, 'Email required')
      return false
    } else if(!ValidateEmail(userInfo.email)) {
      this.setErrorState('email', true, 'Invalid Email')
      return false
    } else if(this.props.availableStatus['email'] && userInfo.email !== this.props.authInfo.email) {
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
    } else if(this.props.availableStatus['mobile'] && userInfo.mobile !== this.props.authInfo.mobile) {
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
    
    if(userInfo.state == 'None') {
      this.setErrorState('state', true, 'State required')
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

  handleChange = (stName) => (event) => {
    this.setErrorState(stName, false, '')
    this.setState({ userInfo: { 
      ...this.state.userInfo,
      [stName] : event.target.value
    }})
    if(stName === 'mobile' || stName === 'email') {
      this.props.checkAvailabilityCB(stName, event.target.value)
    }
  }


    handleUpdate = event => {
      if(this.validateUserInfo()) {
        setTimeout(()=> {
          this.props.updateUserInfoCB(this.state.userInfo)
        }, 100)
      } 
    }

  render() {
    const { classes } = this.props
    const { userInfo, userInfoError } = this.state
    return (
      <div id="mainContainer">
        <Paper className={classes.paper}>
          <Grid item xs={12} className={classes.marginLeft20}>
            <h4>Username : {this.props.authInfo.username} </h4>
          </Grid>
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
                      onBlur={this.handleBlurChange('fullname')}
                      error={userInfoError.fullname.error}
                      helperText={userInfoError.fullname.text}
                    />
                  </Grid>

                  <Grid item xs={12} className={classes.marginLeft20}>
                    <TextField
                      id="outlined-with-placeholder"
                      label="Enter email"
                      placeholder="Placeholder"
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      value={userInfo.email}
                      onChange={this.handleChange('email')}
                      onBlur={this.handleBlurChange('email')}
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
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                      variant="outlined"
                      value={userInfo.dob}
                      onChange={this.handleChange('dob')}
                      onBlur={this.handleBlurChange('dob')}
                      error={userInfoError.dob.error}
                      helperText={userInfoError.dob.text}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.marginLeft20} error>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="age-simple">State</InputLabel>
                      <Select
                        value={userInfo.state}
                        onChange={this.handleChange('state')}
                        className={classes.selectBox}
                        error={userInfoError.state.error}
                      >
                        <MenuItem value='None'>Select State</MenuItem>
                        {this.state.listStates.map((option, key) => {
                          return (<MenuItem value={option} key={key}>{option}</MenuItem>)
                        })}
                      </Select>
                      <FormHelperText className={classes.checkIconFail}>{userInfoError.state.text}</FormHelperText>
                    </FormControl>  
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
            <Grid item xs={12} className={classes.btnRow}>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleUpdate}
                  className={classes.button}
              >
                  Update
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(MyInfo)
