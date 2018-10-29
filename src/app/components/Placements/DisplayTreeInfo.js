import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UserDetails from '../Dashboard/UserDetails'
import Dialog from '../Common/Dialog'

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  rowHead: {
    padding: 5,
    background: '#f48e3682',
  },
  rowOdd: {
    padding: 10,
    background: '#f28d3c21',
  },
  rowEven: {
    padding: 10,
    background: '#f28d3c38',
  },
  navLink: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};


export class DisplayTreeInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        dialogOpenStatus: false,
        dialogTitle: '',
        dialogContent: ''
    }
  }

  componentWillReceiveProps(nextProps) {
      console.log('details >>> ')
      console.log(nextProps.details)
      //this.props.getUserDetails()
  }
  
  showUserDetails = (userInfo) => event => {
    this.setState({
        dialogOpenStatus: true,
        dialogTitle: "User Details",
        dialogContent: <UserDetails details={userInfo} mode='show' />
    })
  }

  getUserDetails = (user_id) => event => {
    this.setState({
        dialogOpenStatus: true,
        dialogTitle: "User Details",
        dialogContent: <UserDetails user_id={user_id} mode='get' />
    })
  }

  closeDialog = () => {
    this.setState({
      dialogOpenStatus: false,
      dialogTitle: '',
      dialogContent: ''
    })
  }
  render() {
    const { classes, details } = this.props
    return (
        <Grid container>
            <Dialog
                dialogOpenStatus = {this.state.dialogOpenStatus}
                dialogTitle = {this.state.dialogTitle}
                dialogContent = {this.state.dialogContent}
                closeCB = {this.closeDialog}
            />
           
            {details.map((option, index) => {
                return (
                    <Grid item xs={12} className={index %2 ? classes.rowEven : classes.rowOdd} key={index}>
                        <Grid container>
                            <Grid item xs={4}>
                                <span className={classes.navLink} onClick={this.showUserDetails(option.nodeInfo)}>
                                    {option.nodeInfo.username} 
                                </span>
                            </Grid>
                             <Grid item xs={4}>
                                <span className={classes.navLink} onClick={this.getUserDetails(option.nodeInfo.sponsor_id)}>
                                    {option.nodeInfo.sponsor_name}
                                </span>
                            </Grid>
                            
                            
                        </Grid>
                    </Grid>
                    
                                         
                           
                        
                )
            })}
      </Grid>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch)

const mapStateToProps = state => ({
    // usersList: state.getIn(['RegistrationContainer', 'usersList']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisplayTreeInfo))
