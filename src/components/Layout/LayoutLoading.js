import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet-async'
import {
  Container,
  Paper,
  Typography,
  CircularProgress
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center'
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(3, 2)
  }
}))

const LayoutLoading = ({ title, children }) => {
  const classes = useStyles()
  return (
    <>
      <Helmet>{title && <title>{title}</title>}</Helmet>
      <Container className={classes.root}>
        <Paper className={classes.paper}>
          <Typography align="center">{title}</Typography>
          <div className={classes.progress}>
            <CircularProgress />
          </div>
          {children}
        </Paper>
      </Container>
    </>
  )
}
LayoutLoading.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string
}

export default LayoutLoading
