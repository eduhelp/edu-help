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


export class Auth extends React.Component {
  constructor(props) {
    super(props)
    
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.authInfo.isAuth) {
        
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div id="mainContainer">
        Home page content comes here
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch)

const mapStateToProps = state => ({
    authInfo: state.getIn(['RegistrationContainer', 'authInfo']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Auth))
