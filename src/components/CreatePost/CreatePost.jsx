import { useEffect, useState, useRef } from "react"
import axios from "axios"
import {
  createNewPost
} from "../../services/parentServices"
import {
    BiImageAdd,
    AiOutlineFileGif,
    BiPoll,
    BsEmojiSmile,
    IoCalendarOutline,
    BiMap
} from "../../assets/react-icons"
import { useSelector, useDispatch } from "react-redux"
import {
  updateHomeFeed
} from "../../actions/index"
import { 
    useUserLogin,
    useToast
} from "../../context/index"
import Picker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react';
import { Image } from "cloudinary-react"
import "./CreatePost.css"

function CreatePost()
{
    const [ postCharCount, setPostCharCount ] = useState(280)
    const [ newPostTextContent, setNewPostTextContent ] = useState("")
    const { userLoggedIn } = useUserLogin()
    const { showToast } = useToast()
    const userDetails = useSelector(state => state.userDetailsReducer)
    const dispatch = useDispatch()
    const [inputTextareaPlaceholder, setInputTextareaPlaceholder] = useState("")
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)
    const addFileInput = useRef(null)
    const [ selectedFileUrl, setSelectedFileUrl ] = useState("")
    const {
        loggedInUserName,
        loggedInUserProfile
    } = userDetails

    useEffect(()=>{
      if( userDetails.loggedInUserEmail!=="" && userLoggedIn)
      {
        setInputTextareaPlaceholder(`, ${loggedInUserName}`)
      }
      else
      {
        setInputTextareaPlaceholder("")
      }
    },[userDetails])

    useEffect(()=>{
      if(localStorage.getItem("socioztron-user-token")===null)
      {
        setInputTextareaPlaceholder("")
      }
    })

    const uploadImage = async(file) => {
      const formData = new FormData()
      formData.append("file", file) 
      formData.append("upload_preset", "h8cqncs0") 

      let fileUploadedResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dddfc84ni/image/upload",
        formData
      )

      setSelectedFileUrl(fileUploadedResponse.data.url)

    }

    const addNewFile = () => {
      addFileInput.current.click()
    }

    const onEmojiClick = (event, emojiObject) => {
      setNewPostTextContent(prevState => prevState+emojiObject.emoji)
    }

    const createNewPostFn = async () => {
        if(userLoggedIn)
        {   
            if(postCharCount<0||postCharCount===280)
            {
                showToast("error","Post not in character range!")
            }
            else
            {
                //Add this post to feed
                let updatedDataResponse = await createNewPost({ newPostTextContent,selectedFileUrl })

                if(updatedDataResponse.data.status==="ok")
                {
                  dispatch(updateHomeFeed(updatedDataResponse.data.homefeed))
                  setNewPostTextContent("")
                  setSelectedFileUrl("")
                  setPostCharCount(280)
                }
            }
        }
        else
        {
            showToast("warning","Kindly login to post!")
        } 
    }

    return (
        <div className="create-new-post-container">

          <div className="avatar avatar-small">
              {
                userLoggedIn ?
                (
                    <img className="avatar-img" src={loggedInUserProfile} alt="avatar"/>
                ) 
                : (
                    <img className="avatar-img" src="https://api.iconify.design/ph:user-circle-thin.svg" alt="avatar"/>
                )
              }
              <span className="status-badge-2x status-online"></span>
          </div>

          <div className="create-new-post">
            <textarea className='whats-on-your-mind'  
              cols="50" 
              placeholder={`What's on your mind${inputTextareaPlaceholder}?`}
              value={newPostTextContent}
              onChange={event => {
                  setPostCharCount(280-event.target.value.length)
                  setNewPostTextContent(event.target.value)
              }}>
            </textarea>

            {
              selectedFileUrl!=="" &&
              (
                <Image
                  className="new-uploaded-image"
                  cloudName="dddfc84ni"
                  publicId={selectedFileUrl}
                />
              )
            }
            
            <hr></hr>
            <div className="create-post-options-container">
              
              <div className="create-post-options">
                  <input
                    type="file"
                    style={{display:"none"}}
                    ref={addFileInput}
                    accept="image/jpeg,image/png,image/webp,
                    image/gif"
                    onChange={event=>{
                      const file = event.target.files[0]
                      uploadImage(file)
                    }}
                  />
                  <div
                    onClick={addNewFile} 
                    className="create-post-icons-container"
                  >
                    <BiImageAdd className="create-new-post-icons"/>
                  </div>
                  <div 
                    onClick={addNewFile} 
                    className="create-post-icons-container"
                  >
                    <AiOutlineFileGif className="create-new-post-icons"/>
                  </div>
                  <div className="create-post-icons-container">
                    <BiPoll className="create-new-post-icons"/>
                  </div>
                  <div 
                    className="create-post-icons-container"
                    onClick={()=>setShowEmojiPicker(prevState => !prevState)}
                  >
                    <BsEmojiSmile className="create-new-post-icons"/>
                    {
                      showEmojiPicker && 
                      <div
                        className="create-post-emoji-container"
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
                  <div className="create-post-icons-container">
                    <IoCalendarOutline className="create-new-post-icons"/>
                  </div>
                  <div className="create-post-icons-container">
                    <BiMap className="create-new-post-icons"/>
                  </div>
              </div>

              <div className="post-options-right-container">
                {
                  postCharCount<0 ?
                    (<p className="new-post-ch-count rejected-char-count">{postCharCount}</p>)
                  :
                    (<p className="new-post-ch-count accepted-char-count">{postCharCount}</p>)
                }
                {
                  postCharCount<0||postCharCount===280 ?
                    (<button className="create-new-post-disabled-btn" disabled>Post</button>)
                  :
                    (
                        <button 
                            className="solid-success-btn"
                            onClick={()=>createNewPostFn()}
                        >
                            Post
                        </button>)
                }
                
              </div>

            </div>
          </div>

        </div>
    )
}

export { CreatePost }