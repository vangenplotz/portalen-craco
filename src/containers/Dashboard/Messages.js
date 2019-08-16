import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemIcon,
  Icon,
  ListItemText,
  Fab,
  Box,
  Divider,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import dayjs from 'dayjs'
import ReactMarkdown from 'react-markdown'

import Paper from '../../components/Paper'
import Loading from '../../components/Loading'

import MessageDialog from './MessageDialog'

import {
  load,
  add,
  edit,
  remove,
  loadRoles
} from '../../redux/modules/messages'

const useStyles = makeStyles(theme => ({
  tasks: {
    position: 'relative',
    marginLeft: -16,
    marginRight: -16
  },
  icon: {
    minWidth: 0,
    marginRight: 16
  },
  listItem: {
    '& p': {
      marginTop: 0,
      marginBottom: '0.5rem'
    }
  }
}))

const MessageListItem = ({ edit, remove, ...props }) => {
  const onEdit = () => edit(props)
  const onRemove = () => remove(props._id, props)
  const classes = useStyles()
  return (
    <>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary={<strong>{props.title}</strong>}
          component="div"
          className={classes.listItem}
          secondary={
            <>
              <Typography color="textSecondary" variant="body2">
                {dayjs(props.date_from).format('DD/MM/YYYY')} av {props.user.cn}
              </Typography>
              <ReactMarkdown source={props.text} />
            </>
          }
          secondaryTypographyProps={{
            component: 'div',
            variant: null,
            color: 'inherit'
          }}
        />
        {remove && (
          <IconButton onClick={onRemove} size="small">
            <Icon>delete</Icon>
          </IconButton>
        )}
        {edit && (
          <IconButton onClick={onEdit} size="small">
            <Icon>edit</Icon>
          </IconButton>
        )}
      </ListItem>
    </>
  )
}

const Messages = ({
  load,
  data,
  user,
  hasNextPage,
  loading,
  add,
  edit,
  remove,
  roles,
  loadRoles
}) => {
  const [limit, setLimit] = useState(10)
  const classes = useStyles()
  const [editItem, setEditItem] = useState(null)
  const subscriptionRoles = roles
    ? roles
        .filter(({ subscription }) => subscription)
        .map(({ id }) => id)
        .join('|')
    : null
  useEffect(() => {
    loadRoles()
  }, [loadRoles])
  useEffect(() => {
    if (subscriptionRoles) {
      load({
        roles: subscriptionRoles,
        limit
      })
    }
  }, [limit, load, subscriptionRoles])
  if (!data || !user || !roles) {
    return <Loading m={2}>Laster meldinger</Loading>
  }
  const loadMore = () => {
    setLimit(limit + 10)
  }
  const startEdit = item => {
    setEditItem(item)
  }
  const startCreate = () => {
    setEditItem({
      role: user.roles,
      date_from: dayjs().toDate(),
      date_to: dayjs()
        .add(7, 'day')
        .toDate()
    })
  }
  const onDoneEdit = message => {
    if (!message) {
      return setEditItem(null)
    }
    const { _id, ...item } = message
    if (_id) {
      return edit(_id, item).then(() => setEditItem(null))
    }
    return add(item).then(() => setEditItem(null))
  }
  return (
    <Paper>
      <Box display="flex" justifyContent="space-between">
        <Box flex="1">
          <Typography variant="subtitle1">Meldinger</Typography>
        </Box>
        <Fab
          color="primary"
          aria-label="edit"
          size="small"
          onClick={startCreate}
        >
          <Icon>add</Icon>
        </Fab>
      </Box>
      <div className={classes.tasks}>
        <List>
          {data.length < 1 && (
            <ListItem>
              <ListItemIcon className={classes.icon}>
                <Icon>warning</Icon>
              </ListItemIcon>
              <ListItemText primary="Ingen meldinger" />
            </ListItem>
          )}
          {data.map((item, i) => (
            <MessageListItem
              key={i}
              {...item}
              edit={item.user.mail === user.mail ? startEdit : null}
              remove={item.user.mail === user.mail ? remove : null}
            />
          ))}
        </List>
      </div>
      <MessageDialog item={editItem} roles={roles} onDone={onDoneEdit} />
      {hasNextPage && (
        <>
          <Button onClick={loadMore} disabled={loading}>
            {loading ? 'Laster inn' : 'Last inn flere'}
          </Button>
        </>
      )}
    </Paper>
  )
}

export default connect(
  state => ({
    data: state.messages.data,
    roles: state.messages.roles,
    user: state.user.data,
    loading: state.messages.loading,
    hasNextPage: state.messages.hasNextPage
  }),
  {
    load,
    add,
    edit,
    remove,
    loadRoles
  }
)(Messages)
