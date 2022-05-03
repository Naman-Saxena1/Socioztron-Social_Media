const userDetailsReducer = (
    state = {
        loggedInUserName: "",
        loggedInUserEmail: "", 
        loggedInUserProfile: "https://api.iconify.design/ph:user-circle-thin.svg"        
    }, 
    {type,payload}
) => {
    switch(type)
    {
        case "UPDATE_USER_DETAILS" : return {...JSON.parse(JSON.stringify(payload))}
        default: return {...state}
    }
}

export { userDetailsReducer }