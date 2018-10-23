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
import Why from './why.png';

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
 para:{
   color:'black',
   fontSize:'16px',
   
 },
 lii:{
   fontSize:'16px',
   color:'black',
   
 },

};


export class whyThisCommunity extends React.Component {
  constructor() {
    super()
    
  }
  render() {
    const { classes } = this.props
    return (
            <div id="mainContainer">
            <Grid item xs={12}><h2 className={classes.hed}>Why This Community</h2>
            <Grid container>
            <Grid item xs={6}>
              <ul>
                <li className={classes.lii}>WE believe that education is the most important tool you can receive, that can bring you most success in society today</li><br />
                <li className={classes.lii}>Education is definitely important in one`s life.  A gift of knowledge can bring us to the top of our dreams. It leads us to the right path and gives us a chance to have a wonderful life. </li><br />
                <li className={classes.lii}>Education is an important aspect that plays a huge role in the modern, industrialized world, which could transform<br />
                <ol className={classes.lii}>
                <br />
                    
                    <p className={classes.para}>–  Career Advancement </p>
                    <p className={classes.para}>– Career Building</p>
                    <p className={classes.para}>– Backbone of Society</p>
                     
                </ol>


                </li><br />
              </ul>
              </Grid>
              <Grid item xs={1}>
               

               </Grid>
               <Grid item xs={3}>
                <img src={ Why } />

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
whyThisCommunity.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(whyThisCommunity))
