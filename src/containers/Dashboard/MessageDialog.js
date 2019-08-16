import React, { useEffect, useState } from 'react'
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
  Select,
  Input,
  Chip,
  MenuItem,
  FormControl,
  InputLabel,
  ListItemIcon,
  Icon
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250
    }
  }
}

const useStyles = makeStyles(theme => ({
  dialog: {
    minWidth: 350
  },
  datePicker: {
    display: 'flex'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  formControl: {
    display: 'flex'
  },
  menuItem: {
    backgroundColor: 'white !important',
    fontSize: '0.8rem',
    minHeight: 0
  },
  icon: {
    minWidth: 0,
    marginRight: theme.spacing(1)
  }
}))

const MessageDialog = ({ item, onDone, roles }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [editItem, setEditItem] = useState(item)
  useEffect(() => {
    if (item) {
      setEditItem(item)
      setOpen(true)
    } else {
      setEditItem(null)
      setOpen(false)
    }
  }, [item])
  const onCancel = () => {
    onDone(null)
  }
  const onChangeTitle = event => {
    setEditItem({
      ...editItem,
      title: event.target.value
    })
  }
  const onChangeText = event => {
    setEditItem({
      ...editItem,
      text: event.target.value
    })
  }
  const onChangeRoles = event => {
    if (event.target.value.length > 0) {
      setEditItem({
        ...editItem,
        role: event.target.value
      })
    }
  }
  const onChangeDateFrom = date => {
    setEditItem({
      ...editItem,
      date_from: date
    })
  }
  const onChangeDateTo = date => {
    setEditItem({
      ...editItem,
      date_to: date
    })
  }
  const onSave = () => {
    onDone(editItem)
  }
  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" className={classes.dialog}>
        {editItem && editItem._id ? 'Endre' : 'Ny'} melding
      </DialogTitle>
      {editItem && (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DialogContent>
            <Box mb={1}>
              <TextField
                autoFocus
                id="message-title"
                label="Tittel"
                fullWidth
                value={editItem.title || ''}
                onChange={onChangeTitle}
              />
            </Box>
            <Box mb={1}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="message-role">Roller</InputLabel>
                <Select
                  multiple
                  value={editItem.role}
                  className={classes.select}
                  onChange={onChangeRoles}
                  input={<Input id="message-role" />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {roles.map(({ id, name }) => {
                    const isSelected = editItem.role.indexOf(id) !== -1
                    return (
                      <MenuItem
                        key={id}
                        value={id}
                        className={classes.menuItem}
                        style={
                          isSelected
                            ? { fontWeight: theme.typography.fontWeightBold }
                            : null
                        }
                      >
                        <ListItemIcon className={classes.icon}>
                          <Icon>
                            {isSelected
                              ? 'check_box'
                              : 'check_box_outline_blank'}
                          </Icon>
                        </ListItemIcon>
                        {name}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <KeyboardDatePicker
                  disableToolbar
                  format="dd/MM/yyyy"
                  id="message-date-from"
                  label="Vises fra"
                  value={editItem.date_from}
                  onChange={onChangeDateFrom}
                  className={classes.datePicker}
                  KeyboardButtonProps={{
                    'aria-label': 'Vises fra dato'
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <KeyboardDatePicker
                  disableToolbar
                  format="dd/MM/yyyy"
                  id="message-date-from"
                  label="Vises til"
                  value={editItem.date_to}
                  onChange={onChangeDateTo}
                  className={classes.datePicker}
                  KeyboardButtonProps={{
                    'aria-label': 'Vises til dato'
                  }}
                />
              </Grid>
            </Grid>
            <Box pt={2}>
              <TextField
                id="message-text"
                label="Melding"
                fullWidth
                multiline
                value={editItem.text || ''}
                onChange={onChangeText}
              />
            </Box>
          </DialogContent>
        </MuiPickersUtilsProvider>
      )}
      <DialogActions>
        <Button onClick={onCancel}>Avbryt</Button>
        <Button onClick={onSave}>Lagre</Button>
      </DialogActions>
    </Dialog>
  )
}

export default MessageDialog
