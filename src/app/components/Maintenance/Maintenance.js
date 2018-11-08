import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { getMaintenanceStatus, updateMaintenance } from '../../store/Registration/actionCreator'

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
 
};


export class Maintenance extends React.Component {
  constructor() {
    super()
    this.state = {
      status: '',
      title: '',
      message: ''
    }
  }
  componentDidMount() {
      this.props.getMaintenanceStatus()
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
        status: nextProps.maintenanceStatus.status,
        title: nextProps.maintenanceStatus.title,
        message: nextProps.maintenanceStatus.message
      })
  }
  
  handleChange = (stName) => (event) => {
      console.log('chane here')
    this.setState({
      [stName] : event.target.value
    })
}

  handleSubmit = event => {
      const sendData = {
          status: this.state.status,
          title: this.state.title,
          message: this.state.message
      }
      this.props.updateMaintenance(sendData)
  }

  render() {
    const { classes } = this.props
    return (
      <div id="mainContainer">
      <Paper className={classes.paper}>
        <h2> Admin Maintenance Screen </h2>
        <Grid container>
            <Grid item xs={12} className={classes.marginLeft20}>
                <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup
                    aria-label="Status"
                    name="status"
                    className={classes.group}
                    value={this.state.status}
                    onChange={this.handleChange('status')}
                >
                    <FormControlLabel value="Active" control={<Radio />} label="Active" />
                    <FormControlLabel value="InActive" control={<Radio />} label="InActive" />
                </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} className={classes.marginLeft20}>
                <TextField
                id="outlined-with-placeholder"
                label="Enter Title"
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
                label="Enter Message"
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
    getMaintenanceStatus,
    updateMaintenance,
  }, dispatch)

const mapStateToProps = state => ({
    maintenanceStatus: state.getIn(['RegistrationContainer', 'maintenanceStatus']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Maintenance))
