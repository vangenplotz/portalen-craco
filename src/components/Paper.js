import React from 'react'
import { Paper as UiPaper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    flexGrow: 1,
    maxWidth: '100%',
    overflow: 'hidden'
  }
}))

const Paper = props => {
  const classes = useStyles()
  return <UiPaper className={classes.root} {...props} />
}

export default Paper
