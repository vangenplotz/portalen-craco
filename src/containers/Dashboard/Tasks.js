import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Paper from '../../components/Paper'
import Loading from '../../components/Loading'

import { load } from '../../redux/modules/info'

function iconMapper(system) {
  switch (system) {
    case 'visma':
      return 'insert_drive_file'
    case 'compilo':
      return 'timeline'
    case 'tasks-exchange':
      return 'repeat'
    case 'mail-exchange':
      return 'mail'
    case 'cs':
      return 'contact_mail'
    case 'p360':
      return 'archive'
    default:
      return 'done'
  }
}

const useStyles = makeStyles(theme => ({
  tasks: {
    position: 'relative',
    marginLeft: -16
  },
  icon: {
    minWidth: 0,
    marginRight: 16
  }
}))

const Tasks = ({ load, data }) => {
  const classes = useStyles()
  useEffect(() => {
    if (!data) {
      load('tasks')
    }
  }, [load, data])
  if (!data) {
    return <Loading m={2}>Laster oppgaver</Loading>
  }
  return (
    <Paper>
      <Typography variant="subtitle1">Dine oppgaver</Typography>
      <div className={classes.tasks}>
        <List>
          {data.length < 1 && (
            <ListItem>
              <ListItemIcon className={classes.icon}>
                <Icon>tag_faces</Icon>
              </ListItemIcon>
              <ListItemText primary="Du har ingen oppgaver" />
            </ListItem>
          )}
          {data.map(({ title, url, systemid }, i) => (
            <ListItem component="a" href={url} key={i}>
              <ListItemIcon className={classes.icon}>
                <Icon>{iconMapper(systemid)}</Icon>
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List>
      </div>
    </Paper>
  )
}

export default connect(
  state => ({
    data: state.info.data.tasks
  }),
  {
    load
  }
)(Tasks)
