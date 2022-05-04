const updateUserDetails = (updatedUserDetails) => {
    return {
        type: "UPDATE_USER_DETAILS",
        payload: updatedUserDetails
    }
}

const updateUserFollowingList = (updatedUserFollowing) => {
    return {
        type: "UPDATE_USER_FOLLOWING_LIST",
        payload: updatedUserFollowing
    }
}

export { updateUserDetails, updateUserFollowingList }