import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import { getMyTree, getMyTopLevel } from '../../store/Placements/actionCreator'

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
 
};


export class MyTree extends React.Component {
  constructor(props) {
    super(props)
    
  }
  
  componentWillMount() {
      var sendData = {
          user_id : this.props.authInfo.data.data.user_id,
          max_level: 7
      }
      this.props.getMyTree(sendData)
      this.props.getMyTopLevel(sendData)
  }

  componentWillReceiveProps(nextProps) {
    console.log('my tree')
    console.log(nextProps.myTree)
    console.log(nextProps.myTopLevel)
  }

  render() {
    const { classes } = this.props
    return (
      <div id="mainContainer">
        my tree comes here
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
      getMyTree,
      getMyTopLevel,
  }, dispatch)

const mapStateToProps = state => ({
    authInfo: state.getIn(['RegistrationContainer', 'authInfo']).toJS(),
    myTree: state.getIn(['PlcementsContainer', 'myTree']).toJS(),
    myTopLevel: state.getIn(['PlcementsContainer', 'myTopLevel']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyTree))
