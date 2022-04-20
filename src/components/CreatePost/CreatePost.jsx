import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import axios from "axios"
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
  updateHomeFeed,
  updateUserDetails
} from "../../actions/index"
import { 
    useUserLogin,
    useToast
} from "../../context/index"
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
    const [loggedInUserProfilePic, setLoggedInUserProfilePic] = useState("https://enztron-dev-branch.netlify.app/Icons-and-Images/Avatars/blue-illustration-avatar.svg")

    useEffect(()=>{
      let socioztronUserAuthToken = localStorage.getItem("socioztron-user-token")
      if(socioztronUserAuthToken && JSON.stringify(userDetails)===JSON.stringify({}))
      {
        let loggedInUserDetails = jwt_decode(socioztronUserAuthToken)
        dispatch(updateUserDetails({
          loggedInUserName: loggedInUserDetails.name, 
          loggedInUserEmail: loggedInUserDetails.email, 
          loggedInUserProfile: loggedInUserDetails.userProfilePic
        }))
      }

      if( JSON.stringify(userDetails)!==JSON.stringify({}) && userLoggedIn)
      {
        const {
            loggedInUserName,
            loggedInUserProfile
        } = userDetails
  
        if(loggedInUserProfile==="")
        {
          setLoggedInUserProfilePic("https://enztron-dev-branch.netlify.app/Icons-and-Images/Avatars/blue-illustration-avatar.svg")
        }
        else
        {
          setLoggedInUserProfilePic(loggedInUserProfile)
        }
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

    const createNewPost = async () => {
        if(userLoggedIn)
        {   
            if(postCharCount<0||postCharCount===280)
            {
                showToast("error","Post not in character range!")
            }
            else
            {
                //Add this post to feed
                let updatedDataResponse = await axios.post(
                    "https://socioztron.herokuapp.com/api/userpost",
                    {
                      newPostTextContent
                    },
                    {
                      headers: {'x-access-token':localStorage.getItem("socioztron-user-token")}
                    }
                )

                if(updatedDataResponse.data.status==="ok")
                {
                  dispatch(updateHomeFeed(updatedDataResponse.data.homefeed))
                  setNewPostTextContent("")
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
                    <img className="avatar-img" src={loggedInUserProfilePic} alt="avatar"/>
                ) 
                : (
                    <img className="avatar-img" src="https://enztron-dev-branch.netlify.app/Icons-and-Images/Avatars/blue-illustration-avatar.svg" alt="avatar"/>
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

            <hr></hr>
            <div className="create-post-options-container">
              
              <div className="create-post-options">
                  <div className="create-post-icons-container">
                    <BiImageAdd className="create-new-post-icons"/>
                  </div>
                  <div className="create-post-icons-container">
                    <AiOutlineFileGif className="create-new-post-icons"/>
                  </div>
                  <div className="create-post-icons-container">
                    <BiPoll className="create-new-post-icons"/>
                  </div>
                  <div className="create-post-icons-container">
                    <BsEmojiSmile className="create-new-post-icons"/>
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
                            onClick={()=>createNewPost()}
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