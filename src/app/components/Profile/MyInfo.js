import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
import { changeDateFormat } from '../../components/Common/Utils'
import { updateUserInfo } from '../../store/Registration/actionCreator'

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
  },
};


export class MyInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        email: '',
        dob: '',
        gender: '',
        address: '',
        zipcode: ''
    }
  }

  componentWillMount(){
    const dob = changeDateFormat(this.props.authInfo.dob)
    this.setState({ 
        email: this.props.authInfo.email,
        dob: dob,
        gender: this.props.authInfo.gender,
        address: this.props.authInfo.address,
        state: this.props.authInfo.state,
        pincode: this.props.authInfo.pincode
    })
  }

    handleChange = (stName) => (event) => {
        this.setState({ 
            [stName] : event.target.value
        })
    }

    handleUpdate = event => {
        const sendData = {
            user_id: this.props.authInfo.user_id,
            email: this.state.email,
            dob: this.state.dob,
            gender: this.state.gender,
            address: this.state.address,
            state: this.state.state,
            pincode: this.state.pincode
        }
        this.props.updateUserInfo(sendData)
    }

  render() {
    const { classes } = this.props
    return (
      <div id="mainContainer">
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12} className={classes.marginLeft20}>
                  Username : {this.props.authInfo.username} 
                </Grid>

                <Grid item xs={12} className={classes.marginLeft20}>
                  <TextField
                    id="outlined-with-placeholder"
                    label="Enter email"
                    placeholder="Placeholder"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={this.state.email}
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
                    value={this.state.dob}
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
                    value={this.state.address}
                    onChange={this.handleChange('address')}
                  /> 
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
            <Grid container>
                <Grid item xs={12} className={classes.marginLeft20}>
                    Mobile : {this.props.authInfo.mobile} 
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      aria-label="Gender"
                      name="gender"
                      className={classes.group}
                      value={this.state.gender}
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
                    label="Enter state"
                    placeholder="Placeholder"
                    type='text'
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    inputProps={{
                      maxLength: 20,
                    }}
                    value={this.state.state}
                    onChange={this.handleChange('state')}
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
                    value={this.state.pincode}
                    onChange={this.handleChange('pincode')}
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
        </Paper>
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updateUserInfo,
  }, dispatch)

const mapStateToProps = state => ({
    // usersList: state.getIn(['RegistrationContainer', 'usersList']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyInfo))
