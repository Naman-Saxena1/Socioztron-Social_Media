import { useState } from "react"
import {
    AiFillLike
} from "../../assets/react-icons"
import './UserPost.css'

function UserPost({userPostDetails})
{
    
    const {
        contentText,
        userName,
        userProfilePic,
        noOfLikes
    } = userPostDetails;

    const [ showFullText, setShowFullText ] = useState(false)
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


    return (
        <div className='user-post'>
            <div className="user-post-header">
                <div className="post-header-left-container">
                    <div className="avatar avatar-x-small">
                        <img 
                            className="avatar-img" 
                            src={userProfilePic===""
                            ?"https://enztron-dev-branch.netlify.app/Icons-and-Images/Avatars/blue-illustration-avatar.svg":
                            userProfilePic} 
                            alt="avatar"
                        />
                        <span className="status-badge-x status-online"></span>
                    </div>
                    <h3>{userName}</h3>
                </div>
                <button className="icon-btn"><i className="fa fa-ellipsis-h fa-x" aria-hidden="true"></i></button>
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
                <button className="outline-secondary-btn post-like-button">Like</button>
                <button className="outline-secondary-btn">Comment</button>
                <button className="outline-secondary-btn">Share</button>
            </div>
        </div>
    )
}

export { UserPost }