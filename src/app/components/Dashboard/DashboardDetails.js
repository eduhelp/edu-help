import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export class DashboardDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        myTreeLevels: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('authInfo')
    console.log(nextProps.authInfo)
    console.log('sponsorPayments')
    console.log(nextProps.sponsorPayments)
    console.log('myTree')
    console.log(nextProps.myTree)
    console.log('myTopLevel')
    console.log(nextProps.myTopLevel)
    console.log('myPaymentList')
    console.log(nextProps.myPaymentList)
  }

  confirmReceiver = (levelIndex, treeParentId, levelEligibility, treeParentInfo) => event => {
    this.props.confirmReceiverCB('ConfirmReceiver',levelIndex, treeParentId, levelEligibility, treeParentInfo)
  }

  makePayment = (paymentObject) => event => {
    console.log('ready to make payemnt to ')
    console.log(paymentObject)
    this.props.makePaymentCB('MakePayment', paymentObject)
  }
 
  render() {
    const { classes } = this.props
    const myTreeLevels = _.groupBy(this.props.myTree, (obj) => { return obj.level })
    return (
      <div id="mainContainer">
        <Grid container>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Grid container>
                        <Grid item xs={6}>
                           <h2> Account Status </h2>
                        </Grid>
                        <Grid item xs={6}>
                           <h2> {this.props.authInfo.data.status}</h2>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <Grid container>
                                <Grid item xs={12} className={classes.marginLeft20}>
                                    <h3> Make Payments </h3>
                                </Grid>
                                <Grid item xs={12} className={classes.marginLeft20}>
                                    <Grid container className={classes.dataRowOdd}>
                                        <Grid item xs={3}>
                                            Level
                                        </Grid>
                                        <Grid item xs={6}>
                                            Parent (User ID)
                                        </Grid>
                                        <Grid item xs={3}>
                                            Status
                                        </Grid>
                                    </Grid>
                                    {this.props.myTopLevel.map((option, key) => {
                                        const curPaymentObject = _.find(this.props.myPaymentList, (n) => { return (n.payment_level == option.level) })
                                        console.log(curPaymentObject)
                                        //if(option.level > 1)  {
                                            const levText = 'level '+option.level
                                            return (
                                                <Grid container className={classes.dataRowEven} key={key}>
                                                    <Grid item xs={3}>
                                                        {levText}
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {option.nodeInfo.username} ({option.nodeInfo.user_id})
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        {(curPaymentObject) ? (
                                                            <div>
                                                                {(curPaymentObject.paid_status == 'Completed') ? (
                                                                    <span>Done</span>
                                                                ) : (curPaymentObject.paid_status == 'Pending') ? (
                                                                    <span className={classes.navLink} onClick={this.makePayment(curPaymentObject)}>Make Payment</span>
                                                                ) : (
                                                                    <span>Issue with payment, contact admin</span>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <span className={classes.navLink} onClick={this.confirmReceiver(option.level, option.nodeInfo.user_id, option.levelEligibility, option.nodeInfo)}>Confirm Receiver</span>
                                                        )}
                                                    </Grid>
                                                </Grid>
                                            )
                                        //}
                                    })
                                    }
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <Grid container>
                                <Grid item xs={12} className={classes.marginLeft20}>
                                    <h3> Receive Payments </h3>
                                </Grid>
                                <Grid item xs={12} className={classes.marginLeft20}>
                                    <Grid container className={classes.dataRowOdd}>
                                        <Grid item xs={3}>
                                            Level
                                        </Grid>
                                        <Grid item xs={6}>
                                            No of Entries
                                        </Grid>
                                        <Grid item xs={3}>
                                            Status
                                        </Grid>
                                    </Grid>
                                    {this.props.sponsorPayments.length > 0 &&
                                        <Grid container className={classes.dataRowEven}>
                                            <Grid item xs={3}>
                                                <Link className={classes.navLink} to="/receive_payment/1">From Referrals</Link>
                                            </Grid>
                                            <Grid item xs={6}>
                                                {this.props.sponsorPayments.length}
                                            </Grid>
                                            <Grid item xs={3}>
                                                -- Status --
                                            </Grid>
                                        </Grid>
                                    }
                                    {Object.keys(myTreeLevels).map((key) => {
                                        if (key > 1) {
                                            const receivePaymentLink = '/receive_payment/'+key
                                            return (
                                                <Grid container className={classes.dataRowEven} key={key}>
                                                    <Grid item xs={3}>
                                                        <Link className={classes.navLink} to={receivePaymentLink}>Level {key}</Link>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {myTreeLevels[key].length}
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        -- Status --
                                                    </Grid>
                                                </Grid>
                                            )
                                        }
                                    })
                                    }
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>)
  }
}

export default DashboardDetails