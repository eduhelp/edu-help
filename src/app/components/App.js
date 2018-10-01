import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from './Layout/Layout'
import Registration from './Registration/Registration'
import muiTheme from '../config/themeConfig'

const App = () => (
  <MuiThemeProvider theme={muiTheme}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Layout} />
        <Route path="/Registration" component={Registration} />
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>
)

export default App