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


export class Disputes extends React.Component {
  constructor(props) {
    super(props)
    
  }
  

  render() {
    const { classes } = this.props
    return (
      <div id="mainContainer">
        Disputes page content comes here
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch)

const mapStateToProps = state => ({
    // usersList: state.getIn(['RegistrationContainer', 'usersList']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Disputes))
