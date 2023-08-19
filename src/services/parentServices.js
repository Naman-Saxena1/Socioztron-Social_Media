import apiService from "./axiosService";

export const addReplyToPostComment = param => {
    return apiService()
    .patch(`/api/userpost/create-new-reply/${param.postId}/${param.commentId}`,{newReplyText: param.newReplyText})
    .then(response => {
        return response
    })
}

export const addCommentToPost = param => {
    return apiService()
    .patch(`/api/userpost/create-new-comment/${param.postId}`,{newCommentText: param.newCommentText})
    .then(response => {
        return response
    })
}

export const fetchUserFollowers = loggedInUserEmail => {
    return apiService()
    .get(`/api/user/followers/${loggedInUserEmail}`)
    .then(response => {
        return response
    })
}

export const createNewChat = param => {
    return apiService()
    .post('/api/chat',{newChatUsers: param.newChatUsers})
    .then(response => {
        return response
    })
}

export const createNewPost = param => {
    return apiService()
    .post('/api/userpost',param)
    .then(response => {
        return response
    })
}

export const updateUserPost = param => {
    return apiService()
    .patch(`/api/userpost/edit/${param.postId}`,param)
    .then(response => {
        return response
    })
}

export const updateUserProfile = param => {
    return apiService()
    .patch(`/api/user/edit`,param)
    .then(response => {
        return response
    })
}

export const fetchUpdatedPosts = param => {
    return apiService()
    .patch(`/api/userpost/updatelikes/${param.postId}`)
    .then(response => {
        return response
    })
}

export const deletePost = postId => {
    return apiService()
    .delete(`/api/userpost/delete/${postId}`)
    .then(response => {
        return response
    })
}

export const bookmarkPost = postId => {
    return apiService()
    .patch(`/api/userpost/bookmark/${postId}`)
    .then(response => {
        return response
    })
}

export const loginUser = param => {
    return apiService()
    .post('/api/login',param)
    .then(response => {
        return response
    })
}

export const signupUser = param => {
    return apiService()
    .post('/api/signup',param)
    .then(response => {
        return response
    })
}

export const fetchUserChatList = loggedInUserEmail => {
    return apiService()
    .get(`/api/chat/user/${loggedInUserEmail}`)
    .then(response => {
        return response
    })
}

export const fetchChatDetails = param => {
    return apiService()
    .get(`/api/chat/messages?chatid=${param.chatId}&userid=${param.userId}`)
    .then(response => {
        return response
    })
}

export const sendMessage = param => {
    return apiService()
    .post('/api/chat/messages',param)
    .then(response => {
        return response
    })
}

export const fetchUpdatedHomeFeed = () => {
    return apiService()
    .get(`/api/userpost`)
    .then(response => {
        return response
    })
}

export const fetchUserLikedPosts = () => {
    return apiService()
    .get(`/api/userpost/likedposts`)
    .then(response => {
        return response
    })
}

export const fetchUserDetails = loggedInUserEmail => {
    return apiService()
    .get(`/api/user/${loggedInUserEmail}`)
    .then(response => {
        return response
    })
}

export const updateUserFollowing = param => {
    return apiService()
    .patch(`/api/user/following`,param)
    .then(response => {
        return response
    })
}