const homeFeedReducer = (state = [], { type, payload}) => {
    switch(type)
    {
        case "UPDATE_HOME_FEED_BY_LATEST" :  return [...(payload.reverse())]
        default : return [...state]
    }
}

export { homeFeedReducer }