import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import { getAllDisputes } from '../../store/Disputes/actionCreator'
import MyDisputes from './MyDisputes'
import DisputeDetails from './DisputeDetails'

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
 
};


export class Disputes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        disputePage : '',
        disputeObj: ''
    }
  }

  componentWillMount() {
      this.props.getAllDisputes()
      this.setState({disputePage: ''})
  }

  componentWillReceiveProps(nextProps) {
      console.log('myPropsssss')
      console.log(nextProps.myDisputes)
  }
  showDisputeDetails = (disputeObj) => {
    this.setState({disputeObj: disputeObj, disputePage: 'details'})
  }

  cancelDetailsPage = () => {
    this.setState({disputeObj: '', disputePage: ''})
  }

  render() {
    const { classes, myDisputes, authInfo } = this.props
    const { disputeObj, disputePage } = this.state
    return (
      <div id="mainContainer">
        {disputePage == 'details' ? (
            <DisputeDetails
                authInfo={this.props.authInfo}
                disputeObj={disputeObj}
                cancelCB={this.cancelDetailsPage}
                classes={classes}
            />
        ) : (
            <MyDisputes
                authInfo={authInfo}
                title='All Disputes'
                myDisputes = {myDisputes}
                detailsCB={this.showDisputeDetails}
                classes={classes}
            />
        )}
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getAllDisputes,
  }, dispatch)

const mapStateToProps = state => ({
    authInfo: state.getIn(['RegistrationContainer', 'authInfo']).toJS(),
    myDisputes: state.getIn(['DisputesContainer', 'myDisputes']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Disputes))
