const currentProfilePageReducer = ( state={
    allPosts: [],
    bookmarks: [],
    email: "",
    following: [],
    likedPosts: [],
    messages: [],
    name: "",
    password: "",
    portfolioLink: "",
    profileBackgroundSrc: "",
    profilePicSrc: "",
    userBio: "",
    userDob: "",
},{type,payload} ) => {
    switch(type)
    {
        case "UPDATE_CURRENT_PROFILE_PAGE_DETAILS" : return JSON.parse(JSON.stringify(payload))
        default: return state
    }
}

export { currentProfilePageReducer }