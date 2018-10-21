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
import ScrollableAnchor from 'react-scrollable-anchor';
import ReallySmoothScroll from 'really-smooth-scroll';
import Community from './whyThisCommunity'
import Works from './howItWorks'
import Smart from './smartSpreaders'
import Contact from './contactUs'



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
    backgroundColor:'#f9ff8a',
    color:'black',
    backgroundImage: ``
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
    color:'#0a6cf3',

  },
  pad:{
    padding:15,
  },
 
 jss635: {
    
    height: '144%',
    
 },
 hed:{
   color:'#483C32',
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
  backgroundColor:'red',
}
};


ReallySmoothScroll.shim();

export class Home extends React.Component {
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
      
      <div id="mainContainer" className={classes.hgt} >
          <Paper className={classes.paper}>
              <Typography className={classes.paper1}>
              <div className={classes.papers} > 
                 <center><span className={classes.hed}>About Us</span> <br/>Over years an effluent broadminded<br /><span className={classes.spa}> NRI’s & Entrepreneurs</span> were<br />thinking on a <span className={classes.spa}>“Idea”</span> that could change & <br /> solve millions of people Education expense<br /> issue through an innovative idea that flashed<br /> out in minds, that’s the birth story of <br /><span className={classes.spa}> “EduHelp”</span>
                 </center> 
                 <br />
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
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch)

const mapStateToProps = state => ({
    // usersList: state.getIn(['RegistrationContainer', 'usersList']).toJS(),
})
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home))
