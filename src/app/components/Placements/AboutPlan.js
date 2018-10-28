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
import Pdf from '../Home/EduHelp.pdf';
import How from './sample.png';
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
   backgroundImage: `url(${Background2})`,
   
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'noRepeat',
            backgroundOpacity:'30%',
            height:'299px',
},
  hed:{
    color:'#92d219',
   fontFamily:'Edwardian Script ITC',
   fontSize:'75px',
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

         <br />For more details<br /><a href = {Pdf} target = "_blank">Click Here</a>
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