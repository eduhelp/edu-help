import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { emailNotification } from '../../store/Disputes/actionCreator'

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
        width:600,
    },
 
};


export class EmailNotification extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      title: '',
      message: ''
    }
  }

  handleChange = (stName) => (event) => {
    this.setState({
      [stName] : event.target.value
    })
}

  handleSubmit = event => {
      const sendData = {
          email: this.state.email,
          title: this.state.title,
          message: this.state.message
      }
      this.props.emailNotification(sendData)
      this.setState({email: '', title: '', message: ''})
  }

  render() {
    const { classes } = this.props
    return (
      <div id="mainContainer">
      <Paper className={classes.paper}>
        <h2> Email Notification Screen </h2>
        <Grid container>
            <Grid item xs={12} className={classes.marginLeft20}>
                <TextField
                id="outlined-with-placeholder"
                label="To Emails(comma seperated)"
                placeholder="Title"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.email}
                onChange={this.handleChange('email')}
                /> 
            </Grid>
            <Grid item xs={12} className={classes.marginLeft20}>
                <TextField
                id="outlined-with-placeholder"
                label="Subject"
                placeholder="Title"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.title}
                onChange={this.handleChange('title')}
                /> 
            </Grid>
            <Grid item xs={12} className={classes.marginLeft20}>
                <TextField
                id="outlined-with-placeholder"
                label="Message"
                placeholder="Message"
                multiline
                rows="4"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.message}
                onChange={this.handleChange('message')}
                /> 
            </Grid>
            <Grid item xs={12} className={classes.marginLeft20}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSubmit}
                    className={classes.button}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
    </Paper>
        
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    emailNotification,
  }, dispatch)

const mapStateToProps = state => ({
    // maintenanceStatus: state.getIn(['RegistrationContainer', 'maintenanceStatus']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EmailNotification))
