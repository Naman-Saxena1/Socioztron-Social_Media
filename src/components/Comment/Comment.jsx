import { useState, useRef } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import {
    updateHomeFeed
} from "../../actions/index"
import {
    addReplyToPostComment
} from "../../services/parentServices"
import {
    AiOutlineSend,
    BsEmojiSmile
} from "../../assets/react-icons"
import Picker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react';
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

    const [newReplyTextContent, setNewReplyTextContent ] = useState("")
    const addReplyTextArea = useRef(null)
    const [ showCreateReply, setShowCreateReply ] = useState(false)
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)

    const dispatch = useDispatch()

    const addReplyToComment = async () => {
        let newReplyText = newReplyTextContent
        setNewReplyTextContent("")
        addReplyTextArea.current.style.height = "35px";
        
        let param = {
            commentId: _id,
            postId: postId,
            newReplyText: newReplyText
        }
        let updatedHomeFeedResponse = await addReplyToPostComment(param)

        if(updatedHomeFeedResponse.data.status==="ok")
        {
            dispatch(updateHomeFeed(updatedHomeFeedResponse.data.homefeed))
        }
    }

    const onEmojiClick = (event, emojiObject) => {
        setNewReplyTextContent(prevState => prevState+emojiObject.emoji)
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
                                        src={replyDetails.replyUserProfilePic!==""?replyDetails.replyUserProfilePic:"https://api.iconify.design/ph:user-circle-thin.svg"} 
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
                        <div className="create-comment-input-and-send">
                            <textarea 
                                className="create-new-reply-input"
                                placeholder={`Reply to ${commentUserName}...`}
                                value={newReplyTextContent}
                                onChange={event=>{
                                    addReplyTextArea.current.style.height = "30px";
                                    addReplyTextArea.current.style.height = `${event.target.scrollHeight}px`;
                                    setNewReplyTextContent(event.target.value)
                                }}
                                data-gramm="false"
                                data-gramm_editor="false"
                                data-enable-grammarly="false"
                                rows={1} 
                                ref={addReplyTextArea}
                            ></textarea>
                            
                            <div 
                                className="create-comment-options"
                            >
                                <div 
                                    className="emoji-container"
                                    onClick={()=>setShowEmojiPicker(prevState => !prevState)}
                                >
                                    <BsEmojiSmile className="create-new-post-icons"/>
                                    {
                                        showEmojiPicker && 
                                        <div
                                            className="emoji-picker-container"
                                            onClick={event=>{
                                            event.stopPropagation()
                                            }}
                                        >
                                            <Picker 
                                            className="emoji-picker" 
                                            onEmojiClick={onEmojiClick} 
                                            skinTone={SKIN_TONE_NEUTRAL} 
                                            />
                                        </div>
                                    }
                                </div>
                                <button 
                                    className="icon-btn send-reply-btn"
                                    onClick={()=>userLoginCheckHandler(addReplyToComment)}
                                >
                                    <div>
                                        <span>Send</span>
                                        <AiOutlineSend/>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export { Comment }