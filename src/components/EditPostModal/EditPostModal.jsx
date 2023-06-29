import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import {
    updateUserPost
} from "../../services/parentServices"
import {
    CgClose,
    BsEmojiSmile
} from "../../assets/react-icons"
import {
    useEditPostModal
} from "../../context/index"
import {
    updateHomeFeed
} from "../../actions/index"
import Picker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react';
import "./EditPostModal.css"

const EditPostModal = () => {
    const [ postUserProfile, setPostUserProfile] = useState("https://api.iconify.design/ph:user-circle-thin.svg")
    const { 
        showEditPostModal, 
        setShowEditModal, 
        editPostDetails : {
            _id,
            contentText,
            userName,
            userProfilePic,
            noOfLikes
        }, 
        setEditPostDetails
    } = useEditPostModal()

    const [ updatedPostText, setUpdatedPostText ] = useState(contentText)
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)
    const dispatch = useDispatch()

    const onEmojiClick = (event, emojiObject) => {
        setUpdatedPostText(prevState => prevState+emojiObject.emoji)
    }

    useEffect(()=>{
        if(userProfilePic!=="")
        {
            setPostUserProfile(userProfilePic)
        }

        document.body.style.overflow = 'hidden'

        return ()=>{
            document.body.style.overflow = 'visible'
        }
    },[])

    const updateUserPostFn = async () => {

        let updatePostResponse = await updateUserPost({postId: _id,updatedPostText: updatedPostText})

        if(updatePostResponse.data.status==="ok")
        {
            setShowEditModal(false)
            dispatch(updateHomeFeed(updatePostResponse.data.homefeed))
        }
    }
    
    return (
        <div className="edit-post-modal-container">
            
            <div className="edit-post-modal">
                <div className="edit-post-modal-header">
                    <h3>Edit Post</h3>
                    <div 
                        className="close-edit-modal-btn"
                        onClick={()=>setShowEditModal(false)}
                    >
                        <CgClose className="close-edit-modal-btn-icon"/>
                    </div>
                </div>
                <hr></hr>

                <div className="edit-post-header-container">
                    <div className="avatar avatar-x-small">
                        <img 
                            className="avatar-img" 
                            src={postUserProfile} 
                            alt="avatar"
                        />
                        <span className="status-badge-x status-online"></span>
                    </div>
                    <h3>{userName}</h3>
                </div>

                <div className="updated-post-content-container">
                    <textarea  
                        className="updated-text-content"
                        value={updatedPostText}
                        onChange={(event)=>{
                            setUpdatedPostText(event.target.value)
                        }}
                    >
                    </textarea>
                </div>

                <div className="add-to-post-options-container">
                    <p>Add to your post</p>
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
                </div>

                <button 
                    className="solid-success-btn edit-post-save-btn"
                    onClick={updateUserPostFn}
                >
                    Save
                </button>
            </div>

        </div>
    )
}

export { EditPostModal }