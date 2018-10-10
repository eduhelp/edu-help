import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FindReceiver from './FindReceiver'
import SelectReceiver from './SelectReceiver'
import { addConfirmReceiver } from '../../store/Payments/actionCreator'

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  paper: {
    margin: 10,
    padding: 10,
    textAlign: 'center',
  }
});

class ConfirmReceiver extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current_level: '',
            selected_to_id: '',
            activeStep: 0,
            skipped: new Set(),
            stepCompleted: false,
            curPaymentObject: '',
            receiverInfo: '',
            }
    }
    
    componentDidMount() {
        let selected_to_id = ''
        if (this.props.levelEligibility) {
            selected_to_id = this.props.treeParentID
        } else {
            selected_to_id = this.props.smartSpreaderInfo.user_id
        }
        this.setState({
            receiverInfo: {
                from_id: this.props.authInfo.data.user_id,
                receiver_id: selected_to_id,
                payment_level: this.props.levelIndex,
                payment_value: this.props.levelPayment,
                level_eligibility: this.props.levelEligibility,
                bank_details: this.props.authInfo.data.bank_details,
            }
        })
    }

    submitPaymentDetails = (paymentEntryInfo) => {
        this.setState({
            paymentEntryInfo
        })
      }

    getSteps() {
      return ['Find Receiver', 'Select Receiver'];
    }
    
    
    getStepContent(step) {
      switch (step) {
        case 0:
            return (
                <div>
                    <FindReceiver 
                        submitCB = {this.submitFindReceiver}
                        receiverInfo={this.state.receiverInfo}
                        smartSpreaderInfo={this.props.smartSpreaderInfo}
                        userDetails={this.props.treeParentInfo}
                    />
                </div>
            )
        case 1:
          return (
            <div>
              <SelectReceiver 
                receiverInfo={this.state.receiverInfo}
                smartSpreaderInfo={this.props.smartSpreaderInfo}
                userDetails={this.props.treeParentInfo}
              />
            </div>
          )
        default:
          return 'Unknown step';
      }
    }

    

  isStepOptional = step => {
    // return step === 1;
    return false
  };

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped, receiverInfo } = this.state;
    if( activeStep === 1) {
        console.log("ready to submit")
        console.log(receiverInfo)
        const receiver_type = receiverInfo.level_eligibility ? 'RootParent' : 'SmartSpreader'
        const sendData = {
            payment_level: receiverInfo.payment_level,
            from_id: receiverInfo.from_id,
            to_id: receiverInfo.receiver_id,
            payment_value: receiverInfo.payment_value,
            paid_status: 'Pending',
            receiver_type: receiver_type
          }
          this.props.addConfirmReceiver(sendData)
      this.setState({
        activeStep: activeStep + 1,
        skipped,
      });
    } else {
      if (this.isStepSkipped(activeStep)) {
        skipped = new Set(skipped.values());
        skipped.delete(activeStep);
      }
      this.setState({
        activeStep: activeStep + 1,
        skipped,
      });
    }
    
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      sponsorInfo: '',
      userInfo: ''
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  render() {
    const { classes } = this.props;
    const steps = this.getSteps(this.props);
    const { activeStep, paymentInfo, curPaymentObject } = this.state;
    let nextBtnDisabledState = false
    /* if (this.state.receiverInfo && this.state.receiverInfo.receiver_id) {
        nextBtnDisabledState = false
    } */
    const receiver_type = this.state.receiverInfo.level_eligibility ? 'Root Parent' : 'Smart Spreader Bucket'

    const levelText = (this.props.levelIndex === 1) ? "Level "+this.props.levelIndex+" (Sponsor)" : "Level "+this.props.levelIndex
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <h2>{levelText} - Confirm Receiver.</h2>
        </Paper>
        {(curPaymentObject) ? (
            <Paper className={classes.paper}>
                <h5>You are done the level{curPaymentObject.payment_level} payment - status : {curPaymentObject.confirm_status}</h5>
            </Paper>
        ) : (
            <div>
                 <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const props = {};
                            const labelProps = {};
                            if (this.isStepOptional(index)) {
                            labelProps.optional = <Typography variant="caption">Optional</Typography>;
                            }
                            if (this.isStepSkipped(index)) {
                            props.completed = false;
                            }
                            return (
                            <Step key={label} {...props}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                            );
                        })}
                        </Stepper>
                        <div>
                        {activeStep === steps.length ? (
                            <div>
                            <Typography className={classes.instructions}>
                                All steps completed - you're finished <br />
                                You are confirmed your receiver for level-{this.state.receiverInfo.payment_level} from {receiver_type}
                            </Typography>
                            <Button onClick={this.handleReset} className={classes.button} onClick={this.props.cancelCB}>
                                make payment to {receiver_type}
                            </Button>
                            </div>
                        ) : (
                            <div>
                            <div>
                                {this.getStepContent(activeStep)}
                            </div>
                            <div>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={this.props.cancelCB}
                                className={classes.button}
                                >
                                Bank to Dashboard
                                </Button>

                                <Button
                                disabled={activeStep === 0}
                                onClick={this.handleBack}
                                className={classes.button}
                                >
                                Back
                                </Button>
                                {this.isStepOptional(activeStep) && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleSkip}
                                    className={classes.button}
                                >
                                    Skip
                                </Button>
                                )}
                                <Button
                                disabled={nextBtnDisabledState}
                                variant="contained"
                                color="primary"
                                onClick={this.handleNext}
                                className={classes.button}
                                >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                                
                                
                            </div>
                            </div>
                        )}
                    </div>
            </div>
        )}
      </div>
    );
  }
}

ConfirmReceiver.propTypes = {
  classes: PropTypes.object,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
   addConfirmReceiver,
  }, dispatch)

const mapStateToProps = state => ({
  smartSpreaderInfo: state.getIn(['PlcementsContainer', 'smartSpreaderInfo']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ConfirmReceiver))