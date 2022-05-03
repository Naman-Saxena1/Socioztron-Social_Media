import { useState,useEffect } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useSelector, useDispatch } from "react-redux"
import {
    updateHomeFeed,
    updateAllUserLikedPosts,
    getCreationSortedPosts,
    updateUserDetails
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

function Home()
{
    const homeFeed = useSelector((state)=> state.homeFeedReducer)
    const dispatch = useDispatch()
    const { userLoggedIn } = useUserLogin()
    const [ trendingHomeFeed, setTrendingHomeFeed ] = useState(false)
    const [ sortByHomeFeed, setSortByHomeFeed ] = useState("Latest")

    useEffect(()=>{
        (async ()=>{
            if(userLoggedIn)
            {
                let updatedAllUserLikedPosts = await axios.get(
                    "https://socioztron.herokuapp.com/api/userpost/likedposts",
                    { 
                        headers: {'x-access-token': localStorage.getItem("socioztron-user-token")}
                    }
                )
                dispatch(updateAllUserLikedPosts(updatedAllUserLikedPosts.data.likedPosts))
            }
     
            let updatedHomeFeed = await axios.get(
                "https://socioztron.herokuapp.com/api/userpost"
            )
            dispatch(updateHomeFeed(updatedHomeFeed.data.homefeed))
        })()

    },[userLoggedIn])

    useEffect(()=>{
        dispatch(getCreationSortedPosts())
    },[sortByHomeFeed])

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
                            homeFeed.map(userPostDetails => 
                                <UserPost 
                                    key={userPostDetails._id} 
                                    userPostDetails={userPostDetails}
                                />
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
                        <h3>Active Contacts</h3>
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