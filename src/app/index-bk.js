import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import './styles/styles.css'
import Users from './components/Users/Users';

const store = configureStore()
const styles = {
  root: {
    display: 'flex',
    height: 300,
  },
};


export class App extends React.Component {


  render() {
    const { classes } = this.props
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <Users />
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default withStyles(styles)(App)

render(<App/>, window.document.getElementById('root'))
