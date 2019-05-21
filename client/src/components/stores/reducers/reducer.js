const initialState = {
  isAuthenticated:false,
  username:''
}

const reducer = (state=initialState,action)=>{
  switch(action.type){
    case 'ON_AUTH':
    return{
      ...state,
      isAuthenticated: action.token != null ? true:false,
      username: action.username
    }
    case 'LOGOUT':
    return{
      ...state,
      isAuthenticated: false,
      username:''
    }
    default:return state
  }
}
export default reducer
