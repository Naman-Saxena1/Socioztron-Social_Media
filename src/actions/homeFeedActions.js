const updateHomeFeed = (updatedHomeFeed) =>
{
    return {
        type: "UPDATE_HOME_FEED_BY_LATEST",
        payload: updatedHomeFeed
    }
}

export { updateHomeFeed }