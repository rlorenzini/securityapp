const initialState = {
  isAuthenticated: false,
  username: '',
  watchList: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        watchList: action.value
      }
    case 'ON_AUTH':
      return {
        ...state,
        isAuthenticated: action.token != null ? true : false,
        username: action.username
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        username: ''
      }
    default: return state
  }
}
export default reducer
