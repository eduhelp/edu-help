import React from 'react'
import _ from 'lodash'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import UserStatus from './UserStatus'
// import LevelStatus from './LevelStatus'
import MyReferrals from './MyReferrals'
import GiveHelp from './GiveHelp'
import ReceiveHelp from './ReceiveHelp'
import MySmartSpreader from './MySmartSpreader'
import MyDisputes from '../Disputes/MyDisputes'
import DisputeDetails from '../Disputes/DisputeDetails'

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }

export class DashboardDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        myTreeLevels: [],
        tabValue:0,
        disputeObj: '',
        disputePage: ''
    }
  }

  componentWillMount() {
      this.setState({disputePage: ''})
      if (this.props.redirectPage == 'giveHelp') {
        this.setState({tabValue: 1})
      }
  }

  handleChange = (event, tabValue) => {
    this.setState({ tabValue, disputeObj: '', disputePage: '' });
  };

  confirmReceiver = (levelIndex, treeParentId, levelEligibility, treeParentInfo) => event => {
    this.props.confirmReceiverCB('ConfirmReceiver',levelIndex, treeParentId, levelEligibility, treeParentInfo)
  }

  makePayment = (paymentObject) => event => {
    this.props.makePaymentCB('MakePayment', paymentObject)
  }

  openDispute = (paymentObject) => event => {
    this.props.openDisputeCB('OpenDispute', paymentObject)
  }

  showDisputeDetails = (disputeObj) => {
      this.setState({disputeObj: disputeObj, disputePage: 'details', tabValue: 4})
  }

  cancelDetailsPage = () => {
    this.setState({disputeObj: '', disputePage: ''})
  }

  render() {
    const { classes } = this.props
    const { tabValue, disputePage, disputeObj } = this.state
    return (
        <div>
        <UserStatus 
            authInfo={this.props.authInfo}
            myPaymentList={this.props.myPaymentList}
        />
        <AppBar position="static">
            <Tabs value={tabValue} onChange={this.handleChange} className={classes.tabs}>
                <Tab label="My Referrals" />
                <Tab label="Give help" />
                <Tab label="Receive help" />
                <Tab label="Smart Spreader" />
                <Tab label="Disputes" />
            </Tabs>
        </AppBar>
        {/*tabValue === 0 && 
            <TabContainer>
                <LevelStatus 
                    myTree = {this.props.myTree}
                    classes={classes}
                />
            </TabContainer>
        */}
        {tabValue === 0 && 
            <TabContainer>
                <MyReferrals 
                    myReferrals={this.props.myReferrals}
                    myTree = {this.props.myTree}
                    classes={classes}
                />
            </TabContainer>
        }
        {tabValue === 1 && 
            <TabContainer>
                <GiveHelp 
                    authInfo={this.props.authInfo}
                    myPaymentList={this.props.myPaymentList}
                    myReceivedList = {this.props.myReceivedList}
                    myTopLevel={this.props.myTopLevel}
                    sponsorDetails={this.props.sponsorDetails}
                    confirmReceiverCB={this.props.confirmReceiverCB}
                    makePaymentCB={this.props.makePaymentCB}
                    openDisputeCB={this.props.openDisputeCB}
                    viewDisputeCB={this.showDisputeDetails}
                    myDisputes={this.props.myDisputes}
                    classes={classes}
                />
            </TabContainer>
        }
        {tabValue === 2 && 
            <TabContainer>
                <ReceiveHelp 
                    authInfo={this.props.authInfo}
                    myTree = {this.props.myTree}
                    myReceivedList = {this.props.myReceivedList}
                    myReferrals = {this.props.myReferrals}
                    levelPayments={this.props.levelPayments}
                    openDisputeCB={this.props.openDisputeCB}
                    viewDisputeCB={this.showDisputeDetails}
                    myDisputes={this.props.myDisputes}
                    classes={classes}
                    maintenanceStatus={this.props.maintenanceStatus}
                />
            </TabContainer>
        }
        {tabValue === 3 && 
            <TabContainer>
                <MySmartSpreader
                    authInfo={this.props.authInfo}
                    myTree = {this.props.myTree}
                    myReceivedList = {this.props.myReceivedList}
                    myReferrals = {this.props.myReferrals}
                    levelPayments={this.props.levelPayments}
                    mySmartSpreadersList={this.props.mySmartSpreadersList}
                    allActiveSSList={this.props.allActiveSSList}
                    classes={classes}
                    openDisputeCB={this.props.openDisputeCB}
                    viewDisputeCB={this.showDisputeDetails}
                    maintenanceStatus={this.props.maintenanceStatus}
                    myDisputes={this.props.myDisputes}
                    cancelTransaction={this.props.cancelTransaction}
                />
            </TabContainer>
        }
        {tabValue === 4 && 
            <TabContainer>
                {disputePage == 'details' ? (
                    <DisputeDetails
                        authInfo={this.props.authInfo}
                        disputeObj={disputeObj}
                        cancelCB={this.cancelDetailsPage}
                        classes={classes}
                    />
                ) : (
                    <MyDisputes
                        authInfo={this.props.authInfo}
                        title='My Disputes'
                        myDisputes = {this.props.myDisputes}
                        detailsCB={this.showDisputeDetails}
                        classes={classes}
                    />
                )}
                
            </TabContainer>
        }
    </div>)
  }
}

export default DashboardDetails