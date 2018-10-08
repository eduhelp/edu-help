import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { changePassword } from '../../store/Registration/actionCreator'

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
          padding: 5,
          marginTop: 5,
          marginLeft: 20,
      },
 
};


export class ChangePassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        old_password: '',
        new_password: '',
        confirm_password: '',
        opError: false,
        opMsg: '',
        npError: false,
        npMsg: '',
        cpError: false,
        cpMsg: '',
    }
  }
    
    handleChange = (stName) => (event) => {
        this.setState({ 
            [stName] : event.target.value
        })
    }
    
    validateForm = () => {
        console.log(this.props.authInfo)
        console.log(this.state.old_password, this.props.authInfo.pwd)
        if (this.state.old_password !== this.props.authInfo.pwd) {
            this.setState({opError: true, opMsg: 'Invalid old password'})
            return false
        } else if(this.state.new_password.length < 6) {
            this.setState({npError: true, npMsg: 'New password must be 6 characters length'})
            return false
        } else if(this.state.new_password !== this.state.confirm_password) {
            this.setState({cpError: true, cpMsg: 'Old password and confirm old password must be same'})
            return false
        }
        return true
    }

    handleUpdate = event => {
        this.setState({
            opError: false,
            opMsg: '',
            npError: false,
            npMsg: '',
            cpError: false,
            cpMsg: ''
        })
        if(this.validateForm()) {
            const sendData = {
                user_id: this.props.authInfo.user_id,
                pwd: this.state.new_password,
            }
            this.props.changePassword(sendData)
        } 
    }

  render() {
    const { classes, authInfo } = this.props
    return (
      <div id="mainContainer">
        <Paper className={classes.paper}>
        <Grid item xs={12} className={classes.marginLeft20}>
            <h3>Change Password</h3>
        </Grid>
        <Grid item xs={12} className={classes.marginLeft20}>
          <Grid container>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12} className={classes.marginLeft20}>
                    <TextField
                        id="outlined-with-placeholder"
                        label="Old Password"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        variant="outlined"
                        value={this.state.old_password}
                        onChange={this.handleChange('old_password')}
                        error={this.state.opError}
                        helperText={this.state.opMsg}
                    /> 
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                    <TextField
                        id="bank_name"
                        label="New Password"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        variant="outlined"
                        value={this.state.new_password}
                        onChange={this.handleChange('new_password')}
                        error={this.state.npError}
                        helperText={this.state.npMsg}
                    /> 
                </Grid>
                <Grid item xs={12} className={classes.marginLeft20}>
                    <TextField
                            id="outlined-with-placeholder"
                            label="Confirm New Password"
                            className={classes.textField}
                            type="password"
                            margin="normal"
                            variant="outlined"
                            value={this.state.confirm_password}
                            onChange={this.handleChange('confirm_password')}
                            error={this.state.cpError}
                            helperText={this.state.cpMsg}
                        /> 
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
                
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
                Change
            </Button>
          </Grid>
        </Paper>
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changePassword,
  }, dispatch)

const mapStateToProps = state => ({
    // usersList: state.getIn(['RegistrationContainer', 'usersList']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChangePassword))
