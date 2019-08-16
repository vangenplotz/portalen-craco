import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button, Box } from '@material-ui/core'

import Paper from '../../components/Paper'

const NotFound = ({ location: { pathname } }) => {
  return (
    <>
      <Typography paragraph variant="h5">
        Ikke funnet (404)
      </Typography>
      <Paper>
        <Typography paragraph variant="body2">
          Siden "{pathname}" ble ikke funnet.
        </Typography>
        <Box>
          <Button component={Link} color="primary" variant="contained" to="/">
            Tilbake til forsiden
          </Button>
        </Box>
      </Paper>
    </>
  )
}

export default NotFound
