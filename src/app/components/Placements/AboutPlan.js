import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Pdf from '../Home/EduHelp_Final1.pdf';
import How from './sample1.png';
import Background2 from '../Home/logow.png';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '100%',
    flexShrink: 0,
    fontWeight:'700',
    
  },
  paper:{
    margin: '10',   
    padding:'10',
 
},
pic:{
   backgroundImage: `url(${How})`,
   
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'noRepeat',
            
            height:'299px',
},
  hed:{
    color:'#92d219',
   fontFamily:'Edwardian Script ITC',
   fontSize:'75px',
 },
 hed1:{
    color:'black',
   fontFamily:'Arial',
   fontSize:'25px',
 },
 hed2:{
    color:'#FF7F50',
   fontFamily:'Arial',
   fontSize:'63px',
   textDecoration: 'none',
   textAlign:'center',
   border: '1px solid red',
    padding: '10px',
    borderRadius: '50px 20px',
   

 },
  spa:{
    fontSize:'46px',
     fontFamily:'',
    color:'#92d219',

  },
  paperso:{
    fontFamily:'Arial',
    fontSize:'25px',
  
  }
  
});

class AboutPlan extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
         <center className={classes.paperso}><span className={classes.hed}>Helping Plan<br /></span>
        <br /><span className={classes.hed1}>For more details</span><br /><br /><a href = {Pdf} target = "_blank" style={{ textDecoration: 'none' }} ><span className={classes.hed2}>Click Here</span></a>
         <br />
            <br />  
            </center>
                 
        
        
        </Paper>
        <Paper className={classes.paper}>
        <div className={classes.pic}>
         
        </div>
        </Paper>
      </div>
    );
  }
}

AboutPlan.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutPlan);