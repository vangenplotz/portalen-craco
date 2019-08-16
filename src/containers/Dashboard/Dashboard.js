import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import PageWrapper from '../../components/PageWrapper'
import Shortcuts from './Shortcuts'
import News from './News'
import Tasks from './Tasks'
import Messages from './Messages'

const useStyles = makeStyles(theme => ({
  grid: {
    [theme.breakpoints.up('sm')]: {
      // flexDirection: 'row-reverse'
    }
  }
}))

const Dashboard = () => {
  const classes = useStyles()
  return (
    <PageWrapper title="Forsiden">
      <Box mb={1}>
        <Shortcuts />
      </Box>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} sm={6}>
          <Box mb={2}>
            <Tasks />
          </Box>
          <Box>
            <Messages />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <News />
        </Grid>
      </Grid>
    </PageWrapper>
  )
}

export default Dashboard
