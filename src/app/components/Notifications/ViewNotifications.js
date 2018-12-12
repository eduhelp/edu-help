import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getFormatedDate } from '../Common/Utils'
import { getNotifications } from '../../store/Disputes/actionCreator'

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
    rowOne: {
        margin: '0px 0px 5px 10px',
        paddingLeft: 10,
        backgroundColor: '#f5f2f2c7',
        fontSize: 12,
    },
    rowTwo: {
        margin: '0px 0px 5px 10px',
        paddingLeft: 10,
        backgroundColor: '#fffdfd',
        fontSize: 12,
    },
    notifyTitle: {
        fontSize: 18,
        fontWeight: 400,
    },
    msgRow: {
        fontSize: 14,
        padding: '10px 0px',
    },
 
};


export class ViewNotifications extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      message: ''
    }
  }

  componentWillMount () {
      this.props.getNotifications()
  }

  componentWillReceiveProps (nextProps) {
      console.log(nextProps.listNitifications)
  }

  handleChange = (stName) => (event) => {
    this.setState({
      [stName] : event.target.value
    })
}

  handleSubmit = event => {
      const sendData = {
          title: this.state.title,
          message: this.state.message
      }
      this.props.addNotification(sendData)
      this.setState({title: '', message: ''})
  }

  render() {
    const { classes, listNitifications } = this.props
    return (
      <div id="mainContainer">
      <Paper className={classes.paper}>
        <h2> Notifications </h2>
        <Grid container>
            {listNitifications.map((option, key) => {
                const classKey = key % 2 == 0 ? classes.rowOne : classes.rowTwo
                return (
                    <Grid item xs={12} className={classKey}>
                        <div><span className={classes.notifyTitle}>{option.notify_title}</span>  {getFormatedDate(option.notify_date)}</div>
                        <div className={classes.msgRow}>{option.notify_msg}</div>
                    </Grid>
                )
            })}
            
        </Grid>
    </Paper>
        
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getNotifications,
  }, dispatch)

const mapStateToProps = state => ({
    listNitifications: state.getIn(['DisputesContainer', 'listNitifications']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ViewNotifications))
