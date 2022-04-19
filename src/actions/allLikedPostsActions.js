const updateAllUserLikedPosts = (updatedAllLikedPosts) => {
    return {
        type: "UPDATE_ALL_USER_LIKED_POSTS",
        payload: updatedAllLikedPosts
    }
}

export { updateAllUserLikedPosts }