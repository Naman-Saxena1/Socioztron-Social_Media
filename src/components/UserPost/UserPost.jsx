import {
    fetchUpdatedPosts,
    deletePost,
    bookmarkPost
} from "../../services/parentServices";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode"
import {
    AiFillLike,
    AiOutlineLike,
    BiComment,
    RiShareForwardLine,
    HiOutlinePencilAlt,
    HiOutlineTrash,
    BsBookmark,
    BsBookmarkFill
} from "../../assets/react-icons"
import {
    useUserLogin,
    useToast,
    useEditPostModal
} from "../../context/index"
import {
    updateHomeFeed,
    updateAllUserLikedPosts,
    updateUserBookmarks
} from "../../actions/index"
import {
    CommentsSection
} from "../index"
import './UserPost.css'

function UserPost({userPostDetails})
{
    const allUserLikedPosts = useSelector(state => state.allLikedPostsReducer)
    const loggedInUserDetails = useSelector(state => state.userDetailsReducer)
    const loggedInUserBookmarks = useSelector(state => state.userBookmarksReducer)
    const { userLoggedIn } = useUserLogin()
    const { showToast } = useToast()
    const { setShowEditModal, setEditPostDetails} = useEditPostModal()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const {
        _id,
        contentText,
        imgSrc,
        userName,
        userEmail,
        userProfilePic,
        noOfLikes
    } = userPostDetails;

    const [ postUserProfile, setPostUserProfile] = useState("https://api.iconify.design/ph:user-circle-thin.svg")
    const [ showFullText, setShowFullText ] = useState(false)
    const [ postLikeStatus, setPostLikeStatus ] = useState(false)
    const [ showPostComments, setShowPostComments ] = useState(false)
    const [ showPostMoreOptions, setShowPostMoreOptions ] = useState(false)

    const [ allowPostOwnerOptions, setAllowPostOwnerOptions ] = useState(false)

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

    useEffect(()=>{
        if(userPostDetails.userEmail===loggedInUserDetails.loggedInUserEmail)
        {
            setAllowPostOwnerOptions(true)
        }
    },[userLoggedIn])

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

    const handlePostLikeStatus = async () => {
        setPostLikeStatus(prevState => !prevState)
        let updatedUserAndPostDetails = await fetchUpdatedPosts({postId: userPostDetails._id})
        
        if(updatedUserAndPostDetails.data.status==="ok")
        {
            dispatch(updateHomeFeed(updatedUserAndPostDetails.data.homefeed))
            dispatch(updateAllUserLikedPosts(updatedUserAndPostDetails.data.user.likedPosts))
        }
    }

    const deleteUserPost = async() => {
        let deletePostResponse = await deletePost(_id)

        if(deletePostResponse.data.status==="ok")
        {
            dispatch(updateHomeFeed(deletePostResponse.data.homefeed))
        }
    }

    const bookmarkUserPostHandler = async() => {
        let bookmarkPostResponse = await bookmarkPost(_id)

        if(bookmarkPostResponse.data.status==="ok")
        {
            dispatch(updateUserBookmarks(bookmarkPostResponse.data.updatedUserInfo.bookmarks))
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
                    <Link 
                        to={`/profile/${userName}`} 
                        state={{
                            profileUserName: userName,
                            profileUserEmail:userEmail,
                            profileUserProfile: userProfilePic
                        }}
                    >
                        <h3>{userName}</h3>
                    </Link>
                </div>
                <button 
                    className="icon-btn userpost-more-options-btn"
                    onClick={()=>setShowPostMoreOptions(prevState=> !prevState)}
                >
                    <i className="fa fa-ellipsis-h fa-x" aria-hidden="true"></i>
                </button>
            </div>
            {
                showPostMoreOptions && (
                    <div className="post-more-options-container">
                        <div 
                            className="post-more-options"
                            onClick={()=>{
                                userLoginCheckHandler(()=>{
                                    bookmarkUserPostHandler()    
                                })         
                            }}
                        >
                            {
                                loggedInUserBookmarks.includes(_id) 
                                ? (
                                    <>
                                        <BsBookmarkFill className="post-more-options-icons"/>
                                        <p>
                                            Remove Bookmark
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <BsBookmark className="post-more-options-icons"/>
                                        <p>
                                            Bookmark
                                        </p>
                                    </>
                                )
                            }
                        </div>
                        {
                            allowPostOwnerOptions && (
                                <div 
                                    className="post-more-options"
                                    onClick={()=>{
                                        userLoginCheckHandler(()=>{
                                            setShowPostMoreOptions(false);
                                            setEditPostDetails(userPostDetails)
                                            setShowEditModal(true);      
                                        })         
                                    }}
                                >
                                    <HiOutlinePencilAlt className="post-more-options-icons"/>
                                    <p>Edit Post</p>
                                </div>
                            )
                        }
                        {
                            allowPostOwnerOptions && (
                                <div 
                                    className="post-more-options"
                                    onClick={()=>{
                                        userLoginCheckHandler(()=>{
                                                setShowPostMoreOptions(false);
                                                deleteUserPost()
                                        })         
                                    }}
                                >
                                    <HiOutlineTrash className="post-more-options-icons"/>
                                    <p>Delete Post</p>
                                </div>
                            )
                        }
                    </div>
                )
            }
            <hr></hr>
            <p className="post-caption">
                {postText1}
                {
                    (postTextArray.length>=45&&!showFullText) &&
                    <span 
                        onClick={()=>setShowFullText(true)}
                        className="post-see-more-text"
                    >
                        <b>&nbsp;... See More</b>
                    </span>
                }
                {
                    showFullText && 
                    <span>&nbsp;{postText2}</span>
                }
            </p>
            {
                imgSrc!=="" && (   
                    <div className="post-img-container">
                        <img className="post-img" src={imgSrc} alt="postImage"/>
                    </div>
                )
            }
            <div className="post-stats">
                <div className="post-stats-left-container">
                    <div className="user-post-icon-container">
                        <AiFillLike className="user-post-reaction-icons"/>
                    </div>
                    <p className="number-of-likes">{noOfLikes}</p>
                </div>
                <div className="post-stats-right-container">
                    <p>
                        {
                            userPostDetails.allComments.length 
                            + userPostDetails.allComments.reduce((acc, currentComment)=>{
                                return  acc+currentComment.allRepliesOnComment.length
                            },0)
                        } 
                        &nbsp;comments
                    </p>
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
                            onClick={() => userLoginCheckHandler(handlePostLikeStatus)}
                        >
                            <AiFillLike className="post-options-button-icons"/>
                            Liked
                        </button>
                    ) : (
                        <button 
                            className="outline-secondary-btn post-options-bottom-buttons"
                            onClick={() => userLoginCheckHandler(handlePostLikeStatus)}
                        >
                            <AiOutlineLike className="post-options-button-icons"/>
                            Like
                        </button>
                    )
                }
                <button 
                    className="outline-secondary-btn post-options-bottom-buttons"
                    onClick={()=> setShowPostComments(prevState=> !prevState)}
                >
                    <BiComment className="post-options-button-icons"/>
                    Comment
                </button>
                <button className="outline-secondary-btn post-options-bottom-buttons">
                    <RiShareForwardLine className="post-options-button-icons"/>
                    Share
                </button>
            </div>
            <hr></hr>
            {
                showPostComments && (
                    <CommentsSection userPostDetails={userPostDetails}/>
                )
            }
        </div>
    )
}

export { UserPost }