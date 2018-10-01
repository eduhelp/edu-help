import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import { getUsers } from '../../store/Registration/actionCreator'

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
  componentDidMount() {
      this.props.getUsers()
  }

  render() {
    const { classes } = this.props
    return (
      <div id="mainContainer">
        Home page content comes here
        <div>
            { this.props.usersList.map((option,key) => {
            return (
                <div key={key}>{option.user_id} - {option.name} - {option.email} - {option.mobile} - {option.status} - <span onClick={this.changeStatus(option.user_id, option.sponsor_id)}>Change Status</span></div>
            )
            })}
        </div>
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getUsers
  }, dispatch)

const mapStateToProps = state => ({
    usersList: state.getIn(['RegistrationContainer', 'usersList']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home))
