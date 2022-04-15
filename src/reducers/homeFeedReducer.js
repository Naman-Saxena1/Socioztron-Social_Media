const homeFeedReducer = (state = [], { type, payload}) => {
    switch(type)
    {
        case "UPDATE_HOME_FEED" :  return [...(payload.reverse()) ]
        default : return [...state]
    }
}

export { homeFeedReducer }