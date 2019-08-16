const LOAD = 'tfk-portalen/auth/LOAD'
const LOAD_SUCCESS = 'tfk-portalen/auth/LOAD_SUCCESS'
const LOAD_FAIL = 'tfk-portalen/auth/LOAD_FAIL'

const initialState = {}

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
        loading: false,
        data: action.result
      }
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/api/user')
  }
}
