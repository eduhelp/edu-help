import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    display: 'flex',
    height: 300,
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
        <center>EDU - HELP</center>
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
