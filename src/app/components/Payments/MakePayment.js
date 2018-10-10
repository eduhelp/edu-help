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
import MakePaymentDetails from './MakePaymentDetails'
import MakePaymentConfirm from './MakePaymentConfirm'
import { getLevelPayments, makeLevelPayment, getMyPaymentList, getLevelEligibility } from '../../store/Payments/actionCreator'

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

class MakePayment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current_level: '',
            activeStep: 0,
            skipped: new Set(),
            stepCompleted: false,
            curPaymentObject: '',
            paymentInfo: '',
            paymentEntryInfo: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps.makePaymentObj')
        console.log(nextProps.makePaymentObj)
    }
    submitPaymentDetails = (paymentEntryInfo) => {
        this.setState({
            paymentEntryInfo
        })
      }

    getSteps() {
      return ['Payment Details - level'+this.props.makePaymentObj.payment_level, 'Payment Confirmation'];
    }
    
    
    getStepContent(step) {
      switch (step) {
        case 0:
          return (
            <div>
              <MakePaymentDetails 
                submitCB = {this.submitPaymentDetails}
                authInfo={this.props.authInfo}
                makePaymentObj={this.props.makePaymentObj}
                paymentEntryInfo={this.state.paymentEntryInfo}
              />
            </div>
          )
        case 1:
          return (
            <div>
              <MakePaymentConfirm 
                authInfo={this.props.authInfo}
                makePaymentObj={this.props.makePaymentObj}
                paymentEntryInfo={this.state.paymentEntryInfo}
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
    let { skipped, paymentInfo, paymentEntryInfo } = this.state;
    if( activeStep === 1) {
        var sendData = {
            payment_id: this.props.makePaymentObj.payment_id,
            payment_mode: paymentEntryInfo.payment_mode,
            from_bank: paymentEntryInfo.from_bank,
            to_bank: paymentEntryInfo.to_bank,
            transaction_id: paymentEntryInfo.transaction_id,
            transaction_date: paymentEntryInfo.transaction_date
          } 
          this.props.makeLevelPayment(sendData)
          window.location.replace('/dashboard')
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
    const { classes, makePaymentObj } = this.props;
    const steps = this.getSteps(this.props);
    const { activeStep, paymentEntryInfo } = this.state;
    let nextBtnDisabledState = true
    if (activeStep === 0 && paymentEntryInfo.transaction_id !== undefined && paymentEntryInfo.transaction_id !== '') {
        nextBtnDisabledState = false
    } else if (activeStep === 1) {
        nextBtnDisabledState = false 
    }  
    const levelText = (makePaymentObj.payment_level === 1) ? "Level "+makePaymentObj.payment_level+" (Sponsor)" : "Level "+makePaymentObj.payment_level
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <h2>{levelText} - make payment.</h2>
        </Paper>
        {(makePaymentObj.confirm_status !== null) ? (
            <Paper className={classes.paper}>
                <h5>You are done the level{makePaymentObj.payment_level} payment - status : {makePaymentObj.confirm_status}</h5>
            </Paper>
        ) : (
            <div>
                {(makePaymentObj.to_id == 0) ? (
                    <Paper className={classes.paper}>
                        <h5>You are the root ID - you can't make any payment</h5>
                    </Paper>
                ): (
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
                                Please wait until receiver confirmation.
                            </Typography>
                            <Button onClick={this.handleReset} className={classes.button} onClick={this.props.cancelCB}>
                                make another payment
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
                                Back to Dashboard
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
        )}
      </div>
    );
  }
}

MakePayment.propTypes = {
  classes: PropTypes.object,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getLevelPayments,
    makeLevelPayment,
    getMyPaymentList,
    getLevelEligibility,
  }, dispatch)

const mapStateToProps = state => ({
  // authInfo: state.getIn(['RegistrationContainer', 'authInfo']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MakePayment))