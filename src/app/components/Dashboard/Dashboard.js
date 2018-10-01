import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getPaymentDetails, confirmLevelPayment } from '../../store/Payments/actionCreator'

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
};


export class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        confirmStatus: {
            makePaymentStatus: {
                level1: false,
                level2: false,
                level3: false,
                level4: false,
                level5: false,
                level6: false,
                level7: false
            },
            receivePaymentStatus: {
                level1: false,
                level2: false,
                level3: false,
                level4: false,
                level5: false,
                level6: false,
                level7: false
            },
        }
    }
  }

  componentWillReceiveProps(nextProps) {
    const user_id =  nextProps.authInfo.data.data.user_id
    nextProps.userPayments.map((option) => {
        if(option.payment_level === 1 && option.from_id === user_id) {
            this.setState({ confirmStatus: { makePaymentStatus: { level1: true } } })
        }
        if(option.payment_level === 1 && option.to_id === user_id) {
            this.setState({ confirmStatus: { receivePaymentStatus: { level1: true } } })
            this.setState({ leve1_info: option })
        }
    })
  }

  componentDidMount() {
      var sendData = {
          user_id: this.props.authInfo.data.data.user_id
      }
      this.props.getPaymentDetails(sendData)
  }



  render() {
    const { classes } = this.props
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
                           <h2> {this.props.authInfo.data.data.status}</h2>
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
                                        <Grid item xs={4}>
                                            <Link className={classes.navLink} to="/make_payment/1">To Sponsor</Link>
                                        </Grid>
                                        <Grid item xs={4}>
                                            Rs.100
                                        </Grid>
                                        <Grid item xs={4}>
                                        Paid - status 
                                        </Grid>
                                    </Grid>
                                    {this.props.authInfo.data.data.status == 'Active' && 
                                    <div>
                                    <Grid container className={classes.dataRowEven}>
                                        <Grid item xs={4}>
                                            <Link className={classes.navLink} to="/make_payment/2">Level 2</Link>
                                        </Grid>
                                        <Grid item xs={4}>
                                            Rs.150
                                        </Grid>
                                        <Grid item xs={4}>
                                            -- status -- 
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.dataRowOdd}>
                                        <Grid item xs={4}>
                                            Level 3
                                        </Grid>
                                        <Grid item xs={4}>
                                            Rs.400
                                        </Grid>
                                        <Grid item xs={4}>
                                            -- status -- 
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.dataRowEven}>
                                        <Grid item xs={4}>
                                            Level 4
                                        </Grid>
                                        <Grid item xs={4}>
                                            Rs.2000
                                        </Grid>
                                        <Grid item xs={4}>
                                            -- status -- 
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.dataRowOdd}>
                                        <Grid item xs={4}>
                                            Level 5
                                        </Grid>
                                        <Grid item xs={4}>
                                            Rs.4000
                                        </Grid>
                                        <Grid item xs={4}>
                                            -- status -- 
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.dataRowEven}>
                                        <Grid item xs={4}>
                                            Level 6
                                        </Grid>
                                        <Grid item xs={4}>
                                            Rs.10000
                                        </Grid>
                                        <Grid item xs={4}>
                                            -- status -- 
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.dataRowOdd}>
                                        <Grid item xs={4}>
                                            Level 7
                                        </Grid>
                                        <Grid item xs={4}>
                                            Rs.2000
                                        </Grid>
                                        <Grid item xs={4}>
                                            -- status -- 
                                        </Grid>
                                    </Grid>
                                    </div>
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
                                        <Grid item xs={4}>
                                            <Link className={classes.navLink} to="/receive_payment/1">Level1 Receive Payment List</Link>
                                        </Grid>
                                        <Grid item xs={4}>
                                            Rs.100  
                                        </Grid>
                                        <Grid item xs={4}>
                                            confirm now
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.dataRowEven}>
                                        <Grid item xs={4}>
                                            <Link className={classes.navLink} to="/receive_payment/2">Level 2</Link>
                                        </Grid>
                                        <Grid item xs={4}>
                                            Rs.150
                                        </Grid>
                                        <Grid item xs={4}>
                                            -- status -- 
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.dataRowOdd}>
                                        <Grid item xs={4}>
                                            Level 3
                                        </Grid>
                                        <Grid item xs={4}>
                                            Rs.400
                                        </Grid>
                                        <Grid item xs={4}>
                                            -- status -- 
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.dataRowEven}>
                                        <Grid item xs={4}>
                                            Level 4
                                        </Grid>
                                        <Grid item xs={4}>
                                            Rs.2000
                                        </Grid>
                                        <Grid item xs={4}>
                                            -- status -- 
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.dataRowOdd}>
                                        <Grid item xs={4}>
                                            Level 5
                                        </Grid>
                                        <Grid item xs={4}>
                                            Rs.4000
                                        </Grid>
                                        <Grid item xs={4}>
                                            -- status -- 
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.dataRowEven}>
                                        <Grid item xs={4}>
                                            Level 6
                                        </Grid>
                                        <Grid item xs={4}>
                                            Rs.10000
                                        </Grid>
                                        <Grid item xs={4}>
                                            -- status -- 
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.dataRowOdd}>
                                        <Grid item xs={4}>
                                            Level 7
                                        </Grid>
                                        <Grid item xs={4}>
                                            Rs.2000
                                        </Grid>
                                        <Grid item xs={4}>
                                            -- status -- 
                                        </Grid>
                                    </Grid>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getPaymentDetails,
    confirmLevelPayment,
  }, dispatch)

const mapStateToProps = state => ({
    authInfo: state.getIn(['RegistrationContainer', 'authInfo']).toJS(),
    userPayments: state.getIn(['PaymentsContainer', 'userPayments']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard))
