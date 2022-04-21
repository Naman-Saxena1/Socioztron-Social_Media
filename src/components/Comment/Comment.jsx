import "./Comment.css"

const Comment = ({commentDetails}) => {
    const {
        _id,
        commentUserProfilePic,
        commentUserName,
        commentContent
    } = commentDetails

    return (
        <div key={_id} className="single-comment-container">
            <div className="avatar avatar-x-small">
                <img 
                    className="avatar-img" 
                    src={commentUserProfilePic} 
                    alt="avatar"
                />
            </div>
            <div className="right-comment-container">
                <div className="comment-container">
                    <p className="comment-username">{commentUserName}</p>
                    <p className="comment">
                        {commentContent}
                    </p>   
                </div>   
                <ul className="comment-options">
                    <li>Reply</li>
                </ul>
            </div>  
        </div>
    )
}

export { Comment }