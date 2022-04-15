const updateHomeFeed = (updatedHomeFeed) =>
{
    return {
        type: "UPDATE_HOME_FEED",
        payload: updatedHomeFeed
    }
}

export { updateHomeFeed }