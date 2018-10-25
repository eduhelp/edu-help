import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MyInfo from './MyInfo'
import PaymentInfo from './PaymentInfo'
import ChangePassword from './ChangePassword'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    backgroundColor: '#ebebeb',
    color: '#000',
  },
});

class Profile extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, authInfo } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} className={classes.tabs}>
            <Tab label="My Info" />
            <Tab label="Bank Info" />
            <Tab label="Change Password" />
          </Tabs>
        </AppBar>
        {value === 0 && 
            <TabContainer>
                <MyInfo authInfo={authInfo.data} />
            </TabContainer>
        }
        {value === 1 && 
            <TabContainer>
                <PaymentInfo authInfo={authInfo.data} />
            </TabContainer>
        }
        {value === 2 && 
            <TabContainer>
                <ChangePassword authInfo={authInfo.data} />
            </TabContainer>
        }
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch)

const mapStateToProps = state => ({
    authInfo: state.getIn(['RegistrationContainer', 'authInfo']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile))