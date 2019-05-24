const initialState = {
    watchList: []
}

const wlReducer = (state = initialState, action) => {
    console.log(action.value)
    switch (action.type) {
        case "UPDATE":
            return {
                ...state,
                watchList: action.value
            }
        default:
            return state
    }
}

export default wlReducer