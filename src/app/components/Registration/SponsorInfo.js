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
  },
  sponsorBox: {
    backgroundColor: '#ede2e3',
    textAlign: 'left',
    padding: 10,
  },
  rowOdd: {
    padding: 10,
    background: '#ebebeb',
  },
  rowEven: {
    padding: 10,
    background: '#fbfbfb',
  },
  textRight: {
    textAlign: 'right',
    paddingRgiht: 5,
  },
  textLeft: {
    textAlign: 'left',
    paddingLeft: 5,
  },
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

  render() {
    const { classes, sponsorDetails } = this.props
    return (
      <div>
        <Paper className={classes.paper}>
          {(sponsorDetails.user_id) ? (
            <div>
              {(sponsorDetails.status == 'Active') ? (
                <Grid container>
                  <Grid item xs={12} className={classes.rowEven}>
                    <Grid container>
                        <Grid item xs={6} className={classes.textRight}>
                          Sponsor Name :
                        </Grid>
                        <Grid item xs={6} className={classes.textLeft}>
                            {sponsorDetails.username}
                        </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.rowOdd}>
                    <Grid container>
                        <Grid item xs={6} className={classes.textRight}>
                          Sponsor Mobile :
                        </Grid>
                        <Grid item xs={6} className={classes.textLeft}>
                            {sponsorDetails.mobile}
                        </Grid>
                    </Grid>
                  </Grid> 
                </Grid>
              ) : (
                <Grid container>
                  <Grid item xs={12}>
                    {sponsorDetails.username} not in Active state, please as your sponsor to activate the account or try with another sponsor.
                  </Grid>
                </Grid>
              )}
            </div>
          ) : (
            <Grid container>
              <Grid item xs={12} >
                Invalid Sponsor details, please try with another sponsor.
              </Grid>
            </Grid>
          )
          }
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(SponsorInfo)
