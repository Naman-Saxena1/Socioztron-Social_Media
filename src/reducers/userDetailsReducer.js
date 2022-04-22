const userDetailsReducer = (
    state = {
        loggedInUserName: "",
        loggedInUserEmail: "", 
        loggedInUserProfile: "https://enztron-dev-branch.netlify.app/Icons-and-Images/Avatars/blue-illustration-avatar.svg"
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