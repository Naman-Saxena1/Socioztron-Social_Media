const homeFeedReducer = (state = [], { type, payload}) => {
    switch(type)
    {
        case "UPDATE_HOME_FEED_BY_LATEST" :  return [...(payload.reverse())]
        case "REFRESH_HOME_FEED"          :  return [...state]
        default : return [...state]
    }
}

export { homeFeedReducer }