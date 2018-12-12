import React from 'react'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import CreateIcon from '@material-ui/icons/Add'
import MaintainIcon from '@material-ui/icons/Edit'
import DashboardIcon from '@material-ui/icons/Explore'
import SearchIcon from '@material-ui/icons/Search'
import DemoIcon from '@material-ui/icons/Style'
import ShareIcon from '@material-ui/icons/Share'
import HelpIcon from '@material-ui/icons/HelpOutline'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Notification from '@material-ui/icons/NotificationsNone'
import People from '@material-ui/icons/People'
import TransferWithinAStation from '@material-ui/icons/TransferWithinAStation'
import AddAlert from '@material-ui/icons/AddAlert'

let menuDefinitions = []
const getmenu = (props) => {
  menuDefinitions = [
    { title: 'Home', to: '/', exact: true, icon: <HomeIcon className={props.color} /> },
    { title: 'Know about Plan', to: '/about_plan', icon: <SearchIcon className={props.color} /> },
  ]
  if(props.authInfo.isAuth) {
    menuDefinitions.push({ title: 'My Dashboard', to: '/dashboard', icon: <DashboardIcon className={props.color} /> })
    menuDefinitions.push({ title: 'My Profile', to: '/profile', icon: <AccountCircle className={props.color} /> })
    menuDefinitions.push({ title: 'My Tree', to: '/my_tree', icon: <ShareIcon className={props.color} /> })
    menuDefinitions.push({ title: 'FAQ', to: '/faq', icon: <HelpIcon className={props.color} /> })
     menuDefinitions.push({ title: 'Notifications', to: '/notifications', icon: <Notification className={props.color} /> })
    if(props.authInfo.data.user_id == '1') {
        menuDefinitions.push({ title: 'Users', to: '/users', icon: <People className={props.color} /> })
        menuDefinitions.push({ title: 'Disputes', to: '/disputes', icon: <MaintainIcon className={props.color} /> })
        menuDefinitions.push({ title: 'Smart Spreaders', to: '/smart_spreaders', icon: <DemoIcon className={props.color} /> })
        menuDefinitions.push({ title: 'Maintenance', to: '/maintenance', icon: <TransferWithinAStation className={props.color} /> })
        menuDefinitions.push({ title: 'Add Notification', to: '/add_notification', icon: <AddAlert className={props.color} /> })
    }
  }
}

const MailFolderListItems = (props) => {
  getmenu(props)
  return (<div>
    {menuDefinitions.map((option, keyOption) => {
      return (
        <ListItem button key={keyOption} component={Link} to={option.to} className={props.bg}>
          <ListItemIcon>
            {option.icon}
          </ListItemIcon>
          <ListItemText classes={{ primary: props.color }}>{option.title}</ListItemText>
        </ListItem>
      )
    })}
  </div>)
}
// className={props.styles}
export default MailFolderListItems