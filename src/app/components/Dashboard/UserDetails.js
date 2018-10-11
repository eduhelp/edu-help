import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getFormatedDate } from '../Common/Utils'

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  rowHead: {
    padding: 5,
    background: '#ebebeb',
  },
  rowDetails: {
    padding: 5,
    background: '#fbfbfb',
  },
};


export class UserDetails extends React.Component {
  constructor() {
    super()
    
  }
  

  render() {
    const { classes, details } = this.props
    return (
      <div id="mainContainer">
        <Grid container>
            <Grid item xs={12} className={classes.rowHead}>
                <Grid container>
                    <Grid item xs={6}>
                        User Id 
                    </Grid>
                    <Grid item xs={6}>
                        {details.user_id}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowDetails}>
                <Grid container>
                    <Grid item xs={6}>
                        User Name 
                    </Grid>
                    <Grid item xs={6}>
                        {details.username}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowHead}>
                <Grid container>
                    <Grid item xs={6}>
                        Email
                    </Grid>
                    <Grid item xs={6}>
                        {details.email}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowDetails}>
                <Grid container>
                    <Grid item xs={6}>
                        Mobile 
                    </Grid>
                    <Grid item xs={6}>
                        {details.mobile}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowHead}>
                <Grid container>
                    <Grid item xs={6}>
                        DOB
                    </Grid>
                    <Grid item xs={6}>
                        {getFormatedDate(details.dob)}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowDetails}>
                <Grid container>
                    <Grid item xs={6}>
                        Gender
                    </Grid>
                    <Grid item xs={6}>
                        {details.gender}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowHead}>
                <Grid container>
                    <Grid item xs={6}>
                        Address
                    </Grid>
                    <Grid item xs={6}>
                        {details.address}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowDetails}>
                <Grid container>
                    <Grid item xs={6}>
                        Pincode
                    </Grid>
                    <Grid item xs={6}>
                        {details.pincode}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowHead}>
                <Grid container>
                    <Grid item xs={6}>
                        Sponsor Id
                    </Grid>
                    <Grid item xs={6}>
                        {details.sponsor_id}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>)
  }
}

export default withStyles(styles)(UserDetails)
