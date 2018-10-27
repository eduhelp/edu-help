import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import createPalette from '@material-ui/icons/Palette';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Hello from './hello.png';

const styles = {
  root: {
    display: 'flex',
    height: 300,
    
  },
 
 hed:{
   color:'#483C32',
   fontFamily:'Arial',
   fontSize:'25px',
 },

};


export class ContactUs extends React.Component {
  constructor() {
    super()
    
  }
  render() {
    const { classes } = this.props
    return (
            <div id="mainContainer">
            <Grid item xs={12}>
            
            <Grid container>
             <Grid item xs={1}>
               

               </Grid>
              <Grid item xs={3}>
                <img src={ Hello } width="125%" />

               </Grid>
               <Grid item xs={2}>
               

               </Grid>
               
               <Grid item xs={4}>
               <br /><br /><br />
               <h2 className={classes.hed}>Contact Us</h2>
               <p>- Reach Us support@Edu-help.live</p>
              
                </Grid>
              </Grid>
              </Grid>

            </div>


    )
}

}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch)

const mapStateToProps = state => ({
    // usersList: state.getIn(['RegistrationContainer', 'usersList']).toJS(),
})



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContactUs))
