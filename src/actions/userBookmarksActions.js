const updateUserBookmarks = (updatedBookmarkList) => {
    return {
        type: "UPDATE_BOOKMARKS_LIST",
        payload: updatedBookmarkList
    }
}

export { updateUserBookmarks }