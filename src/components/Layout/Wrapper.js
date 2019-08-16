import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    minHeight: '100vh',
    background: theme.palette.background.default
  },
  '@global': {
    a: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }
}))

const Wrapper = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>
}
Wrapper.propTypes = {
  children: PropTypes.any
}

export default Wrapper
