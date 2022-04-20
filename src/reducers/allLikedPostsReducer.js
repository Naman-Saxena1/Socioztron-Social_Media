const allLikedPostsReducer = (state = [], {type, payload}) => {
    switch(type)
    {
        case "UPDATE_ALL_USER_LIKED_POSTS": return [...payload]
        default: return [...state]
    }
}

export { allLikedPostsReducer }