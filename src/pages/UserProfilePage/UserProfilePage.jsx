import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
    fetchUserDetails,
    fetchUpdatedHomeFeed,
    updateUserFollowing
} from "../../services/parentServices"
import Lottie from "react-lottie"
import { 
    Sidebar,
    UserPost
} from '../../components'
import {
    useUserLogin,
    useEditProfileModal
} from "../../context/index"
import {
    updateCurrentProfile,
    updateUserFollowingList,
    updateHomeFeed
} from "../../actions/index"
import {
    HiOutlinePencilAlt,
    BiLink
} from "../../assets/react-icons"
import loginLottie from "../../assets/lottie/authentication.json"
import './UserProfilePage.css'

function UserProfilePage()
{
    const { userLoggedIn } = useUserLogin()
    const [ isUserFollowed, setIsUserFollowed ] = useState(false)
    const userDetails = useSelector(state => state.userDetailsReducer)
    const homeFeed = useSelector(state=> state.homeFeedReducer)
    const { 
        showEditProfileModal, 
        setShowEditProfileModal, 
        editUserProfileDetails, 
        setEditUserProfileDetails 
    } = useEditProfileModal()

    const {
        loggedInUserEmail,
        loggedInUserFollowing
    } = userDetails
    const dispatch = useDispatch()
    const { state, pathname } = useLocation()
    const {
        profileUserName,
        profileUserEmail,
        profileUserProfile 
    }= state

    const userProfileDetails = useSelector(state=>state.currentProfilePageReducer)

    const {
        portfolioLink,
        profilePicSrc,
        profileBackgroundSrc,
        userBio
    } = userProfileDetails

    const authLottie = {
        loop: true,
        autoplay: true, 
        animationData: loginLottie,
        rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}
    }
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(()=>{    
        if(userLoggedIn)
        {
            (async()=>{
                let allUserDetails = await fetchUserDetails(profileUserEmail)

                if(allUserDetails.data.status==="ok")
                {
                    dispatch(updateCurrentProfile(allUserDetails.data.allUserDetails))
                }

            })()
        }
    },[state])
    
    useEffect(()=>{
        if(loggedInUserFollowing!==undefined && loggedInUserFollowing.includes(profileUserEmail))
        {
            setIsUserFollowed(true)
        }
    },[profileUserEmail, loggedInUserFollowing])

    useEffect(()=>{
        if(homeFeed.length===0)
        {
            (async()=>{
                let updatedHomeFeed = await fetchUpdatedHomeFeed()
                dispatch(updateHomeFeed(updatedHomeFeed.data.homefeed))
            })()
        }
    },[])

    const updateUserFollowingFn = async() => {
        let updatedUserFollowingListResponse = await updateUserFollowing({profileUserEmail})

        if(updatedUserFollowingListResponse.data.status==="ok")
        {
            dispatch(updateUserFollowingList(updatedUserFollowingListResponse.data.updatedUserFollowingList))
            setIsUserFollowed(prevState=>!prevState)
        }
    }

    return (
        <div className='page-container'>
            <Sidebar/>
            {
                userLoggedIn ? (                    
                    <div className='user-profile-page-container'>
                        <div className="user-profile-content-container">
                            <img 
                                className="user-profile-background"
                                src={profileBackgroundSrc!==""?profileBackgroundSrc:"https://res.cloudinary.com/dddfc84ni/image/upload/v1651254170/kegxidgi2u9a8mnb4wdf.jpg"}
                                alt="profile background"
                            />
                            <div className="user-profile-header">
                                <div className="main-user-details-container">
                                    <img 
                                        className="user-profile-page-user-pic"
                                        src={profilePicSrc!==""?profilePicSrc:"https://api.iconify.design/ph:user-circle-thin.svg"} 
                                        alt="user profile pic">
                                    </img>
                                    <h1 
                                        className="user-profile-page-username"
                                    >
                                        {profileUserName}
                                    </h1>
                                    {
                                        profileUserEmail===loggedInUserEmail?
                                        (
                                            <button 
                                                className="edit-user-profile-btn"
                                                onClick={()=>{
                                                    setEditUserProfileDetails({
                                                        userName: profileUserName,
                                                        userBackgroundPic: profileBackgroundSrc!==""?profileBackgroundSrc:"https://res.cloudinary.com/dddfc84ni/image/upload/v1651254170/kegxidgi2u9a8mnb4wdf.jpg",
                                                        userProfilePic: profilePicSrc,
                                                        userBio: userBio,
                                                        userPortfolioLink: portfolioLink
                                                    })
                                                    setShowEditProfileModal(true)
                                                }}
                                            >
                                                <HiOutlinePencilAlt/>
                                                Edit Profile
                                            </button>
                                        ):
                                        (
                                            <button 
                                                className={isUserFollowed?`follow-user-profile-btn`:`follow-user-profile-btn follow-user-profile-btn-active`}
                                                onClick={()=>{
                                                    updateUserFollowingFn()
                                                }}
                                            >
                                                {isUserFollowed?"Following":"Follow"}
                                            </button>
                                        )
                                    }
                                </div>
                                {
                                    userBio!=="" &&
                                    (
                                        <p className="user-profile-bio">
                                            {userBio}
                                        </p>
                                    )
                                }
                                {
                                    portfolioLink!=="" &&
                                    (
                                        <p className="user-portfolio-link">
                                            <a 
                                                href={portfolioLink}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <BiLink className="user-portfolio-link-icon"/>
                                                Portfolio Link
                                            </a>
                                        </p>
                                    )
                                }
                            </div>
                            <hr></hr>

                            <div className='home-feed-container'>                                
                                {
                                    homeFeed
                                    .filter(userPostDetails=> userPostDetails.userEmail===profileUserEmail)
                                    .map(userPostDetails => 
                                        <UserPost 
                                            key={userPostDetails._id} 
                                            userPostDetails={userPostDetails}
                                        />
                                    )
                                }
                            </div>

                        </div>
                    </div>
                ): (
                    <div className="user-profile-auth-lottie-container">
                        <h1>Kindly login</h1>
                        <Lottie options={authLottie}
                            height={400}
                            width={400}
                        />
                    </div>
                )         
            }
        </div>
    )
}

export { UserProfilePage }