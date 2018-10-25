import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getFormatedDate } from '../Common/Utils'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { openDispute } from '../../store/Disputes/actionCreator'

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
  button: {
      margin: 5,
  },
};


export class OpenDispute extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        disputeMsg: '',
        screenshots: [],
        msgError: false,
        msgErrorText: '',
    }
  }

  handleChange = (stName) => event => {
    this.setState({ [stName] : event.target.value })
  }

  validateForm = () => {
      if(!this.state.disputeMsg) {
        this.setState({msgError: true, msgErrorText: 'Please enter your message'})
        return false
      }
      return true
  }
  disputeSubmit = (ev) => {
    ev.preventDefault();
    if(this.validateForm()) {
        const { disputePaymentObj, authInfo } = this.props
        let disputeTo ='', disputeType = ''
        if (this.props.disputeFrom == 'Giver') {
            disputeTo = disputePaymentObj.to_id
            disputeType = 'Receiver not yet confirmed'
        } else if (this.props.disputeFrom == 'Receiver') {
            disputeTo = disputePaymentObj.from_id
            disputeType = 'Giver did not make payment'
        }
        const sendData = {
            dispute_from: authInfo.data.user_id,
            dispute_to: disputeTo,
            dispute_type: disputeType,
            payment_id: disputePaymentObj.payment_id,
            message: this.state.disputeMsg,
            fileInfo: this.state.screenshots
        }
        this.props.openDispute(sendData)
        window.location.replace('/dashboard')
    }
  }

  handleUploadImage = (files) => {
    // Push all the axios request promise into a single array
    let screenshotUrl = []
    screenshotUrl = this.state.screenshots
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData()
      formData.append('file', file)

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios.post('http://localhost:9000/disputes/screenshotUpload', formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      }).then(response => {
        const data = response.data
        screenshotUrl.push(data.path)
        this.setState({screenshots: screenshotUrl})
      })
    })

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
    })
  }

  render() {
    const { classes, disputePaymentObj } = this.props
    const { screenshots } = this.state
    const images = screenshots.map((image, index) => {
        const url = `screenshots/${image}`
        return <img src={url} width="150" alt="images" />
    })
    return (
      <div id="mainContainer">
        <Paper className={classes.paperCenter}>
            <h3>Open Dispute</h3>
        </Paper>
        <Paper className={classes.paper}>
            <Grid container>
                <Grid item xs={12} className={classes.rowHead}>
                    <Grid container>
                        <Grid item xs={6}>
                            Payment Id
                        </Grid>
                        <Grid item xs={6}>
                            {disputePaymentObj.payment_id}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.rowDetails}>
                    <Grid container>
                        <Grid item xs={6}>
                            Giver ID
                        </Grid>
                        <Grid item xs={6}>
                            {disputePaymentObj.from_id}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.rowDetails}>
                    <Grid container>
                        <Grid item xs={6}>
                            Receiver ID
                        </Grid>
                        <Grid item xs={6}>
                            {disputePaymentObj.to_id}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.rowDetails}>
                    <Grid container>
                        <Grid item xs={6}>
                            Payment Level
                        </Grid>
                        <Grid item xs={6}>
                            {disputePaymentObj.payment_level}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.rowDetails}>
                    <Grid container>
                        <Grid item xs={6}>
                            Receiver Type
                        </Grid>
                        <Grid item xs={6}>
                            {disputePaymentObj.receiver_type}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.rowDetails}>
                    <Grid container>
                        <Grid item xs={6}>
                            Dispute Message
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
                                error={this.state.msgError}
                                helperText={this.state.msgErrorText}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.rowDetails}>
                    <AppBar position="static" color="default">
                        <div className="dropzone">
                        <Dropzone
                            accept="image/jpeg, image/png"
                            onDrop={this.handleUploadImage}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                            </svg>
                        </Dropzone>
                        {images}
                        </div>
                    </AppBar>
                </Grid>
                <Grid item xs={12} className={classes.rowDetails}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.props.cancelCB}
                        className={classes.button}
                        >
                        Back to Dashboard
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.disputeSubmit}
                      className={classes.button}
                    >
                      Open Dispute
                    </Button>
                </Grid>
            </Grid>
        </Paper>
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    openDispute,
  }, dispatch)

const mapStateToProps = state => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OpenDispute))
