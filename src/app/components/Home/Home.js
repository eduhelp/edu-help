import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  paper:{
  	 
  	 height: 'auto',
     width: '100%',
     
  	},
  heading: {
  	textAlign: 'center',
    paddingTop: 30,
    fontFamily: 'Arial',
    color: '#2196f3',
  },
  maincont: {
  	textAlign: 'center',
    fontFamily: 'Edwardian Script ITC',
    fontSize: 36,
    lineHeight: 1,
  },
  mainspan:{
  	textAlign: 'center',
    fontFamily: 'Edwardian Script ITC',
    fontSize: 36,
    lineHeight: 1,
    color: '#2196f3',
  },
  subheading: {
  	padding: 10,
  	fontFamily: 'Arial',
  	color: '#2196f3',
  },
  listing: {
  	fontFamily: 'Arial',
  },
  listing1: {
  	
  	fontFamily: 'Arial',
  	padding:'10',
  	color: '#2196f3',
  },
  plink: {
  	padding:'10',
  },
};



export class Home extends React.Component {
  constructor() {
    super()
    
  }
  

  render() {
    const { classes } = this.props
    return (
      <div id="mainContainer">
      	<Paper className={classes.paper}>
        <Typography >
        <h1 className={classes.heading}>About Us</h1>
        <p className={classes.maincont}>Over years an effluent broadminded<br /><span className={classes.mainspan}> NRI’s & Entrepreneurs</span> were<br/> thinking on a <span className={classes.mainspan}>“Idea”</span> that could change &<br /> solve millions of people Education expense,<br /> issue through an innovative idea that flashed<br /> out in minds, that’s the <span className={classes.mainspan}>birth story</span> of<br /> <span className={classes.mainspan}>“EduHelp”</span></p>
        
        <h2 className={classes.subheading}>Why this community</h2>
        <ul className={classes.listing}>
        	<li>WE believe that <strong>education</strong> is the most important tool you can receive, that can bring you most <strong>success</strong> in society today</li>
        	<li>Education is definitely important in one's life.  A gift of knowledge can bring us to the top of our dreams. It leads us to the right path and gives us a chance to have a wonderful life. </li>
        	<li>Education is an important aspect that plays a huge role in the modern, industrialized world, which could transform
        		<ul className={classes.listing1}>
        			<ol>- Career Advancement </ol>
        			<ol>- Character Building</ol>
        			<ol>- Backbone of Society </ol>

        		</ul>
        	</li>


        </ul>
       	<h2 className={classes.subheading}>How it works</h2>
       	<ul className={classes.listing}>
        	<li>Since this community is created for a good cause of supporting peer to peer helping community for educational expenses, so every individual one ID for one mobile & AADHAR number</li>
        	<li>You need to have an invitation link from the sponsor to get in to this community. Once you receive the link update the mandatory field details and get started </li>
        	<li>I don’t have anyone to sponsor please email us @ </li>
        </ul>
		<p className={classes.plink}>More details: PDF.link</p>

		<h2 className={classes.subheading}>SMART SPREADERS</h2>
		<ul className={classes.listing}>
        	<li>Smart Spreaders are the one who takes more initiative to explain and promote EduHelp good cause community to people in sponsoring many Help givers& receivers</li>
        	<li>SMART SPREADER gets an additional help benefit from others also where receiver’s are not eligible to receive from level below, then helper can wait till upline sponsor get eligible or he can pay to "smart spreaders" according to the queue of that level</li>
        </ul>
        <h2 className={classes.subheading}>Contact us</h2>
        <p className={classes.plink}>Reach us @ …………@gmail.com</p>
        </Typography>

        </Paper>
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch)

const mapStateToProps = state => ({
    // usersList: state.getIn(['RegistrationContainer', 'usersList']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home))
