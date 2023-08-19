import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import {
    updateUserProfile
} from "../../services/parentServices"
import {
    CgClose,
    BsEmojiSmile
} from "../../assets/react-icons"
import {
    useEditProfileModal
} from "../../context/index"
import {
    updateCurrentProfile,
    updateUserDetails
} from "../../actions/index"
import Picker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react';
import { Image } from "cloudinary-react"
import "./EditProfileModal.css"

const EditProfileModal = () => {
    const { 
        setShowEditProfileModal, 
        editUserProfileDetails , 
        setEditUserProfileDetails
    } = useEditProfileModal()
    
    const {
        userName,
        userBackgroundPic,
        userProfilePic,
        userBio,
        userPortfolioLink
    } = editUserProfileDetails

    const addProfilePicFileInput = useRef(null)
    const addBackgroundPicFileInput = useRef(null)
    
    const [ selectedProfileFileUrl, setSelectedProfileFileUrl ] = useState("")
    const [ selectedBackgroundFileUrl, setSelectedBackgroundFileUrl ] = useState("")
    const [ updatedBioText, setUpdatedBioText ] = useState(userBio)
    const [ updatedPortfolioLink, setUpdatedPortfolioLink ] = useState(userPortfolioLink)

    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)
    
    const dispatch = useDispatch()

    const onEmojiClick = (event, emojiObject) => {
        setUpdatedBioText(prevState => prevState+emojiObject.emoji)
    }

    useEffect(()=>{
        document.body.style.overflow = 'hidden'

        return ()=>{
            document.body.style.overflow = 'visible'
        }
    },[])

    const addNewProfilePicFile = () => {
        addProfilePicFileInput.current.click()
    }

    const uploadProfileImage = async(file) => {
      const formData = new FormData()
      formData.append("file", file) 
      formData.append("upload_preset", "h8cqncs0") 

      let fileUploadedResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dddfc84ni/image/upload",
        formData
      )

      setSelectedProfileFileUrl(fileUploadedResponse.data.url)

    }

    const addNewBackgroundPicFile = () => {
        addBackgroundPicFileInput.current.click()
    }

    const uploadBackgroundImage = async(file) => {
      const formData = new FormData()
      formData.append("file", file) 
      formData.append("upload_preset", "h8cqncs0") 

      let fileUploadedResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dddfc84ni/image/upload",
        formData
      )

      setSelectedBackgroundFileUrl(fileUploadedResponse.data.url)

    }

    const updateUserProfileFn = async () => {

        let updateProfileResponse = await updateUserProfile({
            selectedProfileFileUrl,
            selectedBackgroundFileUrl,
            updatedBioText,
            updatedPortfolioLink
        })

        if(updateProfileResponse.data.status==="ok")
        {
            let responseProfileDetails = updateProfileResponse.data.updatedUserDetails
            dispatch(updateCurrentProfile(responseProfileDetails))
            dispatch(updateUserDetails({
                loggedInUserId: responseProfileDetails._id,
                loggedInUserName: responseProfileDetails.name,
                loggedInUserEmail: responseProfileDetails.email, 
                loggedInUserProfile: responseProfileDetails.profilePicSrc,
                loggedInUserFollowing: responseProfileDetails.following
            }))
            setShowEditProfileModal(false)
        }
    }
    
    return (
        <div className="edit-profile-modal-container">
            
            <div className="edit-profile-modal">
                <div className="edit-profile-modal-header">
                    <h3>Edit Profile</h3>
                    <div 
                        className="close-edit-modal-btn"
                        onClick={()=>setShowEditProfileModal(false)}
                    >
                        <CgClose className="close-edit-modal-btn-icon"/>
                    </div>
                </div>
                <hr></hr>

                <input
                    type="file"
                    className="file-inputs"
                    ref={addProfilePicFileInput}
                    accept="image/jpeg,image/png,image/webp,
                    image/gif"
                    onChange={event=>{
                      const file = event.target.files[0]
                      uploadProfileImage(file)
                    }}
                />

                <div className="edit-user-profilepic-container">
                    <div className="edit-profile-detail-header">
                        <h3>Profile picture</h3>
                        <p 
                            className="profile-edit-text"
                            onClick={addNewProfilePicFile} 
                        >
                            Edit
                        </p>
                    </div>
                    {
                        selectedProfileFileUrl!=="" ?
                        (
                            <Image
                            className="edit-details-profile-pic"
                            cloudName="dddfc84ni"
                            publicId={selectedProfileFileUrl}
                            />
                        ): (
                            <img 
                                className="edit-details-profile-pic" 
                                src={userProfilePic!==""?userProfilePic:"https://api.iconify.design/ph:user-circle-thin.svg"} 
                                alt="user profile"
                            >
                            </img>
                        )
                    }
                </div>

                <input
                    type="file"
                    className="file-inputs"
                    ref={addBackgroundPicFileInput}
                    accept="image/jpeg,image/png,image/webp,
                    image/gif"
                    onChange={event=>{
                      const file = event.target.files[0]
                      uploadBackgroundImage(file)
                    }}
                />

                <div className="edit-user-profilepic-container">
                    <div className="edit-profile-detail-header">
                        <h3>Cover photo</h3>
                        <p 
                            className="profile-edit-text"
                            onClick={addNewBackgroundPicFile} 
                        >
                            Edit
                        </p>
                    </div>
                    {
                        selectedBackgroundFileUrl!=="" ?
                        (
                            <Image
                            className="edit-details-background-pic"
                            cloudName="dddfc84ni"
                            publicId={selectedBackgroundFileUrl}
                            />
                        ): (
                            <img className="edit-details-background-pic" src={userBackgroundPic} alt="user background pic"></img>
                        )
                    }                    
                </div>

                <div className="edit-profile-detail-header bio-header">
                    <h3>Bio</h3>
                </div>
                <div className="updated-profile-bio-container">
                    <textarea  
                        className="updated-bio-content"
                        placeholder="Enter your bio"
                        value={updatedBioText}
                        onChange={(event)=>{
                            setUpdatedBioText(event.target.value)
                        }}
                    >
                    </textarea>
                </div>

                <div className="add-to-profile-options-container">
                    <p>Add emoji to your profile bio</p>
                    <div 
                        className="emoji-container"
                        onClick={()=>setShowEmojiPicker(prevState => !prevState)}
                    >
                        <BsEmojiSmile className="create-new-profile-icons"/>
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

                <div className="edit-user-profilepic-container">
                    <div className="edit-profile-detail-header">
                        <h3>Update Portfolio Link</h3>
                    </div>
                </div>
                <input 
                    type="text"
                    className="portfolio-link-input"
                    placeholder="Portfolio Link"
                    value={updatedPortfolioLink}
                    onChange={(event)=>setUpdatedPortfolioLink(event.target.value)}
                ></input>

                <button 
                    className="solid-success-btn edit-profile-save-btn"
                    onClick={updateUserProfileFn}
                >
                    Save
                </button>
            </div>

        </div>
    )
}

export { EditProfileModal }