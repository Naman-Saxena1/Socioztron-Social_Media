import { useState, useRef } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import axios from "axios"
import {
    updateHomeFeed
} from "../../actions/index"
import "./Comment.css"

const Comment = ({postId, commentDetails, userLoginCheckHandler}) => {
    const {
        _id,
        commentUserProfilePic,
        commentUserName,
        commentContent,
        allRepliesOnComment
    } = commentDetails
    const userDetails = useSelector(state => state.userDetailsReducer)
    const {
        loggedInUserProfile
    } = userDetails

    const [newReplyText, setNewReplyText ] = useState("")
    const addReplyTextArea = useRef(null)
    const [ showCreateReply, setShowCreateReply ] = useState(false)

    const dispatch = useDispatch()

    const addReplyToComment = async () => {
        let updatedHomeFeedResponse = await axios.patch(
            `http://localhost:1337/api/userpost/create-new-reply/${postId}/${_id}`,
            {
                newReplyText
            },
            {
                headers: {'x-access-token':localStorage.getItem("socioztron-user-token")}
            }
        )

        if(updatedHomeFeedResponse.data.status==="ok")
        {
            setNewReplyText("")
            addReplyTextArea.current.style.height = "35px";
            dispatch(updateHomeFeed(updatedHomeFeedResponse.data.homefeed))
        }
    }

    return (
        <div className="single-comment-and-replies-container">
            <div className="single-comment-container">
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
                        <li
                            onClick={()=>setShowCreateReply(prevState => !prevState)}
                        >
                            Reply
                        </li>
                    </ul>
                </div>  
            </div>

            <div className="replies-container">
                {
                    allRepliesOnComment.length!==0 && (
                        allRepliesOnComment.map(replyDetails => (
                            <div key={replyDetails._id} className="single-reply-container">
                                <div className="avatar avatar-x-small">
                                    <img 
                                        className="avatar-img" 
                                        src={replyDetails.replyUserProfilePic} 
                                        alt="avatar"
                                    />
                                </div>
                                <div className="right-reply-container">
                                    <div className="reply-container">
                                        <p className="reply-username">{replyDetails.replyUserName}</p>
                                        <p className="reply">
                                            {replyDetails.replyContent}
                                        </p>   
                                    </div> 
                                </div>  
                            </div>
                        ))
                    )
                }  
            </div>

            {
                showCreateReply && (
                    <div className="create-new-reply-container">
                        <div className="avatar avatar-x-small">
                            <img 
                                className="avatar-img" 
                                src={loggedInUserProfile} 
                                alt="avatar"
                            />
                            <span className="status-badge-x status-online"></span>
                        </div>
                        <textarea 
                            className="create-new-reply-input"
                            placeholder={`Reply to ${commentUserName}...`}
                            value={newReplyText}
                            onChange={event=>{
                                addReplyTextArea.current.style.height = "30px";
                                addReplyTextArea.current.style.height = `${event.target.scrollHeight}px`;
                                setNewReplyText(event.target.value)
                            }}
                            data-gramm="false"
                            data-gramm_editor="false"
                            data-enable-grammarly="false"
                            onKeyDown={event => event.key==="Enter"?userLoginCheckHandler(addReplyToComment):""}
                            rows={1} 
                            ref={addReplyTextArea}
                        ></textarea>
                    </div>
                )
            }
        </div>
    )
}

export { Comment }