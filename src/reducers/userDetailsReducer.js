const userDetailsReducer = (
    state = {
        loggedInUserId: "",
        loggedInUserName: "",
        loggedInUserEmail: "", 
        loggedInUserProfile: "https://api.iconify.design/ph:user-circle-thin.svg",
        loggedInUserFollowing: []        
    }, 
    {type,payload}
) => {
    switch(type)
    {
        case "UPDATE_USER_DETAILS" : {
            let updatedState = {...JSON.parse(JSON.stringify(payload))}
            return updatedState
        }
        case "UPDATE_USER_FOLLOWING_LIST" : {
            let updatedUserFollowingState = {...state,loggedInUserFollowing: payload}
            return updatedUserFollowingState
        }
        default: return {...state}
    }
}

export { userDetailsReducer }