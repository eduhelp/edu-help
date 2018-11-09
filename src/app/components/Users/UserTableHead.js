import React from 'react'
import PropTypes from 'prop-types'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import TableSortLabel from '@material-ui/core/TableSortLabel'

const columnData = [
  { id: 'user_id', numeric: false, disablePadding: false, label: 'User Id' },
  { id: 'username', numeric: false, disablePadding: false, label: 'User Name' },
  { id: 'pwd', numeric: false, disablePadding: false, label: 'Password' },
  { id: 'mobile', numeric: false, disablePadding: false, label: 'Mobile' },
  { id: 'state', numeric: false, disablePadding: false, label: 'State' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
]

export class UserTableHead extends React.Component {
    createSortHandler = property => event => {
      this.props.onRequestSort(property)
    };

    render () {
      const { order, orderBy } = this.props

      return (
        <TableHead>
          <TableRow>
            {columnData.map(column => {
              return (
                <TableCell
                  key={column.id}
                  numeric={column.numeric}
                  padding="none"
                  sortDirection={orderBy === column.id ? order : false}
                >
                  {(column.id === 'user_id') ? (
                    <Tooltip
                      title="Sort"
                      placement="bottom-start"
                      enterDelay={300}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={order}
                        onClick={this.createSortHandler(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </Tooltip>
                  ) : (
                    <span>{column.label}</span>
                  )}
                </TableCell>
              )
            }, this)}
          </TableRow>
        </TableHead>
      )
    }
}

UserTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
}

export default UserTableHead