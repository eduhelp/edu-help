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
import { getLevelPayments, makeLevelPayment, getMyPaymentList } from '../../store/Payments/actionCreator'
import { getMyTopLevel } from '../../store/Placements/actionCreator'
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
            paymentEntryInfo: ''
            }
    }
    
    componentWillMount() {
        const sendData = {
            user_id : this.props.authInfo.data.data.user_id
        }
        this.props.getLevelPayments()
        this.props.getMyPaymentList(sendData)
        this.setState({ current_level: this.props.match.params.levelIndex })
        if (this.props.match.params.levelIndex > 1) {
            var sendLevelData = {
                user_id : this.props.authInfo.data.data.user_id,
                max_level: 7
            }
            this.props.getMyTopLevel(sendLevelData)
        }
    }

    componentWillReceiveProps(nextProps) {
        const curPaymentObject = _.find(nextProps.myPaymentList, (n) => { return (n.payment_level == this.state.current_level) })
        this.setState({ curPaymentObject })
        var levelObj = _.find(nextProps.levelPayments, (n) => { return n.level_index == this.state.current_level} )
        var selected_to_id = ''
        if(this.state.current_level == 1) {
            selected_to_id = nextProps.authInfo.data.data.sponsor_id
        } else {
            var nodeObj = _.find(nextProps.myTopLevel, (n) => { return (n.level == this.state.current_level)})
            selected_to_id = nodeObj.nodeInfo.user_id
        }
        this.setState({
            paymentInfo: {
                from_id: nextProps.authInfo.data.data.user_id,
                to_id: selected_to_id,
                payment_level: this.state.current_level,
                payment_value: levelObj.level_payment
            }
        })
    }

    submitPaymentDetails = (paymentEntryInfo) => {
        this.setState({
            paymentEntryInfo
        })
      }

    getSteps() {
      return ['Payment Details - level'+this.props.match.params.levelIndex, 'Payment Confirmation'];
    }
    
    
    getStepContent(step) {
      switch (step) {
        case 0:
          return (
            <div>
              <MakePaymentDetails 
                submitCB = {this.submitPaymentDetails}
                paymentInfo={this.state.paymentInfo}
              />
            </div>
          )
        case 1:
          return (
            <div>
              <MakePaymentConfirm 
                paymentInfo={this.state.paymentInfo}
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
            payment_level: paymentInfo.payment_level,
            from_id: paymentInfo.from_id,
            to_id: paymentInfo.to_id,
            payment_value: paymentInfo.payment_value,
            payment_mode: paymentEntryInfo.payment_mode,
            from_bank: paymentEntryInfo.from_bank,
            to_bank: paymentEntryInfo.to_bank,
            transaction_id: paymentEntryInfo.transaction_id
          }
          this.props.makeLevelPayment(sendData)
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
    /*if (activeStep === 1 && SponsorInfo !== 'undefined' && SponsorInfo !== '') {
      nextBtnDisabledState = true
    } else if (activeStep === 2 && UserInfo !== 'undefined' && UserInfo !== '') {
      nextBtnDisabledState = true
    } else if (activeStep === 3) {
      nextBtnDisabledState = true
    }  */
    const levelText = (this.props.match.params.levelIndex === 1) ? "Level "+this.props.match.params.levelIndex+" (Sponsor)" : "Level "+this.props.match.params.levelIndex
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <h2>{levelText} - make payment.</h2>
        </Paper>
        {(curPaymentObject) ? (
            <Paper className={classes.paper}>
                <h5>You are done the level{curPaymentObject.payment_level} payment - status : {curPaymentObject.confirm_status}</h5>
            </Paper>
        ) : (
            <div>
                {(paymentInfo.to_id == 0) ? (
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
    getMyTopLevel,
  }, dispatch)

const mapStateToProps = state => ({
  authInfo: state.getIn(['RegistrationContainer', 'authInfo']).toJS(),
  levelPayments: state.getIn(['PaymentsContainer', 'levelPayments']).toJS(),
  myPaymentList: state.getIn(['PaymentsContainer', 'myPaymentList']).toJS(),
  myTopLevel: state.getIn(['PlcementsContainer', 'myTopLevel']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MakePayment))