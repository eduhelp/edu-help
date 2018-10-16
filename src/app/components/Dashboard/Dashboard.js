import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import { DashboardDetails } from './DashboardDetails'

import { getMyTree, getMyTopLevel, getActiveSmartSpreader } from '../../store/Placements/actionCreator'
import { getUserDetails } from '../../store/Registration/actionCreator'
import { getReceivedPaymentList, getMyPaymentList, getLevelPayments, getReceivedPayments } from '../../store/Payments/actionCreator'
import ConfirmReceiver from '../Payments/ConfirmReceiver';
import MakePayment from "../Payments/MakePayment"

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  paper: {
    margin: '10px 5px',
    padding: '10px',
  },
  marginLeft20: {
    marginLeft: 20,
  },
  dataRowOdd: {
    padding: 10,
    background: '#ebebeb',
  },
  dataRowEven: {
    padding: 10,
    background: '#efefef',
  },
  navLink: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};


export class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        currentPage : 'Dashboard',
        levelIndex: '',
        treeParentID: '',
        treeParentInfo: '',
        levelEligibility: false,
        makePaymentObj: {},
    }
    
  }
  
  componentWillMount() {
    var sendData = {
        user_id: this.props.authInfo.data.user_id,
        max_level: 7
    }
    this.props.getMyTree(sendData)
    this.props.getMyTopLevel(sendData)
    var sponsorData = {
      user_id: this.props.authInfo.data.sponsor_id,
    }
    this.props.getUserDetails(sponsorData)
    var listData = {
      user_id: this.props.authInfo.data.user_id,
      payment_level: 1
    }
    // this.props.getReceivePaymentList(listData)
    this.props.getMyPaymentList(sendData)
    this.props.getLevelPayments()
    this.props.getReceivedPaymentList(sendData)
    // this.props.getActiveSmartSpreader()
}

confirmReceiver = (currentPage, levelIndex, treeParentID, levelEligibility, treeParentInfo) => {
    console.log('confirm receiver - dashboard')
    if(!levelEligibility) {
        var sendData = {
            payment_level: levelIndex
        }
        this.props.getActiveSmartSpreader(sendData)
    }
    console.log(currentPage, levelIndex, treeParentID, levelEligibility, treeParentInfo)
    this.setState({
        currentPage,
        levelIndex,
        treeParentID,
        levelEligibility,
        treeParentInfo
    })
  }

  makePayment = (currentPage,makePaymentObj) => {
    this.setState({
        currentPage,
        makePaymentObj
    })
  }

  cancelCallBack = () => {
    this.setState({
        currentPage: 'Dashboard'
    })
  }

  render() {
    const { classes } = this.props
    let DisplayPage = ''
    if (this.state.currentPage === 'Dashboard') {
        DisplayPage = <DashboardDetails 
            authInfo={this.props.authInfo}
            myTree={this.props.myTree}
            myTopLevel={this.props.myTopLevel}
            sponsorDetails={this.props.sponsorDetails}
            // sponsorPayments={this.props.sponsorPayments}
            myPaymentList={this.props.myPaymentList}
            myReceivedList={this.props.myReceivedList}
            classes={classes}
            confirmReceiverCB={this.confirmReceiver}
            makePaymentCB={this.makePayment}
            />
    } else if (this.state.currentPage === 'ConfirmReceiver') {
        var levelObj = _.find(this.props.levelPayments, (n) => { return n.level_index == this.state.levelIndex} )
        DisplayPage = <ConfirmReceiver
            authInfo={this.props.authInfo}
            levelPayment={levelObj.level_payment}
            sponsorDetails={this.props.sponsorDetails}
            levelIndex={this.state.levelIndex}
            treeParentID={this.state.treeParentID}
            treeParentInfo={this.state.treeParentInfo}
            levelEligibility={this.state.levelEligibility}
            cancelCB={this.cancelCallBack}
        />
    } else if (this.state.currentPage === 'MakePayment') {
        var levelObj = _.find(this.props.levelPayments, (n) => { return n.level_index == this.state.levelIndex} )
        DisplayPage = <MakePayment
            authInfo={this.props.authInfo}
            makePaymentObj={this.state.makePaymentObj}
            cancelCB={this.cancelCallBack}
        />
    }
    
    return (
        <div>
            {DisplayPage}
        </div>
      )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getMyTree,
    getMyTopLevel,
    getUserDetails,
    getReceivedPaymentList,
    getMyPaymentList,
    getLevelPayments,
    getActiveSmartSpreader,
    getReceivedPayments,
  }, dispatch)

const mapStateToProps = state => ({
    authInfo: state.getIn(['RegistrationContainer', 'authInfo']).toJS(),
    levelPayments: state.getIn(['PaymentsContainer', 'levelPayments']).toJS(),
    myTree: state.getIn(['PlcementsContainer', 'myTree']).toJS(),
    myTopLevel: state.getIn(['PlcementsContainer', 'myTopLevel']).toJS(),
    sponsorDetails: state.getIn(['RegistrationContainer', 'userDetails']).toJS(),
    // sponsorPayments: state.getIn(['PaymentsContainer', 'receivePaymentsList']).toJS(),
    myPaymentList: state.getIn(['PaymentsContainer', 'myPaymentList']).toJS(),
    myReceivedList: state.getIn(['PaymentsContainer', 'myReceivedList']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard))
