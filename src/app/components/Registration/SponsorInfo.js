import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  paper: {
    margin: 10,
    padding: 10,
    textAlign: 'center',
  }
};



export class SponsorInfo extends React.Component {
  constructor() {
    super()
    this.state = {
        sponsorInfo: {
            sponsor_id: ''
        }
    }
  }

  componentWillMount(){
    this.setState({ sponsorInfo: this.props.sponsorInfo })
  }

handleChange = (event) => {
    this.setState({ sponsorInfo: { 
        sponsor_id : event.target.value
      }})
}

handleSubmit = (event) => {
  this.props.getUserCB(this.state.sponsorInfo)
  setTimeout(()=> {
    this.props.submitCB(this.state.sponsorInfo)
  }, 100)
}

  render() {
    const { classes } = this.props
    return (
      <div>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                id="outlined-with-placeholder"
                label="Enter Sponsor ID"
                type='number'
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.sponsorInfo.sponsor_id}
                onChange={this.handleChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
                className={classes.button}
              >
                Go
              </Button>
            </Grid>
            <Grid item xs={6}>
              Sponsor Id : {this.props.sponsorDetails.user_id} <br />
              Sponsor Name : {this.props.sponsorDetails.username} <br />
              Sponsor Mobile: {this.props.sponsorDetails.mobile} <br />
            </Grid>
          </Grid>
           
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(SponsorInfo)
