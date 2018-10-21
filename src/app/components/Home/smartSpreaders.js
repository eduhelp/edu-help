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


export class smartSpreaders extends React.Component {
  constructor() {
    super()
    
  }
  render() {
    const { classes } = this.props
    return (
            <div id="mainContainer">
            <h2 className={classes.hed}>Smart Spreaders</h2>
              <ul>
                <li> Smart Spreaders are the one who takes more initiative to explain and promote EduHelp good cause community to people in sponsoring many Help givers& receivers</li><br />
                <li> SMART SPREADER gets an additional help benefit from others also where receiver’s are not eligible to receive from level below, then helper can wait till upline sponsor get eligible or he can pay to "smart spreaders" according to the queue of that level </li><br />
                
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
smartSpreaders.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(smartSpreaders))
