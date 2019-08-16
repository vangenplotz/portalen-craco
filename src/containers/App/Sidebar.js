import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { load, addUrl, editUrl, removeUrl } from '../../redux/modules/info'
import Loading from '../../components/Loading'

const useStyles = makeStyles(theme => ({
  listItemIcon: {
    minWidth: 10,
    marginRight: 10
  },
  list: {
    minWidth: 250
  },
  dialog: {
    minWidth: 350
  }
}))

const SidebarLink = ({ edit, remove, ...props }) => {
  const classes = useStyles()
  const hasActions = edit || remove
  const linkProps = {
    href: props.url,
    target: '_blank'
  }
  const onEdit = () => edit(props)
  const onRemove = () => remove(props._id, props)
  return (
    <ListItem {...(!hasActions ? { component: 'a', ...linkProps } : {})}>
      <ListItemIcon className={classes.listItemIcon}>
        <Icon>{props.icon || 'link'}</Icon>
      </ListItemIcon>
      <ListItemText
        primary={hasActions ? <a {...linkProps}>{props.title}</a> : props.title}
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
  )
}

const Sidebar = ({ load, links, urls, addUrl, editUrl, removeUrl }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  useEffect(() => {
    load('links')
    load('urls')
  }, [load])
  if (!links && !urls) {
    return (
      <Box className={classes.list}>
        <Loading m={2}>Laster lenker</Loading>
      </Box>
    )
  }
  const closeDialog = () => {
    setEditItem(null)
    setOpen(false)
  }
  const startEdit = item => {
    setEditItem(item)
    setOpen(true)
  }
  const startCreate = () => {
    setEditItem({
      title: '',
      url: ''
    })
    setOpen(true)
  }
  const changeTitle = event => {
    setEditItem({
      ...editItem,
      title: event.target.value
    })
  }
  const changeUrl = event => {
    setEditItem({
      ...editItem,
      url: event.target.value
    })
  }
  const saveUrl = () => {
    if (editItem._id) {
      editUrl(editItem._id, editItem).then(() => {
        setEditItem(null)
        setOpen(false)
      })
    } else {
      addUrl(editItem).then(() => {
        setEditItem(null)
        setOpen(false)
      })
    }
  }
  return (
    <>
      <List className={classes.list}>
        {links && links.map((item, i) => <SidebarLink {...item} key={i} />)}
        {urls &&
          urls.map((item, i) => (
            <SidebarLink
              {...item}
              edit={startEdit}
              remove={removeUrl}
              key={i}
            />
          ))}
      </List>
      <Box p={1}>
        <Button fullWidth onClick={startCreate}>
          <Icon>add</Icon>
          Legg til lenke
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.dialog}>
          {editItem && editItem._id ? 'Endre' : 'Ny'} url
        </DialogTitle>
        {editItem && (
          <DialogContent>
            <Box mb={1}>
              <TextField
                autoFocus
                id="url-title"
                label="Tittel"
                fullWidth
                value={editItem.title}
                onChange={changeTitle}
              />
            </Box>
            <TextField
              id="url-url"
              label="Url"
              fullWidth
              value={editItem.url}
              onChange={changeUrl}
            />
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={closeDialog}>Avbryt</Button>
          <Button onClick={saveUrl}>Lagre</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default connect(
  state => ({
    links: state.info.data.links,
    urls: state.info.data.urls
  }),
  {
    load,
    addUrl,
    editUrl,
    removeUrl
  }
)(Sidebar)
