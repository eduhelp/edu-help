import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import { getUsers, changeUserStatus } from '../../store/Registration/actionCreator'
import Users from './Users'

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
 
};


export class UsersContainer extends React.Component {
  constructor() {
    super()
    
  }
  componentDidMount() {
      this.props.getUsers()
  }

  updateUserStatus = (payload) => {
    this.props.changeUserStatus(payload)
  }

  render() {
    const { classes } = this.props
    return (
      <div id="mainContainer">
        <Users 
          usersList={this.props.usersList} 
          updateUserStatusCB={this.updateUserStatus}
        />
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getUsers,
    changeUserStatus,
  }, dispatch)

const mapStateToProps = state => ({
    usersList: state.getIn(['RegistrationContainer', 'usersList']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UsersContainer))
