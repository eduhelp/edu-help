import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { render } from 'react-dom'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { getUsersAPITemp, addUser, changeUserStatus } from '../../store/Users/actionCreator'
import Steppers from './../Common/Steppers/Steppers'
import TextField from '@material-ui/core/TextField';

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  paper: {
    margin: 20,
    color: '#ccc',
  },
  preset: {
    padding: '5px 15px',
    backgroundColor: '#00adff',
    fontSize: 24,
    color: '#fff',
  },
  frequencyTop: {
    padding: 20,
  },
  frequencyMid: {
    padding: '70px 0px 100px 20px',
  },
  frequencyBottom: {
    paddingLeft: 20,
  },
};


export class Users extends React.Component {
  constructor() {
    super()
    this.state = { 
      name: '',
      email: '',
      pwd: '',
      mobile: '',
      address: '',
      dob: '',
      sponsor: '',
    }
  }

  componentDidMount() {
    console.log('start')
    this.props.getUsersAPITemp();
  }

  handleChange = (stName) => (event) => {
    this.setState({ [stName] : event.target.value } )
  }

  submitUserDetails = event => {
    const sendData = {
      name: this.state.name,
      email: this.state.email,
      pwd: this.state.pwd,
      mobile: this.state.mobile,
      address: this.state.address,
      dob: this.state.dob,
      sponsor: this.state.sponsor
    }
    this.props.addUser(sendData);
  }

  changeStatus = (user_id, sponsor_id) => event => {
    console.log("calleddd")
    const sendData = {
      user_id,
      sponsor_id
    }
    this.props.changeUserStatus(sendData)
  }

  render() {
    const { classes } = this.props
    const step1Component = () => {
      return (
        <div>
          <TextField
            id="outlined-with-placeholder"
            label="With placeholder"
            placeholder="Placeholder"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </div>
      )
    }
    return (
      <div id="mainContainer">
        <Steppers 
          step1='Sponsor Id'
          step2='Your Info'
          step3='Confirm'
          step1Contnet = "tetsttttttt"
        />
        <Grid container>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container>
                
                <Grid item xs={12}>
                  { this.props.usersList.map((option,key) => {
                    return (
                      <div key={key}>{option.user_id} - {option.name} - {option.email} - {option.mobile} - {option.status} - <span onClick={this.changeStatus(option.user_id, option.sponsor_id)}>Change Status</span></div>
                    )
                  })}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <h3>Add User</h3>
            Name : <input type="text" value={this.state.name} onChange={this.handleChange('name')} /><br />
            Email : <input type="text" value={this.state.email} onChange={this.handleChange('email')} /><br />
            Password : <input type="password" value={this.state.pwd} onChange={this.handleChange('pwd')} /><br />
            Mobile : <input type="text" value={this.state.mobile} onChange={this.handleChange('mobile')} /><br />
            Address : <input type="text" value={this.state.address} onChange={this.handleChange('address')} /><br />
            DOB : <input type="text" value={this.state.dob} onChange={this.handleChange('dob')} /><br />
            sponsor : <input type="text" value={this.state.sponsor} onChange={this.handleChange('sponsor')} /><br />
            <button onClick={this.submitUserDetails}>Submit</button>
          </Grid>
        </Grid>
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getUsersAPITemp,
    addUser,
    changeUserStatus,
  }, dispatch)

const mapStateToProps = state => ({
  usersList: state.getIn(['UsersContainer', 'usersList']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Users))
