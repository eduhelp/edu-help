import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getFormatedDate } from '../Common/Utils'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { addDisputeComment } from '../../store/Disputes/actionCreator'

import axios from 'axios'
import Dropzone from 'react-dropzone'
// import Tabs, { Tab } from 'material-ui/Tabs'
import AppBar from '@material-ui/core/AppBar'
// import Typography from 'material-ui/Typography'
import FormData from 'form-data'

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
  paper: {
    margin: 10,
    padding: 10,
  },
  paperCenter: {
    margin: 10,
    padding: 10,
    textAlign: 'center',
  },
};


export class AddComment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        disputeMsg: '',
    }
  }
  
  handleChange = (stName) => event => {
    this.setState({ [stName] : event.target.value })
  }

  submitComment = (ev) => {
    ev.preventDefault();
    const { disputeObj, authInfo } = this.props

    const sendData = {
        dispute_id: disputeObj.dispute_id,
        added_by:  authInfo.data.user_id,
        message: this.state.disputeMsg
    }
    this.props.addDisputeComment(sendData)
    this.props.closeCB()
  }

  render() {
    const { classes, disputeObj } = this.props
    return (
      <div id="mainContainer">
        <Paper className={classes.paper}>
            <Grid container>
                <Grid item xs={12} className={classes.rowHead}>
                    <Grid container>
                        <Grid item xs={6}>
                            Dispute Id
                        </Grid>
                        <Grid item xs={6}>
                            {disputeObj.dispute_id}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.rowDetails}>
                    <Grid container>
                        <Grid item xs={6}>
                            Message
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="standard-multiline-flexible"
                                label="Multiline"
                                multiline
                                rowsMax="4"
                                value={this.state.disputeMsg}
                                onChange={this.handleChange('disputeMsg')}
                                className={classes.textField}
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.rowDetails}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.submitComment}
                      className={classes.button}
                    >
                      Add Comment
                    </Button>
                </Grid>
            </Grid>
        </Paper>
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    addDisputeComment,
  }, dispatch)

const mapStateToProps = state => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddComment))
