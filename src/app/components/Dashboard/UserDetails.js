import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getFormatedDate } from '../Common/Utils'
import { getUserDetails } from '../../store/Registration/actionCreator'

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  rowHead: {
    padding: 5,
    background: '#ebebeb',
  },
  rowDetails: {
    padding: 5,
    background: '#fbfbfb',
  },
};


export class UserDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        details: ''
    }
    
  }

  componentDidMount() {
      if (this.props.mode === 'get') {
          const sendData = {
              user_id: this.props.user_id
          }
          this.props.getUserDetails(sendData)
      } else {
        this.setState({ details: this.props.details })
      }
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.userDetails) {
          this.setState({ details: nextProps.userDetails })
      }
  }

  render() {
    const { classes } = this.props
    const { details } = this.state
    return (
      <div id="mainContainer">
        <Grid container>
           
            <Grid item xs={12} className={classes.rowHead}>
                <Grid container>
                    <Grid item xs={6}>
                        User Name 
                    </Grid>
                    <Grid item xs={6}>
                        {details.username}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowDetails}>
                <Grid container>
                    <Grid item xs={6}>
                        Email
                    </Grid>
                    <Grid item xs={6}>
                        {details.email}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowHead}>
                <Grid container>
                    <Grid item xs={6}>
                        Mobile 
                    </Grid>
                    <Grid item xs={6}>
                        {details.mobile}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowDetails}>
                <Grid container>
                    <Grid item xs={6}>
                        State
                    </Grid>
                    <Grid item xs={6}>
                        {details.state}
                    </Grid>
                </Grid>
            </Grid>
           
            <Grid item xs={12} className={classes.rowHead}>
                <Grid container>
                    <Grid item xs={6}>
                        Pincode
                    </Grid>
                    <Grid item xs={6}>
                        {details.pincode}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowDetails}>
                <Grid container>
                    <Grid item xs={6}>
                        Sponsor Id
                    </Grid>
                    <Grid item xs={6}>
                        {details.sponsor_id}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getUserDetails,
  }, dispatch)

const mapStateToProps = state => ({
    userDetails: state.getIn(['RegistrationContainer', 'userDetails']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserDetails))
