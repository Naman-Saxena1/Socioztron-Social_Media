const userDetailsReducer = (
    state = {
        loggedInUserName: "",
        loggedInUserEmail: "", 
        loggedInUserProfile: "https://api.iconify.design/ph:user-circle-thin.svg",
        loggedInUserFollowing: []        
    }, 
    {type,payload}
) => {
    switch(type)
    {
        case "UPDATE_USER_DETAILS" : return {...JSON.parse(JSON.stringify(payload))}
        case "UPDATE_USER_FOLLOWING_LIST" : return {...state,loggedInUserFollowing: payload}
        default: return {...state}
    }
}

export { userDetailsReducer }