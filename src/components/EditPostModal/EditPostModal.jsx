import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import {
    CgClose
} from "../../assets/react-icons"
import {
    useEditModal
} from "../../context/index"
import {
    updateHomeFeed
} from "../../actions/index"
import "./EditPostModal.css"

const EditPostModal = () => {
    const [ postUserProfile, setPostUserProfile] = useState("https://enztron-dev-branch.netlify.app/Icons-and-Images/Avatars/blue-illustration-avatar.svg")
    const { 
        showEditModal, 
        setShowEditModal, 
        editPostDetails : {
            _id,
            contentText,
            userName,
            userProfilePic,
            noOfLikes
        }, 
        setEditPostDetails
    } = useEditModal()

    const [updatedPostText, setUpdatedPostText ] = useState(contentText)
    const dispatch = useDispatch()

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

    const updateUserPost = async () => {

        let updatePostResponse = await axios.patch(
            `https://socioztron.herokuapp.com/api/userpost/edit/${_id}`,
            {
                updatedPostText
            },
            {
                headers: {'x-access-token':localStorage.getItem("socioztron-user-token")}
            }
        )

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

                <button 
                    className="solid-success-btn edit-post-save-btn"
                    onClick={updateUserPost}
                >
                    Save
                </button>
            </div>

        </div>
    )
}

export { EditPostModal }