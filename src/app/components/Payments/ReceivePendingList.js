import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  paper: {
      margin: 10,
      padding: 10,
  },
  grid: {
      padding: 5,
  },
};


export class ReceivePendingList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        selectedValue : '',
        paymentInfo : {
            payment_id: '',
            user_id: '',
            sponsor_id: ''
        }
    }
  }

  componentWillMount(){
    this.setState({ 
        paymentInfo: this.props.paymentInfo,
        selectedValue: this.props.paymentInfo.payment_id
     })
  }

  handleChange = (event) => {
    this.setState({ selectedValue: event.target.value });
    const pay_info = _.find(this.props.confirmPendingList,(o) => o.payment_id === event.target.value)
    this.setState({ paymentInfo: { 
      payment_id : event.target.value,
      user_id: pay_info.from_id,
      sponsor_id: pay_info.to_id
    }}) 
    setTimeout(()=> {
      this.props.submitCB(this.state.paymentInfo)
    }, 100)
  }


  render() {
    const { classes } = this.props
    return (
      <div id="mainContainer">
        <Paper className={classes.paper}>
            <Grid container>
                <Grid item xs={12} className={classes.grid}>
                    <Grid container>
                        <Grid item xs={3}>
                            Select
                        </Grid>
                        <Grid item xs={3}>
                            From ID
                        </Grid>
                        <Grid item xs={3}>
                            From Level
                        </Grid>
                        <Grid item xs={3}>
                            Receive Mode
                        </Grid>
                    </Grid>
                </Grid>
                {this.props.confirmPendingList.map((option) => {
                    return (
                        <Grid item xs={12} className={classes.grid}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Radio
                                        checked={this.state.selectedValue === option.payment_id}
                                        onChange={this.handleChange}
                                        value={option.payment_id}
                                        name="radio-button-demo"
                                        aria-label="A"
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    {option.giverInfo.username}
                                </Grid>
                                <Grid item xs={3}>
                                    {option.payment_level}
                                </Grid>
                                <Grid item xs={3}>
                                    {option.receiver_type}
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                })

                }
                
            </Grid>
        </Paper>
      </div>)
  }
}

export default withStyles(styles)(ReceivePendingList)
