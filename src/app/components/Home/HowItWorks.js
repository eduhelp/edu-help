import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ScrollableAnchor from 'react-scrollable-anchor'



const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  wrapper: {
    maxWidth: '100%',
  },
  paper:{
  	 
  	 height: 'auto',
     width: '100%',
    },
  heading: {
  	textAlign: 'center',
    paddingTop: 30,
    fontFamily: 'Arial',
    color: '#FF4500',
  },
  maincont: {
  	textAlign: 'center',
    fontFamily: 'Edwardian Script ITC',
    fontSize: 55,
    lineHeight: 1,
  },
  mainspan:{
  	textAlign: 'center',
    fontFamily: 'Edwardian Script ITC',
    fontSize: 55,
    lineHeight: 1,
    color: '#FF4500',
  },
  subheading: {
  	padding: 15,
  	fontFamily: 'Arial',
  	color: '#000000',
  },
  listing: {
  	fontFamily: 'Arial',
  	lineHeight: 2,
  },
  listing1: {
  	
  	fontFamily: 'Arial',
  	color: '#FF4500',
  	lineHeight: 2,
  },
  plink: {
  	padding:'20',
  },
  tabbar: {
  	backgroundColor: '#FF4500',
  	fontFamily: 'Arial',
  	color: '#ffffff',
  }
};



export class HowItWorks extends React.Component {
  constructor() {
    super()
    this.state = {
    	value: 0,
  	}
    
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  


  render() {
    const { classes } = this.props
    const { value } = this.state
    return (
      <div id="mainContainer" className={classes.wrapper}>
      	<h2 className={classes.subheading}>How it works</h2>
       		 <ul className={classes.listing}>
        		  <li>Since this community is created for a good cause of supporting peer to peer helping community for educational expenses, so every individual one ID for one mobile & AADHAR number</li>
        		  <li>You need to have an invitation link from the sponsor to get in to this community. Once you receive the link update the mandatory field details and get started </li>
        		  <li>I don’t have anyone to sponsor please email us @ </li>
        	 </ul>
			     <p className={classes.plink}>More details: PDF.link</p>
		       
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch)

const mapStateToProps = state => ({
    // usersList: state.getIn(['RegistrationContainer', 'usersList']).toJS(),
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HowItWorks))
