const userDetailsReducer = (state = {}, {type,payload}) => {
    switch(type)
    {
        case "UPDATE_USER_DETAILS" : return {...JSON.parse(JSON.stringify(payload))}
        default: return {...state}
    }
}

export { userDetailsReducer }