import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import PropTypes from 'prop-types'
import UserTableList from './UserTableList'
import UserTableToolbar from './UserTableToolbar'

const styles = theme => ({
  root: {
    padding: 0,
  },
})

export class Users extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      data: [],
      originalData: [],
      page: 0,
      rowsPerPage: 10,
      dialogOpenStatus: false,
      selectedGroup: '',
      selectedGroupType: '',
    }
  }

  componentWillReceiveProps (nextProps) {
  this.setState({ data: nextProps.usersList, originalData: nextProps.usersList })
  }

  getFilter = (selectRef) => {
    let tempData = this.state.originalData
    for (let key of Object.keys(selectRef)) {
      tempData = tempData.filter((o) => {
        const checkArr = key.split(',')
        let objVal = ''
        checkArr.map((obj, index) => {
          objVal = (objVal === '') ? o[obj] : objVal[obj]
        })
        const checkVal = (key === 'launch_date') ? getFormatedDate(objVal) : objVal
        return (checkVal && (checkVal.toLowerCase().indexOf(typeof selectRef[key] === 'string' ? selectRef[key].toLowerCase() : selectRef[key]) !== -1))
      })
    }
    this.setState({ data: tempData })
  }

  resetFilter = () => {
    this.setState({ data: this.state.originalData })
  }


 

 

  render () {
    const { classes } = this.props
    const { data, order, orderBy, rowsPerPage, page, dialogOpenStatus, originalData } = this.state
    const isDeleteDisabled = (this.state.selected.length === 0)
    return (
      <div className={classes.wrapper}>
        <UserTableToolbar
          onFilterRequest={this.getFilter}
          onFilterReset={this.resetFilter}
          listItems={originalData}
        />
        <UserTableList
          data={data}
          page={page}
          order={order}
          orderBy={orderBy}
          rowsPerPage={rowsPerPage}
          validateDelete={this.handleClick}
          handleChangePage={this.handleChangePage}
          handleChangeRowsPerPage={this.handleChangeRowsPerPage}
          handleRequestSort={this.handleRequestSort}
          updateUserStatusCB={this.props.updateUserStatusCB}
        />
      </div>
    )
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default (withStyles(styles)(Users))