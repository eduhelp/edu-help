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

};


export class whyThisCommunity extends React.Component {
  constructor() {
    super()
    
  }
  render() {
    const { classes } = this.props
    return (
            <div id="mainContainer">
            <h2 className={classes.hed}>Why This Community</h2>
              <ul>
                <li>WE believe that education is the most important tool you can receive, that can bring you most success in society today</li><br />
                <li>Education is definitely important in one`s life.  A gift of knowledge can bring us to the top of our dreams. It leads us to the right path and gives us a chance to have a wonderful life. </li><br />
                <li>Education is an important aspect that plays a huge role in the modern, industrialized world, which could transform<br />
                <ol className={classes.hed1}>
                <br />
                    
                    <p>–  Career Advancement </p>
                    <p>– Career Building</p>
                    <p>– Backbone of Society</p>
                     
                </ol>


                </li><br />
              </ul>


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
