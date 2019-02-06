import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { userLogin, checkAvailability } from '../../store/Registration/actionCreator'
import Dialog from '../Common/Dialog'

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
  forgotPassword: {
    paddingLeft: 10,
    textDecoration: 'underline',
    cursor: 'pointer',
  }
};


export class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        username: '',
        pwd: '',
    }
  }

  handleChange = (name) => event => {
    this.setState({[name]:event.target.value})
  }

  loginSubmit = () => {
      const loginData = {
          username: this.state.username,
          pwd: this.state.pwd
      }
      this.props.userLogin(loginData)
  }

  

  render() {
    const { classes } = this.props
    const { username, pwd } = this. state
    const loginBtnStatus = (username !== '' && pwd !== '') ? false : true
    return (
      <div id="mainContainer">
        <Grid container>
            <Grid item xs={12}>
                <h3>Login</h3>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="outlined-with-placeholder"
                    label="User Name or Mobile Number"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                  />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="outlined-with-placeholder"
                    label="Password"
                    type='password'
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={this.state.pwd}
                    onChange={this.handleChange('pwd')}
                  />
            </Grid>
            <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.props.closeDrawer}
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
            <Grid item xs={12} onClick={this.props.forgotPasswordLinkCB} className={classes.forgotPassword} closeCB={this.props.closeDrawer}>Forgot password?</Grid>
            <Dialog
              dialogOpenStatus = {this.state.dialogOpenStatus}
              dialogTitle = {this.state.dialogTitle}
              dialogContent = {this.state.dialogContent}
              closeCB = {this.closeDialog}
              disableFooter={true}
            />
        </Grid>
        

      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    userLogin,
    checkAvailability,
  }, dispatch)

const mapStateToProps = state => ({
 // usersList: state.getIn(['UsersContainer', 'usersList']).toJS(),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))
