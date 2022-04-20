import { useState } from "react"
import { useSelector } from "react-redux"
import "./CommentsSection.css"

const CommentsSection = () => {
    const userDetails = useSelector(state => state.userDetailsReducer)
    const {
        loggedInUserName,
        loggedInUserProfile
    } = userDetails

    const [newCommentText, setNewCommentText ] = useState("")

    return (
        <div className="user-post-all-comments-container">
            <div className="create-new-comment-container">
                <div className="avatar avatar-x-small">
                    <img 
                        className="avatar-img" 
                        src={loggedInUserProfile} 
                        alt="avatar"
                    />
                    <span className="status-badge-x status-online"></span>
                </div>
                <input 
                    className="create-new-comment-input"
                    placeholder="Write a comment..."
                    value={newCommentText}
                    onChange={event=>setNewCommentText(event.target.value)}
                />
            </div>
        </div>
    )
}

export { CommentsSection }