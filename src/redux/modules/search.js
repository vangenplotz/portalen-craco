const LOAD = 'tfk-portalen/search/LOAD'
const LOAD_SUCCESS = 'tfk-portalen/search/LOAD_SUCCESS'
const LOAD_FAIL = 'tfk-portalen/search/LOAD_FAIL'
const RESET = 'tfk-portalen/search/RESET'

const initialState = {
  data: null
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        data: action.result.hits,
        loading: false
      }
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case RESET:
      return initialState
    default:
      return state
  }
}

export function load(params = {}) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client =>
      client.get('/api/search', {
        params
      })
  }
}

export function reset() {
  return {
    type: RESET
  }
}
