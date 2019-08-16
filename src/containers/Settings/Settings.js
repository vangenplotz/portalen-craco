import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'

import Paper from '../../components/Paper'
import Loading from '../../components/Loading'

import {
  loadRoles,
  addSubscription,
  removeSubscription
} from '../../redux/modules/messages'

const RoleOption = ({
  id,
  name,
  subscription,
  required,
  addSubscription,
  removeSubscription
}) => {
  const handleChange = event => {
    if (event.target.checked) {
      addSubscription(id)
    } else {
      removeSubscription(id)
    }
  }
  return (
    <FormControlLabel
      control={
        <Checkbox
          color="primary"
          checked={subscription}
          onChange={handleChange}
          value={id}
          disabled={required}
        />
      }
      label={name}
    />
  )
}

const Settings = ({
  roles,
  loading,
  loadRoles,
  addSubscription,
  removeSubscription
}) => {
  const rolesLength = roles && roles.length
  useEffect(() => {
    if (!rolesLength) {
      loadRoles()
    }
  }, [loadRoles, rolesLength])
  return (
    <>
      <Typography paragraph variant="h5">
        Innstillinger for informasjon
      </Typography>
      <Paper>
        <Typography paragraph variant="subtitle1">
          <strong>Meldinger</strong>
        </Typography>
        <Typography paragraph variant="body2">
          Velg hvilke grupper du vil abonnere på meldinger fra
        </Typography>
        {roles ? (
          <FormGroup>
            {roles.map(item => (
              <RoleOption
                key={item.id}
                {...item}
                addSubscription={addSubscription}
                removeSubscription={removeSubscription}
              />
            ))}
          </FormGroup>
        ) : (
          <Loading m={2}>Laster roller</Loading>
        )}
      </Paper>
    </>
  )
}

export default connect(
  state => ({
    roles: state.messages.roles,
    loading: state.messages.loadingSubscription
  }),
  {
    loadRoles,
    addSubscription,
    removeSubscription
  }
)(Settings)
