const homeFeedReducer = (state = [], { type, payload}) => {
    switch(type)
    {
        case "UPDATE_HOME_FEED_BY_LATEST" :  return [...(payload.reverse())]
        case "REFRESH_HOME_FEED"          :  return [...state] 
        case "SORT_HOME_FEED_BY_CREATION"   :  return [...state].reverse()
        default : return [...state]
    }
}

export { homeFeedReducer }