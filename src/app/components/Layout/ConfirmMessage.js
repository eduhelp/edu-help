import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  textField: {
      width: '250px',
  },
  button: {
      margin: 10,
  },
};


export class ConfirmMessage extends React.Component {

  render() {
    const { classes, message } = this.props
    return (
      <div id="mainContainer">
        <Grid container>
            <Grid item xs={12}>
                {message}
            </Grid>
        </Grid>
      </div>)
  }
}



export default withStyles(styles)(ConfirmMessage)
