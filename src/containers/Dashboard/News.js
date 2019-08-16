import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Typography, Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Paper from '../../components/Paper'
import Loading from '../../components/Loading'

import { load } from '../../redux/modules/info'

const useStyles = makeStyles(theme => ({
  summary: {
    '& p': {
      margin: 0
    }
  },
  btnWrapper: {
    position: 'relative',
    marginTop: theme.spacing(1),
    marginLeft: -theme.spacing(1)
  }
}))

const News = ({ load, data }) => {
  const classes = useStyles()
  useEffect(() => {
    if (!data) {
      load('news')
    }
  }, [load, data])
  if (!data) {
    return <Loading m={2}>Laster nyheter</Loading>
  }
  return (
    <>
      {data.map(({ title, summary, url, icon }, i) => (
        <Box mb={2} key={i}>
          <Paper>
            <Typography variant="subtitle1">{title}</Typography>
            <div
              className={classes.summary}
              dangerouslySetInnerHTML={{ __html: summary }}
            />
            <Box className={classes.btnWrapper}>
              <Button component="a" href={url} target="_blank">
                Les mer
              </Button>
            </Box>
          </Paper>
        </Box>
      ))}
    </>
  )
}

export default connect(
  state => ({
    data: state.info.data.news
  }),
  {
    load
  }
)(News)
