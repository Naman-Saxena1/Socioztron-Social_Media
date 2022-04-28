const updateHomeFeed = (updatedHomeFeed) =>
{
    return {
        type: "UPDATE_HOME_FEED_BY_LATEST",
        payload: updatedHomeFeed
    }
}

const refreshHomeFeed = () => {
    return {
        type: "REFRESH_HOME_FEED",
        payload: []
    }
}

const getCreationSortedPosts = () => {
    return {
        type: "SORT_HOME_FEED_BY_CREATION",
        payload: []
    }
}

export { updateHomeFeed, refreshHomeFeed, getCreationSortedPosts}