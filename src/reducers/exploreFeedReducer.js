const exploreFeedReducer = (state = [], { type, payload}) => {
    switch(type)
    {
        case "UPDATE_EXPLORE_FEED" :  return [...payload]
        default : return [...state]
    }
}

export { exploreFeedReducer }