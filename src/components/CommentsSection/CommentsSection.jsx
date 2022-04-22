import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import jwt_decode from "jwt-decode"
import {
    useToast
} from "../../context/index"
import {
    updateHomeFeed
} from "../../actions/index"
import {
    Comment
} from "../index"
import "./CommentsSection.css"
import axios from "axios"

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

    const [newCommentText, setNewCommentText ] = useState("")
    const addCommentTextArea = useRef(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const addCommentToPost = async() => {

        let updatedHomeFeedResponse = await axios.patch(
            `https://socioztron.herokuapp.com/api/userpost/create-new-comment/${_id}`,
            {
                newCommentText
            },
            {
                headers: {'x-access-token':localStorage.getItem("socioztron-user-token")}
            }
        )

        if(updatedHomeFeedResponse.data.status==="ok")
        {
            setNewCommentText("")
            addCommentTextArea.current.style.height = "35px";
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
                <textarea 
                    className="create-new-comment-input"
                    placeholder="Write a comment..."
                    value={newCommentText}
                    onChange={event=>{
                        addCommentTextArea.current.style.height = "30px";
                        addCommentTextArea.current.style.height = `${event.target.scrollHeight}px`;
                        setNewCommentText(event.target.value)
                    }}
                    data-gramm="false"
                    data-gramm_editor="false"
                    data-enable-grammarly="false"
                    onKeyDown={event => event.key==="Enter"?userLoginCheckHandler(addCommentToPost):""}
                    rows={1} 
                    ref={addCommentTextArea}
                ></textarea>
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