const userBookmarksReducer = (state=[], {type, payload}) => {
    switch(type)
    {
        case "UPDATE_BOOKMARKS_LIST": return [...payload]
        default : return [...state]
    }
}

export { userBookmarksReducer }