const updateCurrentProfile = (updatedProfileDetails) => {
    return {
        type: "UPDATE_CURRENT_PROFILE_PAGE_DETAILS",
        payload: updatedProfileDetails
    }
}

export { updateCurrentProfile }