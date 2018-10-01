import React from 'react';
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
import SponsorInfo from './SponsorInfo'
import UserInfo from './UserInfo'
import ConfirmInfo from './ConfirmInfo'
import { addUser, getUserDetails } from '../../store/Registration/actionCreator'

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

class Registration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeStep: 0,
            skipped: new Set(),
            stepCompleted: false,
            sponsorInfo: '',
            userInfo: '',
            }
    }
    
    getSteps() {
      return ['Sponsor Info', 'Your Info', 'Confirm'];
    }
    
    submitSponsorInfo = (sponsorInfo) => {
      this.setState({
        sponsorInfo
      })
    }

    submitUserInfo = (userInfo) => {
      console.log(userInfo)
      this.setState({
        userInfo
      })
    }
    
    getSponsorInfo = (sponsorInfo) => {
      const sendData = {
        user_id: sponsorInfo.sponsor_id
      }
      this.props.getUserDetails(sendData)
    }

    getStepContent(step) {
      switch (step) {
        case 0:
          return (
            <div>
              <SponsorInfo 
                submitCB = {this.submitSponsorInfo}
                sponsorInfo={this.state.sponsorInfo}
                getUserCB={this.getSponsorInfo}
                sponsorDetails = {this.props.userDetails}
              />
            </div>
          )
        case 1:
          return (
            <div>
              <UserInfo 
                submitCB = {this.submitUserInfo}
                userInfo={this.state.userInfo}
              />
            </div>
          )
        case 2:
          return (
            <div>
              <ConfirmInfo
                sponsorInfo={this.state.sponsorInfo}
                userInfo={this.state.userInfo}
              />
            </div>
          )
        default:
          return 'Unknown step';
      }
    }

    componentWillMount() {
        console.log('step1 props')
        console.log(this.props.step1)
    }
  isStepOptional = step => {
    // return step === 1;
    return false
  };

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if( activeStep === 2) {
      this.state.userInfo['sponsor_id'] = this.state.sponsorInfo.sponsor_id
      this.props.addUser(this.state.userInfo);
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
          <h2>User Registration</h2>
        </Paper>
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
                Add another user
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
    );
  }
}

Registration.propTypes = {
  classes: PropTypes.object,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    addUser,
    getUserDetails,
  }, dispatch)

const mapStateToProps = state => ({
  userDetails: state.getIn(['RegistrationContainer', 'userDetails']).toJS(),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Registration))