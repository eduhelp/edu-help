import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getFormatedDate } from '../Common/Utils'
import LoadingHOC from '../Common/HOC/LoadingHOC'
import { Link } from 'react-router-dom'

const styles = {
    rowOne: {
        margin: '0px 0px 5px 10px',
        paddingLeft: 10,
        backgroundColor: '#f5f2f2c7',
        fontSize: 12,
        width: '400px',
    },
    rowTwo: {
        margin: '0px 0px 5px 10px',
        paddingLeft: 10,
        backgroundColor: '#fffdfd',
        fontSize: 12,
    },
    notifyTitle: {
        fontSize: 18,
        fontWeight: 400,
    },
    msgRow: {
        fontSize: 14,
        padding: '10px 0px',
    },
    navLink: {
        textDecoration: 'underline',
        cursor: 'pointer',
    },
};


export class NotifyDialog extends React.Component {

  render() {
    const { classes, listNitifications } = this.props
    const notifyLink = '/notifications'
    return (
      <div id="mainContainer">
            {listNitifications.map((option, key) => {
                if (key == 0) {
                    const classKey = key % 2 == 0 ? classes.rowOne : classes.rowTwo
                    return (
                        <Grid container>
                            <Grid item xs={12} className={classKey}>
                                <div><span className={classes.notifyTitle}>{option.notify_title}</span>  {getFormatedDate(option.notify_date)}</div>
                                <div className={classes.msgRow}>{option.notify_msg}</div>
                            </Grid>
                            <Grid item xs={12}>
                                <Link className={classes.navLink} to={notifyLink}> more notifications </Link>
                            </Grid>
                        </Grid>
                    )
                }
            })}
      </div>)
  }
}

export default LoadingHOC('listNitifications')(withStyles(styles)(NotifyDialog))
