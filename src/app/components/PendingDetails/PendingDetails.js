import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getFormatedDate } from '../Common/Utils'
import { getPendingDetails } from '../../store/Disputes/actionCreator'
import GiveReceivePending from './GiveReceivePending'
import SmartSpreaderPending from './SmartSpreaderPending'
import { Link } from 'react-router-dom'

const styles = {
    root: {
        display: 'flex',
        height: 300,
    },
    paper: {
        margin: 10,
        padding: 10,
    },
    marginLeft20: {
        marginLeft: 20,
    },
    textField: {
        width:250,
    },
    rowHead: {
        padding: 10,
        background: '#333',
        color: '#fff'
      },
      rowOdd: {
        padding: 10,
        background: '#ebebeb',
      },
      rowEven: {
        padding: 10,
        background: '#fbfbfb',
      },
    notifyTitle: {
        fontSize: 18,
        fontWeight: 400,
    },
    msgRow: {
        fontSize: 14,
        padding: '10px 0px',
    },
    paperCenter: {
        padding: 20,
        textAlign: 'center',
      },
    navLink: {
        textDecoration: 'underline',
        cursor: 'pointer',
    },
};


export class PendingDetails extends React.Component {
  constructor(props) {
    super(props)
    
  }

  componentWillMount () {
    const sendData = {
        user_id: this.props.authInfo.data.user_id
    }
      this.props.getPendingDetails(sendData)
  }

  

  render() {
    const { classes, pendingDetails, authInfo } = this.props
    console.log('pendingDetails')
    console.log(pendingDetails)
    return (
      <div id="mainContainer">
        {authInfo.data.bank_details ? (
            <div>
                <GiveReceivePending pendingDetails={pendingDetails.giveHelp} title='Give Help' helpText='Help To' />
                <GiveReceivePending pendingDetails={pendingDetails.receiveHelp} title='Receive Help' helpText='Help From' />
                <SmartSpreaderPending pendingDetails={pendingDetails.smartSpreader} title='Smart Spreader' helpText='Smart Spreader' />
            </div>
        ) : (
            <Paper className={classes.paperCenter}>
                Pleae add your <Link className={classes.navLink} to='/profile/bank' >bank details</Link>, to view pending list.
            </Paper>
        )}
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getPendingDetails,
  }, dispatch)

const mapStateToProps = state => ({
    authInfo: state.getIn(['RegistrationContainer', 'authInfo']).toJS(),
    pendingDetails: state.getIn(['DisputesContainer', 'pendingDetails']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PendingDetails))
