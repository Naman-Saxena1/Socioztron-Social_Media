const homeFeedReducer = (state = [], { type, payload}) => {
    switch(type)
    {
        case "UPDATE_HOME_FEED" :  return [...payload]
        default : return [...state]
    }
}

export { homeFeedReducer }