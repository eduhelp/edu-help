import { createMuiTheme } from '@material-ui/core/styles'

export const praxis = {
  light: '#f05545',
  main: '#8c1f27',
  dark: '#7f0000',
  contrastText: '#fff',
}

const praxisTheme = createMuiTheme({
  palette: {
    primary: praxis,
    secondary: praxis,
  },
})

export default praxisTheme