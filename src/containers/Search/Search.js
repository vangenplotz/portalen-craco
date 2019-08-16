import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Typography,
  Box,
  Button,
  Fab,
  CircularProgress
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { parse, stringify } from 'querystringify'
import { Link } from 'react-router-dom'
import omit from 'object.omit'

import Paper from '../../components/Paper'
import Loading from '../../components/Loading'

import { load, reset } from '../../redux/modules/search'

const useStyles = makeStyles(theme => ({
  faset: {
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    color: theme.palette.primary.main,
    backgroundColor: 'white'
  },
  fasetActive: {
    marginRight: '0.5rem',
    marginBottom: '0.5rem'
  }
}))

const formatType = item => {
  switch (item._type) {
    case 'article':
      return {
        title: item._source.title,
        text: item._source.description,
        url: item._source.url
      }
    case 'employee':
      return {
        title: item._source.title,
        text: `${item._source.positions[0].info} - ${item._source.description}`,
        url: item._source.url
      }
    default:
      return {
        title: item._source.title,
        text: item._source.description,
        url: item._source.url
      }
  }
}

const tabs = [
  {
    title: 'Alt innhold',
    param: null
  },
  {
    title: 'Ansatte',
    param: 'employees'
  },
  {
    title: 'www.telemark.no',
    param: 'www'
  },
  {
    title: 'Infosider',
    param: 'portaleninfo'
  }
]

const size = 20

const Search = ({
  load,
  data,
  reset,
  loading,
  location,
  match: { params }
}) => {
  const classes = useStyles()
  const parsedSearch = parse(location.search)
  const faset = parsedSearch.faset || null
  const page = parseInt(parsedSearch.page || 1)
  const query = params.query
  useEffect(() => {
    const from = page * size - size
    load({
      query,
      faset,
      size,
      from
    })
  }, [load, query, faset, page])
  useEffect(() => {
    return () => reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (!data) {
    return <Loading m={2}>Laster søk</Loading>
  }
  const totalPages = Math.max(1, Math.ceil(data.total / size))
  const pages = Array.from({ length: totalPages }, (v, k) => k + 1)
  return (
    <>
      <Box display="flex" justifyContent="space-between" mb={1}>
        {loading && (
          <Box mr={1} display="flex" alignItems="center">
            <CircularProgress size={20} />
          </Box>
        )}
        <Box flex="1">
          <Typography variant="h5">Søk: "{params.query}"</Typography>
        </Box>
      </Box>
      <Box mb={1}>
        {tabs.map(({ title, param }) => {
          const active = faset === param
          const search = !!param
            ? { ...parsedSearch, faset: param }
            : omit(parsedSearch, 'faset')
          return (
            <Button
              key={title}
              className={active ? classes.fasetActive : classes.faset}
              variant="contained"
              color={active ? 'primary' : null}
              component={Link}
              to={{
                pathname: `${location.pathname}`,
                search: stringify(search)
              }}
            >
              {title}
            </Button>
          )
        })}
      </Box>
      {pages.length > 1 && (
        <Box mb={1}>
          {pages.map(p => {
            const active = p === page
            const search =
              p > 1 ? { ...parsedSearch, page: p } : omit(parsedSearch, 'page')
            return (
              <Fab
                key={p}
                className={active ? classes.fasetActive : classes.faset}
                color={active ? 'primary' : null}
                aria-label={`Gå til side ${page}`}
                size="small"
                component={Link}
                to={{
                  pathname: `${location.pathname}`,
                  search: stringify(search)
                }}
              >
                {p}
              </Fab>
            )
          })}
        </Box>
      )}
      <Typography paragraph>
        {data.total} treff på søkeordet "{query}", viser side {page} av{' '}
        {totalPages}
      </Typography>
      {data.hits.map((item, i) => {
        const { title, text, url } = formatType(item)
        return (
          <Box mb={2} key={i}>
            <Paper>
              <Typography variant="subtitle1">
                <strong>{title}</strong>
              </Typography>
              <Typography>{text}</Typography>
              <Box mt={1}>
                <Button component="a" href={url} target="_blank">
                  Les mer
                </Button>
              </Box>
            </Paper>
          </Box>
        )
      })}
    </>
  )
}

export default connect(
  state => ({
    data: state.search.data,
    loading: state.search.loading
  }),
  {
    load,
    reset
  }
)(Search)
