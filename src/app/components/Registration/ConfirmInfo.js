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
};



export class ConfirmInfo extends React.Component {
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
    return (
      <div>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12} className={classes.marginLeft20}>
              <h3>Sponsor Details </h3>
            </Grid>
            <Grid item xs={12} className={classes.marginLeft20}>
              <Grid container>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={3}>
                      Sponsor ID : 
                    </Grid>
                    <Grid item xs={9}>
                      {this.props.sponsorDetails.user_id} 
                    </Grid>
                    <Grid item xs={3}>
                      Sponsor Name : 
                    </Grid>
                    <Grid item xs={9}>
                      {this.props.sponsorDetails.username} 
                    </Grid>
                    <Grid item xs={3}>
                      Sponsor Mobile : 
                    </Grid>
                    <Grid item xs={9}>
                      {this.props.sponsorDetails.mobile} 
                    </Grid>
                  </Grid> 
                </Grid>
                <Grid item xs={6}>
                  
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12} className={classes.marginLeft20}>
              <h3>User Details </h3>
            </Grid>
            <Grid item xs={12} className={classes.marginLeft20}>
              <Grid container>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={3}>
                      Full Name : 
                    </Grid>
                    <Grid item xs={9}>
                      {this.props.userInfo.fullname} 
                    </Grid>
                  </Grid> 
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={3}>
                      User Name : 
                    </Grid>
                    <Grid item xs={9}>
                      {this.props.userInfo.username} 
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.marginLeft20}>
              <Grid container>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={3}>
                      Mobile : 
                    </Grid>
                    <Grid item xs={9}>
                      {this.props.userInfo.mobile} 
                    </Grid>
                  </Grid> 
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={3}>
                      Email : 
                    </Grid>
                    <Grid item xs={9}>
                      {this.props.userInfo.email} 
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.marginLeft20}>
              <Grid container>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={3}>
                      Gender : 
                    </Grid>
                    <Grid item xs={9}>
                      {this.props.userInfo.gender} 
                    </Grid>
                  </Grid> 
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={3}>
                      dob : 
                    </Grid>
                    <Grid item xs={9}>
                      {this.props.userInfo.dob}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.marginLeft20}>
              <Grid container>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={3}>
                      Country : 
                    </Grid>
                    <Grid item xs={9}>
                      {this.props.userInfo.country} 
                    </Grid>
                  </Grid> 
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={3}>
                      State : 
                    </Grid>
                    <Grid item xs={9}>
                      {this.props.userInfo.state}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} className={classes.marginLeft20}>
              <Grid container>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={3}>
                      city : 
                    </Grid>
                    <Grid item xs={9}>
                      {this.props.userInfo.city} 
                    </Grid>
                  </Grid> 
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={3}>
                      Address : 
                    </Grid>
                    <Grid item xs={9}>
                      {this.props.userInfo.address} -{this.props.userInfo.pincode}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(ConfirmInfo)
