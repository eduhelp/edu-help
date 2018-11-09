import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import FilterListIcon from '@material-ui/icons/FilterList'
import EduHelpAutoSuggest from '../Common/EduHelpAutoSuggest/EduHelpAutoSuggest'

const toolbarStyles = theme => ({
  root: {
    padding: 24,
  },
  headerTitle: {
    fontWeight: 500,
    fontSize: 24,
    margin: '10px 0',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  spacer: {
    flex: '0 1 50%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  groupsPadding: {
    padding: '20px 0px',
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  filterIcon: {
    float: 'left',
    paddingTop: '10px',
  },
  createGroupButtonStyle: {
    background: '#1976d2',
    color: '#fff',
    fontWeight: 300,
    '&:hover': {
      background: '#125ca5',
      color: '#fff',
    },
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
  },
  groupAddIcon: {
    color: '#1976d2',
    background: '#fff',
    width: '0.7em',
    height: '0.7em',
    marginRight: 7,
    borderRadius: 2,
  },
  groupFilters: {
    display: 'flex',
  },
})

export class UserTableToolbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      selectRef: [],
      drawerOpenStatus: false,
      drawerContent: '',
    }
  }

    readFilters = (colId, sugg) => {
      const { selectRef } = this.state
      if (sugg !== '') {
        selectRef[colId] = sugg
      } else {
        delete selectRef[colId]
      }
      this.setState({ selectRef })
      this.props.onFilterRequest(selectRef)
    }

    render () {
      const { classes } = this.props

      let usernameList = []
      let statusList = []
      let mobileList = []
      this.props.listItems.map((option) => {
        usernameList.push(option.username)
        mobileList.push(option.moble)
        statusList.push(option.status)
      })

      usernameList = _.uniqBy(usernameList)
      mobileList = _.uniqBy(mobileList)
      statusList = _.uniqBy(statusList)

      return (
        <Toolbar
          className={classNames(classes.root)}
        >
          <Grid container>
            <Grid item xs={12} className={classes.groupsPadding}>
              <h2 className={classes.headerTitle}>Users</h2>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} className={classes.groupFilters}>
                  <FilterListIcon className={classes.filterIcon} />
                  <EduHelpAutoSuggest
                    suggestions={usernameList}
                    getSuggestionCallback={this.readFilters.bind(this)}
                    column_id="username"
                    filter_name="User Name"
                    clearField="No"
                    id="loadUserName"
                  />
                  <EduHelpAutoSuggest
                    suggestions={mobileList}
                    getSuggestionCallback={this.readFilters.bind(this)}
                    column_id="mobile"
                    filter_name="Mobile Number"
                    clearField="No"
                    id="loadUserName"
                  />
                  <EduHelpAutoSuggest
                    suggestions={statusList}
                    getSuggestionCallback={this.readFilters.bind(this)}
                    column_id="status"
                    filter_name="Status"
                    clearField="No"
                    id="loadUserName"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      )
    }
}

UserTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(toolbarStyles)(UserTableToolbar)