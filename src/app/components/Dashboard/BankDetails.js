import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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


export class BankDetails extends React.Component {
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
                        Account Name 
                    </Grid>
                    <Grid item xs={6}>
                        {details.bank_ac_name}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowDetails}>
                <Grid container>
                    <Grid item xs={6}>
                        Account Number 
                    </Grid>
                    <Grid item xs={6}>
                        {details.bank_ac_number}
                    </Grid>
                </Grid>
            </Grid>
             <Grid item xs={12} className={classes.rowHead}>
                <Grid container>
                    <Grid item xs={6}>
                        Account Type 
                    </Grid>
                    <Grid item xs={6}>
                        {details.account_type}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowDetails}>
                <Grid container>
                    <Grid item xs={6}>
                        Bank Name 
                    </Grid>
                    <Grid item xs={6}>
                        {details.bank_name}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowHead}>
                <Grid container>
                    <Grid item xs={6}>
                        Branch Name 
                    </Grid>
                    <Grid item xs={6}>
                        {details.bank_branch}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowDetails}>
                <Grid container>
                    <Grid item xs={6}>
                        IFSC Code
                    </Grid>
                    <Grid item xs={6}>
                        {details.bank_ifsc_code}
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                
            </Grid>
            <Grid item xs={12}>
                <h5>Wallet Info</h5>
            </Grid>
            <Grid item xs={12} className={classes.rowHead}>
                <Grid container>
                    <Grid item xs={6}>
                        Paytm
                    </Grid>
                    <Grid item xs={6}>
                        {details.wallet_paytm_name} / {details.wallet_paytm_number}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowDetails}>
                <Grid container>
                    <Grid item xs={6}>
                        Google Pay
                    </Grid>
                    <Grid item xs={6}>
                        {details.wallet_gp_name} / {details.wallet_gp_number}
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
        
      </div>)
  }
}

export default withStyles(styles)(BankDetails)
