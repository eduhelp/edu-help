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

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  marginLeft20: {
    marginLeft: 20,
  },
  textField: {
    width:200,
  },
};



export class UserInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      userInfo: {
        username: '',
        pwd: '',
        mobile: '',
        email: '',
        dob: '',
        gender: '',
        address: '',
        zipcode: ''
      }
    }
  }

  componentWillMount(){
    this.setState({ userInfo: this.props.userInfo })
  }

handleChange = (stName) => (event) => {
    this.setState({ userInfo: { 
      ...this.state.userInfo,
      [stName] : event.target.value
    }})
    setTimeout(()=> {
      this.props.submitCB(this.state.userInfo)
    }, 100)
}

  render() {
    const { classes } = this.props
    console.log(this.state.userInfo)
    return (
      <div>
        <Paper>
          <Grid container>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <TextField
                    id="outlined-with-placeholder"
                    label="Enter User Name"
                    placeholder="Placeholder"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={this.state.userInfo.username}
                    onChange={this.handleChange('username')}
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
                    value={this.state.userInfo.email}
                    onChange={this.handleChange('email')}
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
                    value={this.state.userInfo.dob}
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
                    value={this.state.userInfo.address}
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
                    label="Enter Password"
                    type='password'
                    placeholder="Placeholder"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    maxLength="8"
                    value={this.state.userInfo.pwd}
                    onChange={this.handleChange('pwd')}
                  /> 
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <TextField
                    id="outlined-with-placeholder"
                    label="Enter mobile"
                    placeholder="Placeholder"
                    type='number'
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={this.state.userInfo.mobile}
                    inputProps={{
                      maxLength: 10,
                    }}
                    onChange={this.handleChange('mobile')}
                  /> 
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      aria-label="Gender"
                      name="gender"
                      className={classes.group}
                      value={this.state.userInfo.gender}
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
                    value={this.state.userInfo.pincode}
                    onChange={this.handleChange('pincode')}
                  /> 
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

      </div>)
  }
}

export default withStyles(styles)(UserInfo)
