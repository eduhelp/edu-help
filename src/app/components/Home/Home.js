import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
<<<<<<< HEAD
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
=======
>>>>>>> c5de8b4621909d019edcec05de1dcb9469d72c61
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
<<<<<<< HEAD
import ScrollableAnchor from 'react-scrollable-anchor'



function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
=======
import createPalette from '@material-ui/icons/Palette';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import ReallySmoothScroll from 'really-smooth-scroll';
import Community from './whyThisCommunity'
import Works from './howItWorks'
import Smart from './smartSpreaders'
import Contact from './contactUs'
import Grid from '@material-ui/core/Grid';
import Background2 from './logow.png';
import Background1 from './bg1.png';
import Background from './kidsf.png';
>>>>>>> c5de8b4621909d019edcec05de1dcb9469d72c61


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};


 let imgUrl = 'logo.png'
const styles = {
  root: {
    display: 'flex',
    height: 300,
   
    
    
  },
  hgt:{
    height:'1000px',
  },
  bck:{
    backgroundColor:'#add8e6',
  },
  paper: {
    margin: 10,
    width:'100%',
    //textAlign: 'center',
    backgroundColor:'white',
   boxShadow:'none', 

  },
  tab:{
    textAlign:'left',
    color:'#1967d2',
   
  },
  papers:{
    color:'black',
    backgroundImage: `url(${Background2})`,
   
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'noRepeat',
            backgroundOpacity:'30%',
},
 paperso:{
    color:'black',
    lineHeight:1.5,

   
    
},



  
   paper1: {
    margin: 10,
    padding: 10,
    fontSize: '45px',
    fontFamily:'Edwardian Script ITC',
   // textAlign: 'center',
    //backgroundColor:'#ADD8E6',
    color:'black',
    
},
   paper2: {
   margin: 10,
   
    width:'100%',
    textAlign: 'left',
    //backgroundColor:'#ADD8E6',
    boxShadow:'none',
    height:'auto',
    
  },
  spa:{
    fontSize:'45px',
     fontFamily:'Edwardian Script ITC',
    color:'#92d219',

  },
  pad:{
    padding:15,
  },
<<<<<<< HEAD
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
  	color: '#FF4500',
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


=======
 
 jss635: {
    
    height: '144%',
    
 },
 hed:{
    color:'orange',
   fontFamily:'Arial',
   fontSize:'25px',
 },
 tb:{
  backgroundColor:'#1967d2',
  color:'white',
 },
 pading:{
   paddingBottom:50,
 },
apps:{
  backgroundColor:'orange',
  color:'#fbfcfd',

}
};


ReallySmoothScroll.shim();
>>>>>>> c5de8b4621909d019edcec05de1dcb9469d72c61

export class Home extends React.Component {
  constructor() {
    super()
<<<<<<< HEAD
    this.state = {
    	value: 0,
  	}
=======
  this.state = {
  value: 0,
  }
>>>>>>> c5de8b4621909d019edcec05de1dcb9469d72c61
    
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  
 handleChange = (event, value) => {
    this.setState({ value });
  };



  render() {
    const { classes } = this.props
    const { value } = this.state
    return (
<<<<<<< HEAD
      <div id="mainContainer" className={classes.wrapper}>
      	<Paper className={classes.paper}>
        <Typography >
        <h1 className={classes.heading}>About Us</h1>
        <p className={classes.maincont}>Over years an effluent broadminded<br /><span className={classes.mainspan}> NRI’s & Entrepreneurs</span> were<br/> thinking on a <span className={classes.mainspan}>“Idea”</span> that could change &<br /> solve millions of people Education expense,<br /> issue through an innovative idea that flashed<br /> out in minds, that’s the <span className={classes.mainspan}>birth story</span> of<br /> <span className={classes.mainspan}>“EduHelp”</span></p>
        
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} className={classes.tabbar}>
            <Tab label="Why this community" onClick={() => window.scrollTo(20, 500)}/>
            <Tab label="How it works" onClick={() => window.scrollTo(20, 500)} />
            <Tab label="SMART SPREADERS" onClick={() => window.scrollTo(20, 500)} />
            <Tab label="Contact us" onClick={() => window.scrollTo(20, 500)} />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>
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
        </TabContainer>}
        {value === 1 && <TabContainer>
        	<h2 className={classes.subheading}>How it works</h2>
       		<ul className={classes.listing}>
        		<li>Since this community is created for a good cause of supporting peer to peer helping community for educational expenses, so every individual one ID for one mobile & AADHAR number</li>
        		<li>You need to have an invitation link from the sponsor to get in to this community. Once you receive the link update the mandatory field details and get started </li>
        		<li>I don’t have anyone to sponsor please email us @ </li>
        	</ul>
			<p className={classes.plink}>More details: PDF.link</p>
		</TabContainer>}
        {value === 2 && <TabContainer>
        	<h2 className={classes.subheading}>SMART SPREADERS</h2>
			<ul className={classes.listing}>
        		<li>Smart Spreaders are the one who takes more initiative to explain and promote EduHelp good cause community to people in sponsoring many Help givers& receivers</li>
        		<li>SMART SPREADER gets an additional help benefit from others also where receiver’s are not eligible to receive from level below, then helper can wait till upline sponsor get eligible or he can pay to "smart spreaders" according to the queue of that level</li>
        	</ul>
        </TabContainer>}
        {value === 3 && <TabContainer>
        	<h2 className={classes.subheading}>Contact us</h2>
        	<p className={classes.plink}>Reach us @ …………@gmail.com</p>
        </TabContainer>}
        
      </Typography>
      	</Paper>
        
      </div>)
=======
      
      <div id="mainContainer" className={classes.hgt} >
          <Paper className={classes.paper}>
            <Typography className={classes.paper1}>
              <div className={classes.papers} > 
                 <center className={classes.paperso}><span className={classes.hed}>About Us<br /></span>Over years an effluent broadminded<br /><span className={classes.spa}> NRI’s & Entrepreneurs</span> were<br />thinking on a <span className={classes.spa}>“Idea”</span> that could change & <br />solve millions of people Education expense<br />issue through an innovative idea that flashed<br /> out in minds, that’s the birth story of <br /><span className={classes.spa}>“EduHelp”</span>
                  
                 </center>
                 </div> 
                  <AppBar position="static" className={classes.apps} >
                  <Tabs value={value} onChange={this.handleChange}>
                    <Tab Scrollchor  label="Why This Community" onClick={() =>window.scrollTo(20,500)} />
                    <Tab label="How it works" onClick={() =>window.scrollTo(20,500)} />
                    <Tab label="Smart Spreaders" onClick={() =>window.scrollTo(20,500)}/>
                    <Tab label="Contact Us" onClick={() =>window.scrollTo(20,500)} />
                  </Tabs>
                </AppBar>
                    
                
          {value === 0 && <TabContainer className={classes.tab}>
          <Community/>
          </TabContainer>}
            {value === 1 && <TabContainer className={classes.tab}>
             <Works/>
            </TabContainer>}
            {value === 2 && <TabContainer className={classes.tab}>
             <Smart/>
            </TabContainer>}
            {value === 3 && <TabContainer className={classes.tab}> <Contact/>
             </TabContainer>}
            
            </Typography>
          
          </Paper>
      
                     
          <br />
         
         
     </div>)
>>>>>>> c5de8b4621909d019edcec05de1dcb9469d72c61
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch)

const mapStateToProps = state => ({
    // usersList: state.getIn(['RegistrationContainer', 'usersList']).toJS(),
})
<<<<<<< HEAD

=======
>>>>>>> c5de8b4621909d019edcec05de1dcb9469d72c61
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

<<<<<<< HEAD
=======

>>>>>>> c5de8b4621909d019edcec05de1dcb9469d72c61
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home))
