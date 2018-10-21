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


export class howItWorks extends React.Component {
  constructor() {
    super()
    
  }
  render() {
    const { classes } = this.props
    return (
            <div id="mainContainer">
            <h2 className={classes.hed}>How it works</h2>
              <ul>
                <li>Since this community is created for a good cause of supporting peer to peer helping community for educational expenses, so every individual one ID for one mobile & AADHAR number</li><br />
                <li>You need to have an invitation link from the sponsor to get in to this community. Once you receive the link update the mandatory field details and get started  </li><br />
                <li>I don’t have anyone to sponsor please email us<br />
                </li>More details: PDF<a href='#'>&nbsp;click here</a><br />
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
howItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(howItWorks))
