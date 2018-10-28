import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';

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
    width: '100%',
    padding:'10',
  },
  mainheading: {
    textAlign: 'center',
    fontSize:'45px',
    fontFamily:'Edwardian Script ITC',
    lineHeight:'1.4',
  },
  mainheading2: {
    textAlign: 'center',
    fontSize:'30px',
    color: 'orange',
  },
  spanheading:{
    color: '#92d219',
  },
  bottomcont:{
    textAlign: 'center',
    fontSize:'30px',
    fontFamily:'Brush Script MT',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class About extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
        
        <p>TAMILSELVAN</p>
        </Paper>
      </div>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);