import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode"
import {
    AiFillLike,
    AiOutlineLike,
    BiComment,
    RiShareForwardLine
} from "../../assets/react-icons"
import {
    useUserLogin,
    useToast
} from "../../context/index"
import {
    updateHomeFeed,
    updateAllUserLikedPosts
} from "../../actions/index"
import './UserPost.css'

function UserPost({userPostDetails})
{
    const allUserLikedPosts = useSelector(state => state.allLikedPostsReducer)
    const { userLoggedIn } = useUserLogin()
    const { showToast } = useToast()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const {
        _id,
        contentText,
        userName,
        userProfilePic,
        noOfLikes
    } = userPostDetails;

    const [ postUserProfile, setPostUserProfile] = useState("https://enztron-dev-branch.netlify.app/Icons-and-Images/Avatars/blue-illustration-avatar.svg")
    const [ showFullText, setShowFullText ] = useState(false)
    const [ postLikeStatus, setPostLikeStatus ] = useState(false)

    useEffect(()=>{
        if(userProfilePic!=="")
        {
            setPostUserProfile(userProfilePic)
        }

        if(userLoggedIn && !postLikeStatus)
        {
            let likedPostId = allUserLikedPosts.find(postId => postId==_id )
            if(likedPostId!=undefined)
            {
                setPostLikeStatus(true)
            } 
        }  
        
        if(!userLoggedIn && postLikeStatus)
        {
            setPostLikeStatus(false)
        }
    },[allUserLikedPosts,userLoggedIn])


    let postText1 = "", postText2 = "";
    
    let postTextArray = contentText.split(" ")

    if(postTextArray.length<45)
    {
        postText1 = contentText;
    }
    else
    {
        postText1 = postTextArray.slice(0,46).join(" ")
        postText2 = postTextArray.slice(46).join(" ")
    }

    const handleOptionsHandler = async (callbackPostOptionsFunction) => {
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

    const handlePostLikeStatus = async () => {
        setPostLikeStatus(prevState => !prevState)
        let updatedUserAndPostDetails = await axios.patch(
            `https://socioztron.herokuapp.com/api/userpost/updatelikes/${userPostDetails._id}`,
            {},
            {
                headers: {'x-access-token': localStorage.getItem("socioztron-user-token")}
            }
        )
        
        if(updatedUserAndPostDetails.data.status==="ok")
        {
            dispatch(updateHomeFeed(updatedUserAndPostDetails.data.homefeed))
            dispatch(updateAllUserLikedPosts(updatedUserAndPostDetails.data.user.likedPosts))
        }
    }

    return (
        <div className='user-post'>
            <div className="user-post-header">
                <div className="post-header-left-container">
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
                <button className="icon-btn">
                    <i className="fa fa-ellipsis-h fa-x" aria-hidden="true"></i>
                </button>
            </div>
            <hr></hr>
            <p className="post-caption">
                {postText1} &nbsp;
                {
                    (postTextArray.length>=45&&!showFullText) &&
                    <span 
                        onClick={()=>setShowFullText(true)}
                        className="post-see-more-text"
                    >
                        <b>... See More</b>
                    </span>
                }
                {
                    showFullText && 
                    <span>{postText2}</span>
                }
            </p>
            {/* <div className="post-img-container">
                <img className="post-img" src="https://enztron-temp-deployed-branch.netlify.app/Icons-and-Images/List-Images/clifford-VobvKmG-StA-unsplash.jpg" alt="postImage"/>
            </div> */}
            <div className="post-stats">
                <div className="post-stats-left-container">
                    <div className="user-post-icon-container">
                        <AiFillLike className="user-post-reaction-icons"/>
                    </div>
                    <p className="number-of-likes">{noOfLikes}</p>
                </div>
                <div className="post-stats-right-container">
                    <p>73 comments</p>
                    <p>80 shares</p>
                </div>
            </div>
            <hr></hr>
            <div className="post-options">
                {
                    postLikeStatus 
                    ? (
                        <button 
                            className="outline-secondary-btn post-options-bottom-buttons post-liked"
                            onClick={() => handleOptionsHandler(handlePostLikeStatus)}
                        >
                            <AiFillLike className="post-options-button-icons"/>
                            Liked
                        </button>
                    ) : (
                        <button 
                            className="outline-secondary-btn post-options-bottom-buttons"
                            onClick={() => handleOptionsHandler(handlePostLikeStatus)}
                        >
                            <AiOutlineLike className="post-options-button-icons"/>
                            Like
                        </button>
                    )
                }
                <button className="outline-secondary-btn post-options-bottom-buttons">
                    <BiComment className="post-options-button-icons"/>
                    Comment
                </button>
                <button className="outline-secondary-btn post-options-bottom-buttons">
                    <RiShareForwardLine className="post-options-button-icons"/>
                    Share
                </button>
            </div>
        </div>
    )
}

export { UserPost }