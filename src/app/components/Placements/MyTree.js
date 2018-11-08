import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getMyTree } from '../../store/Placements/actionCreator'
import DisplayTreeInfo from './DisplayTreeInfo'

const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
  paper: {
    margin: 10,
    padding: 10,
  },
  marginLeft20: {
    marginLeft: 20,
  },
  rowHead: {
    padding: 10,
    background: '#333',
    color: '#fff'
  },
  rowOdd: {
    padding: 10,
    background: '#ebebeb',
  },
  rowEven: {
    padding: 10,
    background: '#fbfbfb',
  },
};


export class MyTree extends React.Component {
  constructor(props) {
    super(props)
    
  }
  
  componentWillMount() {
      var sendData = {
          user_id : this.props.authInfo.data.user_id,
          max_level: 7
      }
      if (this.props.myTree.length == 0) {
            this.props.getMyTree(sendData)
        } 
  }

  render() {
    const { classes, myTree } = this.props
    const group_levels = _.groupBy(myTree, 'level')
    return (
      <div id="mainContainer">
        <h2>My Tree</h2>
        <Paper className={classes.paper}>
            <Grid item xs={12} className={classes.rowHead}>
                <Grid container>
                    <Grid item xs={2}>
                        Level
                    </Grid>
                    <Grid item xs={2}>
                        User Name
                    </Grid>
                    <Grid item xs={2}>
                        Sponser Name
                    </Grid>
                    <Grid item xs={2}>
                        Placed Under
                    </Grid>
                    <Grid item xs={2}>
                        Receive Level Status
                    </Grid>
                    <Grid item xs={2}>
                        Give Level Status
                    </Grid>
                </Grid>
            </Grid>
            {Object.keys(group_levels).map((key, index) => {
                return (
                <Grid item xs={12} className={index %2 ? classes.rowEven : classes.rowOdd} key={index}>
                    <Grid container>
                        <Grid item xs={2}>
                            Level{key}
                        </Grid>
                        <Grid item xs={10}>
                            <DisplayTreeInfo 
                                details={group_levels[key]}
                            />
                        </Grid>
                        

                    </Grid>
                </Grid>
                )
            })}
        </Paper>
      </div>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
      getMyTree,
  }, dispatch)

const mapStateToProps = state => ({
    authInfo: state.getIn(['RegistrationContainer', 'authInfo']).toJS(),
    myTree: state.getIn(['PlcementsContainer', 'myTree']).toJS(),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyTree))
