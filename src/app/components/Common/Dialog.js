import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
  state = {
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.dialogOpenStatus });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.closeCB()
  };

  render() {
    return (
      <div style={{width:450}}>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.dialogTitle}</DialogTitle>
          <DialogContent>
            {this.props.dialogContent}
          </DialogContent>
          {!this.props.disableFooter && 
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Got it
            </Button>
          </DialogActions>
          }
        </Dialog>
      </div>
    );
  }
}