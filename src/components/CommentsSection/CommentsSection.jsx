import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import jwt_decode from "jwt-decode"
import {
    addCommentToPost
} from "../../services/parentServices"
import {
    useToast
} from "../../context/index"
import {
    updateHomeFeed
} from "../../actions/index"
import {
    Comment
} from "../index"
import {
    AiOutlineSend,
    BsEmojiSmile
} from "../../assets/react-icons"
import Picker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react';
import "./CommentsSection.css"

const CommentsSection = ({ userPostDetails }) => {
    const {
        _id,
        allComments
    } = userPostDetails
    const { showToast } = useToast()
    const userDetails = useSelector(state => state.userDetailsReducer)
    const {
        loggedInUserProfile
    } = userDetails

    const [ newCommentTextContent, setNewCommentTextContent ] = useState("")
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)
    const addCommentTextArea = useRef(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onEmojiClick = (event, emojiObject) => {
        setNewCommentTextContent(prevState => prevState+emojiObject.emoji)
    }

    const addCommentToPostFn = async() => {
        let newCommentText = newCommentTextContent
        setNewCommentTextContent("")
        addCommentTextArea.current.style.height = "35px";

        let param = {
            postId: _id,
            newCommentText: newCommentText
        }
        let updatedHomeFeedResponse = await addCommentToPost(param)

        if(updatedHomeFeedResponse.data.status==="ok")
        {
            dispatch(updateHomeFeed(updatedHomeFeedResponse.data.homefeed))
        }
    }

    const userLoginCheckHandler = async (callbackPostOptionsFunction) => {
        const token=localStorage.getItem("socioztron-user-token")

        if(token)
        {
            const user = jwt_decode(token)
                
            if(!user)
            {
                localStorage.removeItem('socioztron-user-token')
                showToast("warning","Kindly Login")
                navigate('/login')
            }
            else
            {
                callbackPostOptionsFunction()
            }
        }
        else
        {
            showToast("warning","Kindly Login")
        }
    }

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
                <div className="create-comment-input-and-send">
                    <textarea 
                        className="create-new-comment-input"
                        placeholder="Write a comment..."
                        value={newCommentTextContent}
                        onChange={event=>{
                            addCommentTextArea.current.style.height = "30px";
                            addCommentTextArea.current.style.height = `${event.target.scrollHeight}px`;
                            setNewCommentTextContent(event.target.value)
                        }}
                        data-gramm="false"
                        data-gramm_editor="false"
                        data-enable-grammarly="false"
                        rows={1} 
                        ref={addCommentTextArea}
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
                            onClick={()=>userLoginCheckHandler(addCommentToPostFn)}
                        >
                            <div>
                                <span>Send</span>
                                <AiOutlineSend/>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            {
                allComments.length!==0 && (
                    [...allComments].reverse().map(commentDetails => {
                        return (
                            <Comment 
                                key={commentDetails._id} 
                                postId={_id}
                                commentDetails={commentDetails}
                                userLoginCheckHandler={userLoginCheckHandler}
                            />
                        )
                    })
                )
            }     
        </div>
    )
}

export { CommentsSection }