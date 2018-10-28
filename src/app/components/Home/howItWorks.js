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
import How from './how.png';
import Pdf from './EduHelp.pdf';
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

 lii:{
   fontSize:'16px',
   color:'black',
   
 },
};


export class howItWorks extends React.Component {
  constructor() {
    super()
    
  }
  render() {
    const { classes } = this.props
    return (
            <div id="mainContainer">
              <Grid item xs={12}><h2 className={classes.hed}>How it works</h2>
              <Grid container>
              <Grid item xs={3}>
                <img src={ How } />

               </Grid>
                <Grid item xs={2}>
               

               </Grid>
               <Grid item xs={6}>
                  
                  <ul>
                    <li className={classes.lii}>Since this community is created for a good cause of supporting peer to peer helping community for educational expenses, so every individual one ID for one mobile & AADHAR number</li><br />
                    <li className={classes.lii}>You need to have an invitation link from the sponsor to get in to this community. Once you receive the link update the mandatory field details and get started  </li><br />
                    <li className={classes.lii}>If you don’t have anyone to sponsor please email us<br />
                    </li><br />
                   <li className={classes.lii}>For more details:<a href = {Pdf} target = "_blank">Download Pdf</a>

                   

                   </li><br />
                   <br />
                  </ul>
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
howItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(howItWorks))
