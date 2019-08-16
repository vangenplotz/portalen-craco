import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, CircularProgress } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  progress: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(3, 2)
  }
}))

const Loading = ({ children, ...props }) => {
  const classes = useStyles()
  return (
    <Box {...props}>
      <div className={classes.progress}>
        <CircularProgress />
      </div>
      <Typography align="center">{children}</Typography>
    </Box>
  )
}

export default Loading
