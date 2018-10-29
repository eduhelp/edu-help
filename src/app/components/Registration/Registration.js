import React from 'react';
import { Link } from 'react-router-dom'
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
import { addUser, getUserDetails, checkAvailability, userLogin } from '../../store/Registration/actionCreator'

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
  },
  navLink: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
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
            userInfoError: '',
            }
    }
    
    componentWillMount() {
      var uname = this.getParameterByName('n'); // "lorem"
      window.localStorage.setItem('regSponsorId', uname)
      const sponsorInfo = {
        username: uname,
      }
      this.props.getUserDetails(sponsorInfo)
    }

    getParameterByName = (name, url) => {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

    getSteps() {
      return ['Sponsor Info', 'Your Info', 'Confirm'];
    }

    submitUserInfo = (userInfo) => {
      this.setState({
        userInfo
      })
    }

    checkAvailability = (field_name, field_value) => {
      const sendData = {
        field_name,
        field_value
      }
      this.props.checkAvailability(sendData)
    }
    getStepContent(step) {
      switch (step) {
        case 0:
          return (
            <div>
              <SponsorInfo 
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
                userInfoError={this.state.userInfoError}
                checkAvailabilityCB={this.checkAvailability}
                availableStatus={this.props.availableStatus}
              />
            </div>
          )
        case 2:
          return (
            <div>
              <ConfirmInfo
                sponsorInfo={this.state.sponsorInfo}
                userInfo={this.state.userInfo}
                sponsorDetails = {this.props.userDetails}
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

  validateUserInfo = () => {
    if(!this.state.userInfo.username) {
      this.state.userInfoError.username = 'Required'
      return false
    }
    return true
  }

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if( activeStep === 2) {
      this.state.userInfo['sponsor_id'] = this.props.userDetails.user_id
      this.props.addUser(this.state.userInfo);
      this.setState({
        activeStep: activeStep + 1,
        skipped,
      });
      window.localStorage.removeItem('regSponsorId')
      setTimeout(() => {
        const loginData = {
          username: this.state.userInfo.username,
          pwd: this.state.userInfo.pwd
        }
        this.props.userLogin(loginData)
      }, 1000)
    } if( activeStep === 1) {
      if(this.validateUserInfo()) {
        this.setState({
          activeStep: activeStep + 1,
          skipped,
        });
      }
      console.log('validate user form')
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
      userInfo: {
        country: 'India',
        state: 'None'
      }
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  navToBankPage = () => {
    window.location.href = '/profile'
  }

  render() {
    const { classes, userDetails } = this.props;
    const steps = this.getSteps(this.props);
    const { activeStep, sponsorInfo, userInfo } = this.state;
    let nextBtnDisabledState = true
    if (activeStep === 0 && userDetails && userDetails.status == 'Active') {
      nextBtnDisabledState = false
    } else if (activeStep === 1 && userInfo !== 'undefined' && userInfo !== '') {
      nextBtnDisabledState = false
    } else if (activeStep === 2) {
      nextBtnDisabledState = false 
    }  
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
                Registration completed, Welcome to Eduhelp community <br />
                continue to update bank details and start giving help.
              </Typography>
              <Link className={classes.navLink} to="/profile/bank">
                <Button variant="contained" color="primary" className={classes.button}>
                  Add Bank Details
                </Button>
              </Link>
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
    checkAvailability,
    userLogin,
  }, dispatch)

const mapStateToProps = state => ({
  userDetails: state.getIn(['RegistrationContainer', 'userDetails']).toJS(),
  availableStatus: state.getIn(['RegistrationContainer', 'availableStatus']).toJS(),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Registration))