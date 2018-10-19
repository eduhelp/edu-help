import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getFormatedDate } from '../Common/Utils'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { openDispute } from '../../store/Disputes/actionCreator'

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


export class OpenDispute extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        disputeMsg: ''
    }
  }
  
  handleChange = (stName) => event => {
    this.setState({ [stName] : event.target.value })
  }

  disputeSubmit = (ev) => {
    ev.preventDefault();
    const { details, authInfo } = this.props
    console.log('authInfo')
    console.log(authInfo)
    const fileName = details.payment_id+"_"+details.receiverInfo.username
    console.log('this.uploadInput.files[0]')
    console.log(this.uploadInput.files[0])
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', fileName);

    console.log('data')
    console.log(data)

    const sendData = {
        dispute_from: authInfo.data.user_id,
        dispute_to: details.receiverInfo.user_id,
        dispute_type: 'Receiver not yet confirmed',
        payment_id: details.payment_id,
        message: this.state.disputeMsg,
        fileInfo: data
    }
    this.props.openDispute(sendData)
  }
  
  render() {
    const { classes, details } = this.props
    return (
      <div id="mainContainer">
        <Grid container>
            <Grid item xs={12} className={classes.rowHead}>
                <Grid container>
                    <Grid item xs={6}>
                        Payment Id
                    </Grid>
                    <Grid item xs={6}>
                        {details.payment_id}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowDetails}>
                <Grid container>
                    <Grid item xs={6}>
                        Receiver Name
                    </Grid>
                    <Grid item xs={6}>
                        {details.receiverInfo.username} ({details.receiverInfo.user_id})
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowDetails}>
                <Grid container>
                    <Grid item xs={6}>
                        Receiver Type
                    </Grid>
                    <Grid item xs={6}>
                        {details.receiver_type}
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
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowDetails}>
                <Grid container>
                    <Grid item xs={6}>
                        Upload Proof
                    </Grid>
                    <Grid item xs={6}>
                        <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.rowDetails}>
                <Grid container>
                    <Grid item xs={6}>
                        
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.disputeSubmit}
                            className={classes.button}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
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
