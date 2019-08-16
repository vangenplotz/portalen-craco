import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Grid, Typography, Icon, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Paper from '../../components/Paper'
import Loading from '../../components/Loading'

import { load } from '../../redux/modules/info'

const useStyles = makeStyles(theme => ({
  col: {
    display: 'flex'
  },
  icon: {
    textAlign: 'center'
  }
}))

const Shortcuts = ({ load, data }) => {
  const classes = useStyles()
  useEffect(() => {
    if (!data) {
      load('shortcuts')
    }
  }, [load, data])
  if (!data) {
    return <Loading m={2}>Laster snarveier</Loading>
  }
  return (
    <Grid container spacing={2}>
      {data.map(({ title, description, url, icon }, i) => (
        <Grid item className={classes.col} xs={6} sm={4} md={2} key={i}>
          <Paper component="a" href={url}>
            <Box className={classes.icon}>
              <Icon>{icon}</Icon>
            </Box>
            <Typography variant="subtitle2" align="center">
              {title}
            </Typography>
            <Typography color="textSecondary" variant="body2" align="center">
              {description}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

export default connect(
  state => ({
    data: state.info.data.shortcuts
  }),
  {
    load
  }
)(Shortcuts)
