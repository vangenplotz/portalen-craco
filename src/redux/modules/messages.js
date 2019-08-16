const LOAD = 'tfk-portalen/messages/LOAD'
const LOAD_SUCCESS = 'tfk-portalen/messages/LOAD_SUCCESS'
const LOAD_FAIL = 'tfk-portalen/messages/LOAD_FAIL'
const ADD = 'tfk-portalen/messages/ADD'
const ADD_SUCCESS = 'tfk-portalen/messages/ADD_SUCCESS'
const ADD_FAIL = 'tfk-portalen/messages/ADD_FAIL'
const EDIT = 'tfk-portalen/messages/EDIT'
const EDIT_SUCCESS = 'tfk-portalen/messages/EDIT_SUCCESS'
const EDIT_FAIL = 'tfk-portalen/messages/EDIT_FAIL'
const REMOVE = 'tfk-portalen/messages/REMOVE'
const REMOVE_SUCCESS = 'tfk-portalen/messages/REMOVE_SUCCESS'
const REMOVE_FAIL = 'tfk-portalen/messages/REMOVE_FAIL'

const LOAD_ROLES = 'tfk-portalen/messages/LOAD_ROLES'
const LOAD_ROLES_SUCCESS = 'tfk-portalen/messages/LOAD_ROLES_SUCCESS'
const LOAD_ROLES_FAIL = 'tfk-portalen/messages/LOAD_ROLES_FAIL'

const LIKE = 'tfk-portalen/messages/LIKE'
const LIKE_SUCCESS = 'tfk-portalen/messages/LIKE_SUCCESS'
const LIKE_FAIL = 'tfk-portalen/messages/LIKE_FAIL'
const UNLIKE = 'tfk-portalen/messages/UNLIKE'
const UNLIKE_SUCCESS = 'tfk-portalen/messages/UNLIKE_SUCCESS'
const UNLIKE_FAIL = 'tfk-portalen/messages/UNLIKE_FAIL'
const HIDE = 'tfk-portalen/messages/HIDE'
const HIDE_SUCCESS = 'tfk-portalen/messages/HIDE_SUCCESS'
const HIDE_FAIL = 'tfk-portalen/messages/HIDE_FAIL'

const ADDSUB = 'tfk-portalen/infos/ADDSUB'
const ADDSUB_SUCCESS = 'tfk-portalen/infos/ADDSUB_SUCCESS'
const ADDSUB_FAIL = 'tfk-portalen/infos/ADDSUB_FAIL'
const REMOVESUB = 'tfk-portalen/infos/REMOVESUB'
const REMOVESUB_SUCCESS = 'tfk-portalen/infos/REMOVESUB_SUCCESS'
const REMOVESUB_FAIL = 'tfk-portalen/infos/REMOVESUB_FAIL'

const initialState = {
  data: null,
  hasNextPage: null,
  roles: null
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
        loading: false,
        data: action.result.items,
        hasNextPage: action.result.hasNextPage
      }
    case LOAD_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.result
      }
    case LOAD_FAIL:
    case ADD:
    case EDIT:
    case REMOVE:
      return {
        ...state,
        loading: true
      }
    case REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter(item => item._id !== action.result._id)
      }
    case ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [action.result, ...state.data]
      }
    case EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map(item => {
          if (item._id === action.result._id) {
            return action.result
          }
          return item
        })
      }
    case ADD_FAIL:
    case EDIT_FAIL:
    case REMOVE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case ADDSUB:
      return {
        ...state,
        loadingSubscription: true,
        errorSubscription: null,
        roles: state.roles.map(item => {
          if (item.id === action.role) {
            return { ...item, subscription: true }
          }
          return item
        })
      }
    case REMOVESUB:
      return {
        ...state,
        loadingSubscription: true,
        errorSubscription: null,
        roles: state.roles.map(item => {
          if (item.id === action.role) {
            return { ...item, subscription: false }
          }
          return item
        })
      }
    case ADDSUB_FAIL:
      return {
        ...state,
        loadingSubscription: false,
        errorSubscription: action.error,
        roles: state.roles.map(item => {
          if (item.id === action.role) {
            return { ...item, subscription: false }
          }
          return item
        })
      }
    case REMOVESUB_FAIL:
      return {
        ...state,
        loadingSubscription: false,
        errorSubscription: action.error,
        roles: state.roles.map(item => {
          if (item.id === action.role) {
            return { ...item, subscription: true }
          }
          return item
        })
      }
    case ADDSUB_SUCCESS:
      return {
        ...state,
        loadingSubscription: false
      }
    case REMOVESUB_SUCCESS:
      return {
        ...state,
        loadingSubscription: false
      }
    default:
      return state
  }
}

export function load({ roles, limit = 10 }) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(`/api/messages?roles=${roles}&limit=${limit}`)
  }
}
export function loadRoles() {
  return {
    types: [LOAD_ROLES, LOAD_ROLES_SUCCESS, LOAD_ROLES_FAIL],
    promise: client => client.get('/api/messages/roles')
  }
}

export function add(item) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAIL],
    promise: client =>
      client.post('/api/messages', {
        data: item
      })
  }
}

export function edit(id, item) {
  return {
    types: [EDIT, EDIT_SUCCESS, EDIT_FAIL],
    promise: client =>
      client.put(`/api/messages?id=${id}`, {
        data: item
      })
  }
}

export function remove(id) {
  return {
    types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
    promise: client => client.del(`/api/messages?id=${id}`)
  }
}

export function addSubscription(role) {
  return {
    types: [ADDSUB, ADDSUB_SUCCESS, ADDSUB_FAIL],
    promise: client =>
      client.post('/api/messages/roles', {
        data: { role }
      }),
    role
  }
}

export function removeSubscription(role) {
  return {
    types: [REMOVESUB, REMOVESUB_SUCCESS, REMOVESUB_FAIL],
    promise: client => client.del(`/api/messages/roles?id=${role}`),
    role
  }
}

export function like(id) {
  return {
    types: [LIKE, LIKE_SUCCESS, LIKE_FAIL],
    promise: client => client.put(`/messages/like/${id}`)
  }
}

export function unlike(id) {
  return {
    types: [UNLIKE, UNLIKE_SUCCESS, UNLIKE_FAIL],
    promise: client => client.put(`/messages/unlike/${id}`)
  }
}

export function hide(id) {
  return {
    types: [HIDE, HIDE_SUCCESS, HIDE_FAIL],
    promise: client => client.put(`/messages/hide/${id}`)
  }
}
