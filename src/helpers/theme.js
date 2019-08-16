import { red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: '1.25rem',
      lineHeight: 1.3,
      marginBottom: '0.25rem'
    },
    fontFamily:
      '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
  },
  palette: {
    primary: {
      main: '#6ac4ae',
      contrastText: '#fff'
    },
    secondary: {
      main: '#ffd520',
      contrastText: '#000'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#f2f2f2'
    }
  }
})

export default theme
