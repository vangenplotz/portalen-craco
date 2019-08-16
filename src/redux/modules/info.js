const LOAD = 'tfk-portalen/info/LOAD'
const LOAD_SUCCESS = 'tfk-portalen/info/LOAD_SUCCESS'
const LOAD_FAIL = 'tfk-portalen/info/LOAD_FAIL'

const ADDURL = 'tfk-portalen/infos/ADDURL'
const ADDURL_SUCCESS = 'tfk-portalen/infos/ADDURL_SUCCESS'
const ADDURL_FAIL = 'tfk-portalen/infos/ADDURL_FAIL'
const EDITURL = 'tfk-portalen/infos/EDITURL'
const EDITURL_SUCCESS = 'tfk-portalen/infos/EDITURL_SUCCESS'
const EDITURL_FAIL = 'tfk-portalen/infos/EDITURL_FAIL'
const REMOVEURL = 'tfk-portalen/infos/REMOVEURL'
const REMOVEURL_SUCCESS = 'tfk-portalen/infos/REMOVEURL_SUCCESS'
const REMOVEURL_FAIL = 'tfk-portalen/infos/REMOVEURL_FAIL'

const initialState = {
  errors: [],
  data: {
    links: null,
    shortcuts: null,
    tasks: null,
    ads: null,
    news: null,
    urls: null
  }
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        errors: state.errors.filter(item => item.infoType !== action.infoType)
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [action.infoType]: action.result
        }
      }
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        errors: [
          ...state.errors,
          { infoType: action.infoType, error: action.error, active: true }
        ],
        data: {
          ...state.data,
          [action.infoType]: []
        }
      }
    case ADDURL:
    case EDITURL:
    case REMOVEURL:
      return {
        ...state,
        loadinglink: true,
        errors: state.errors.filter(item => item.infoType !== 'urls')
      }
    case ADDURL_FAIL:
    case EDITURL_FAIL:
    case REMOVEURL_FAIL:
      return {
        ...state,
        loadinglink: false,
        errors: [
          ...state.errors,
          { infoType: 'urls', error: action.error, active: true }
        ]
      }
    case ADDURL_SUCCESS:
      return {
        ...state,
        loadinglink: false,
        data: {
          ...state.data,
          urls: [...state.data.urls, action.result]
        }
      }
    case EDITURL_SUCCESS:
      return {
        ...state,
        loadinglink: false,
        data: {
          ...state.data,
          urls: state.data.urls.map(item => {
            if (item._id === action.id) {
              return action.result
            }
            return item
          })
        }
      }
    case REMOVEURL_SUCCESS:
      return {
        ...state,
        loadinglink: false,
        data: {
          ...state.data,
          urls: state.data.urls.filter(item => item._id !== action.id)
        }
      }
    default:
      return state
  }
}
export function load(infoType) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(`/api/info/${infoType}`),
    infoType
  }
}
export function addUrl(item) {
  return {
    types: [ADDURL, ADDURL_SUCCESS, ADDURL_FAIL],
    promise: client =>
      client.post('/api/info/urls', {
        data: item
      })
  }
}
export function editUrl(id, item) {
  return {
    types: [EDITURL, EDITURL_SUCCESS, EDITURL_FAIL],
    promise: client =>
      client.put(`/api/info/urls?id=${id}`, {
        data: item
      }),
    id
  }
}
export function removeUrl(id) {
  return {
    types: [REMOVEURL, REMOVEURL_SUCCESS, REMOVEURL_FAIL],
    promise: client => client.del(`/api/info/urls?id=${id}`),
    id
  }
}
