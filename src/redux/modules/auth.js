const LOAD = 'tfk-portalen/user/LOAD'
const LOAD_SUCCESS = 'tfk-portalen/user/LOAD_SUCCESS'
const LOAD_FAIL = 'tfk-portalen/user/LOAD_FAIL'

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

export function load(domain) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client =>
      client.post(`/api/auth?baseDomain=${encodeURIComponent(domain)}`)
  }
}
