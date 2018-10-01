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
import AdminIcon from '@material-ui/icons/Settings'
import DemoIcon from '@material-ui/icons/Style'

let menuDefinitions = []
const getmenu = (props) => {
  menuDefinitions = [
    { title: 'Home', to: '/', exact: true, icon: <HomeIcon className={props.color} /> },
    { title: 'Know about Plan', to: '/about_plan', icon: <SearchIcon className={props.color} /> },
    { title: 'Registration', to: '/registration', icon: <CreateIcon className={props.color} /> }
  ]
  if(props.authInfo.isAuth) {
    menuDefinitions.push({ title: 'My Dashboard', to: '/dashboard', icon: <DashboardIcon className={props.color} /> })
    menuDefinitions.push({ title: 'My Profile', to: '/profile', icon: <MaintainIcon className={props.color} /> })
    menuDefinitions.push({ title: 'My Tree', to: '/my_tree', icon: <AdminIcon className={props.color} /> })
    menuDefinitions.push({ title: 'Communication tabs', to: '/comunication', icon: <DemoIcon className={props.color} /> })
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