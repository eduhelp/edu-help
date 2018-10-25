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
    color: '#FF0000',
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
    color: '#FF0000',
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
    color: '#FF0000',
    lineHeight: 2,
  },
  plink: {
    padding:'20',
  },
  tabbar: {
    backgroundColor: '#FF0000',
    fontFamily: 'Arial',
    color: '#ffffff',
  }
};



export class ContactUs extends React.Component {
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
      	
            <h2 className={classes.subheading}>Contact us</h2>
            <p className={classes.plink}>Reach us @ …………@gmail.com</p>
          
        
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch)

const mapStateToProps = state => ({
    // usersList: state.getIn(['RegistrationContainer', 'usersList']).toJS(),
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContactUs))
