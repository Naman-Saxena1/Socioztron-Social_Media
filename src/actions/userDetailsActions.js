const updateUserDetails = (updatedUserDetails) => {
    return {
        type: "UPDATE_USER_DETAILS",
        payload: updatedUserDetails
    }
}

export { updateUserDetails }