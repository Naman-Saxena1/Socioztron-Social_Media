import { useState,useEffect } from "react"
import {
    fetchUserLikedPosts,
    fetchUpdatedHomeFeed,
    fetchUserDetails
} from "../../services/parentServices"
import jwt_decode from "jwt-decode"
import { useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Lottie from "react-lottie"
import {
    updateHomeFeed,
    updateAllUserLikedPosts,
    getCreationSortedPosts,
    updateUserFollowingList
} from "../../actions/index"
import {
    useUserLogin
} from "../../context/index"
import { 
    Sidebar,
    UserPost,
    WhatsHappeningCard,
    ActiveContacts,
    CreatePost,
    HomeFeedContentController
} from '../../components'
import './Home.css'
import LoadingLottie from "../../assets/lottie/loading-0.json"

function Home()
{
    const homeFeed = useSelector((state)=> state.homeFeedReducer)
    const userDetails = useSelector(state => state.userDetailsReducer)
    const {
        loggedInUserEmail,
        loggedInUserFollowing
    } = userDetails

    const loadingObj = {
      loop: true,
      autoplay: true,
      animationData : LoadingLottie,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }

    const dispatch = useDispatch()
    const { userLoggedIn } = useUserLogin()
    const [ trendingHomeFeed, setTrendingHomeFeed ] = useState(false)
    const [ sortByHomeFeed, setSortByHomeFeed ] = useState("Latest")

    const { pathname } = useLocation()
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(()=>{
        (async ()=>{
            if(userLoggedIn)
            {
                let updatedAllUserLikedPosts = await fetchUserLikedPosts()
                dispatch(updateAllUserLikedPosts(updatedAllUserLikedPosts.data.likedPosts))
            }
     
            let updatedHomeFeed = await fetchUpdatedHomeFeed()
            dispatch(updateHomeFeed(updatedHomeFeed.data.homefeed))
        })()

    },[userLoggedIn, loggedInUserFollowing])

    useEffect(()=>{
        dispatch(getCreationSortedPosts())
    },[sortByHomeFeed])

    useEffect(()=>{
        if(userLoggedIn && loggedInUserFollowing.length===0)
        {
            (async ()=>{
                let loggedInUserResponse = await fetchUserDetails(loggedInUserEmail)
                let loggedInUserDetails =  loggedInUserResponse.data.allUserDetails
                dispatch(updateUserFollowingList(loggedInUserDetails.following))

            })()
        }
    })

    return (
        <div className='page-container'>
            <Sidebar/>
            <div className='home-page-container'>
                <div className='home-feed-container'>
                    
                    <CreatePost/>
                    <HomeFeedContentController 
                        trendingHomeFeed={trendingHomeFeed} 
                        setTrendingHomeFeed={setTrendingHomeFeed}
                        sortByHomeFeed={sortByHomeFeed} 
                        setSortByHomeFeed={setSortByHomeFeed} 
                    />

                    {
                        userLoggedIn && loggedInUserFollowing &&
                        (loggedInUserFollowing.length===1||loggedInUserFollowing.length===0) &&
                        (
                            <h3 className="starting-following-suggestion-header">
                                Starting following other users to view more content
                            </h3>
                        )
                    }
                    {
                        homeFeed.length===0 &&
                        <Lottie options={loadingObj}
                            height={380}
                            style={{ margin: "auto"}}
                            isStopped={false}
                            isPaused={false}
                        />
                    }
                    {
                        userLoggedIn ? (
                            trendingHomeFeed?
                            (
                                homeFeed.filter(userPost=> userPost.noOfLikes>=3&&loggedInUserFollowing.includes(userPost.userEmail) )
                                .map(userPostDetails => 
                                    <UserPost 
                                        key={userPostDetails._id} 
                                        userPostDetails={userPostDetails}
                                    />
                                )
                            )
                            :
                            (
                                homeFeed.filter(userPost=> loggedInUserFollowing.includes(userPost.userEmail) )
                                .map(userPostDetails => 
                                    <UserPost 
                                        key={userPostDetails._id} 
                                        userPostDetails={userPostDetails}
                                    />
                                )
                            )
                        ): (
                            trendingHomeFeed?
                            (
                                homeFeed.filter(userPost=> userPost.noOfLikes>=3)
                                .map(userPostDetails => 
                                    <UserPost 
                                        key={userPostDetails._id} 
                                        userPostDetails={userPostDetails}
                                    />
                                )
                            )
                            :
                            (
                                homeFeed
                                .map(userPostDetails => 
                                    <UserPost 
                                        key={userPostDetails._id} 
                                        userPostDetails={userPostDetails}
                                    />
                                )
                            )
                        )
                    }
                </div>

                <div className='home-suggestion-container'>
                    
                    <div className='whats-happening-container'>
                        <h3>What's happening</h3>
                        <hr></hr>

                        <WhatsHappeningCard/>
                        
                    </div>

                    <div className='active-contacts-container'>
                        <h3>Active Users</h3>
                        <hr></hr>

                        <ActiveContacts
                            imgSrc="https://raw.githubusercontent.com/Naman-Saxena1/Enztron-Component_Library/development/Icons-and-Images/Avatars/640x426-image-avatar.jpg"
                            userName="Alexa"
                            userEmail="newuser1@gmail.com"
                            userProfilePic="https://raw.githubusercontent.com/Naman-Saxena1/Enztron-Component_Library/development/Icons-and-Images/Avatars/1920x1280-image-avatar.jpg"
                        />

                        <ActiveContacts
                            imgSrc="https://raw.githubusercontent.com/Naman-Saxena1/Enztron-Component_Library/development/Icons-and-Images/Avatars/pexels-andrea-piacquadio-3978586.jpg"
                            userName="Jane"
                            userEmail="newuser2@gmail.com"
                            userProfilePic="https://raw.githubusercontent.com/Naman-Saxena1/Enztron-Component_Library/development/Icons-and-Images/Avatars/pexels-andrea-piacquadio-3978586.jpg"
                        />

                        <ActiveContacts
                            imgSrc="https://raw.githubusercontent.com/Naman-Saxena1/Enztron-Component_Library/development/Icons-and-Images/Avatars/pexels-burst-374044.jpg"
                            userName="Max"
                            userEmail="newuser3@gmail.com"
                            userProfilePic="https://raw.githubusercontent.com/Naman-Saxena1/Enztron-Component_Library/development/Icons-and-Images/Avatars/pexels-burst-374044.jpg"
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}

export { Home }