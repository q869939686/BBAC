function applyActions (store) {
    console.log(store)
    return (dispatch) =>{
        console.log(dispatch)
        return (action) => {
            return dispatch(action)
        }
    } 
}

export default applyActions;