import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReceivePendingList from './ReceivePendingList'
import ReceiveDetails from './ReceiveDetails'
import ReceiveConfirm from './ReceiveConfirm'
import Paper from '@material-ui/core/Paper';
import { getLevelPayments, myConfirmPendingList, confirmLevelPayment } from '../../store/Payments/actionCreator'

// import { addUser } from '../../store/Registration/actionCreator'

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

class ReceivePayment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeStep: 0,
            skipped: new Set(),
            stepCompleted: false,
            paymentInfo : {
              payment_id: '',
              user_id: '',
              sponsor_id: ''
            }
          }
    }
    
    componentWillMount() {
        this.props.getLevelPayments() 
        const recData = {
          payment_level: this.props.match.params.levelIndex,
          user_id: this.props.authInfo.data.user_id
        }
        this.props.myConfirmPendingList(recData)
    }

    submitPaymentDetails = (paymentInfo) => {
        this.setState({
          paymentInfo
        })
      }

    getSteps() {
      return ['level'+this.props.match.params.levelIndex+' pending confirm list', 'Payment Details', 'Payment Confirmation'];
    }
    
    
    getStepContent(step) {
      switch (step) {
        case 0:
          return (
            <div>
              <ReceivePendingList
                paymentInfo={this.state.paymentInfo}
                submitCB = {this.submitPaymentDetails}
                confirmPendingList={this.props.confirmPendingList}
              />
            </div>
          )
        case 1:
          return (
            <div>
              <ReceiveDetails 
                paymentInfo={this.state.paymentInfo}
                confirmPendingList={this.props.confirmPendingList}
              />
            </div>
          )
        case 2:
          return (
            <div>
              <ReceiveConfirm 
                paymentInfo={this.state.paymentInfo}
                confirmPendingList={this.props.confirmPendingList}
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
    let { skipped, paymentInfo } = this.state;
    if( activeStep === 2) {
        console.log('place to make api call')
        var paymentObj = _.find(this.props.confirmPendingList, (n) => { return n.payment_id == paymentInfo.payment_id })
        var sendData = {
            payment_id: paymentInfo.payment_id,
            to_id: paymentObj.to_id,
            receiver_type: paymentObj.receiver_type,
            user_id: paymentInfo.user_id,
            sponsor_id: paymentInfo.sponsor_id,
            payment_level: this.props.match.params.levelIndex
          }
          this.props.confirmLevelPayment(sendData)
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
    const { classes, confirmPendingList } = this.props;
    const steps = this.getSteps(this.props);
    const { activeStep, SponsorInfo } = this.state;
    let nextBtnDisabledState = false
    /*if (activeStep === 1 && SponsorInfo !== 'undefined' && SponsorInfo !== '') {
      nextBtnDisabledState = true
    } else if (activeStep === 2 && UserInfo !== 'undefined' && UserInfo !== '') {
      nextBtnDisabledState = true
    } else if (activeStep === 3) {
      nextBtnDisabledState = true
    }  */
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <h2>Level {this.props.match.params.levelIndex} - Received payment confirm process.</h2>
        </Paper>
        {(confirmPendingList.length === 0) ? (
          <Paper className={classes.paper}>
            No pending payemnts to confirm
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
                    please make the payment to your sponsor for activation.
                  </Typography>
                  <Button onClick={this.handleReset} className={classes.button}>
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
                      {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
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

ReceivePayment.propTypes = {
  classes: PropTypes.object,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getLevelPayments,
    myConfirmPendingList,
    confirmLevelPayment,
  }, dispatch)

const mapStateToProps = state => ({
  authInfo: state.getIn(['RegistrationContainer', 'authInfo']).toJS(),
  levelPayments: state.getIn(['PaymentsContainer', 'levelPayments']).toJS(),
  confirmPendingList: state.getIn(['PaymentsContainer', 'confirmPendingList']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReceivePayment))