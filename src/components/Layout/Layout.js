import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, Route, withRouter } from 'react-router-dom'
import {
  Container,
  Typography,
  Icon,
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  InputBase,
  Drawer,
  ListItemIcon
} from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'

import logo from './logo.svg'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column'
  },
  toolbar: {
    backgroundColor: theme.palette.secondary.main,
    color: '#000'
  },
  barTitle: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    display: 'inline-block',
    marginRight: 10,
    width: 36,
    height: 'auto'
  },
  logoText: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.1),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    },
    marginRight: theme.spacing(1)
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  },
  listItemIcon: {
    minWidth: 10,
    marginRight: 10
  },
  main: {
    paddingTop: 20
  }
}))

const SearchForm = ({ history: { push }, match }) => {
  const classes = useStyles()
  const [query, setQuery] = useState(match ? match.params.query : '')
  function onSearch(event) {
    event.preventDefault()
    push(query ? `/sok/${query}` : '/')
  }
  function onChangeQuery(event) {
    setQuery(event.target.value)
  }
  return (
    <form onSubmit={onSearch} className={classes.search}>
      <div className={classes.searchIcon}>
        <Icon>search</Icon>
      </div>
      <InputBase
        placeholder="Søk"
        value={query}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        onChange={onChangeQuery}
        inputProps={{ 'aria-label': 'Søk' }}
      />
    </form>
  )
}

const DropMenu = withRouter(({ logout, location }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  function handleMenu(event) {
    setAnchorEl(event.currentTarget)
  }
  function handleClose() {
    setAnchorEl(null)
  }
  useEffect(() => {
    if (open) {
      setAnchorEl(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
  return (
    <div>
      <IconButton
        aria-label="menyvalg"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Icon>more_vert</Icon>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="/tilbakemeldinger">
          <ListItemIcon className={classes.listItemIcon}>
            <Icon>feedback</Icon>
          </ListItemIcon>
          <Typography variant="inherit">Tilbakemeldinger</Typography>
        </MenuItem>
        <MenuItem component={Link} to="/innstillinger">
          <ListItemIcon className={classes.listItemIcon}>
            <Icon>settings</Icon>
          </ListItemIcon>
          <Typography variant="inherit">Innstillinger</Typography>
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon>account_circle</Icon>
          </ListItemIcon>
          <Typography variant="inherit">Logg ut</Typography>
        </MenuItem>
      </Menu>
    </div>
  )
})

const Layout = ({ children, logout, sidebar }) => {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)
  function toggleDrawer() {
    setDrawerOpen(!drawerOpen)
  }
  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="meny"
            onClick={toggleDrawer}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography
            variant="h6"
            className={classes.barTitle}
            component={Link}
            to="/"
          >
            <img src={logo} alt="" className={classes.logo} />
            <span className={classes.logoText}>Portalen</span>
          </Typography>
          <Route
            path="/sok/:query"
            children={props => {
              return <SearchForm {...props} />
            }}
          />
          <DropMenu logout={logout} />
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        {sidebar}
      </Drawer>
      <Container className={classes.main}>{children}</Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
  logout: PropTypes.func,
  sidebar: PropTypes.any
}

export default Layout
