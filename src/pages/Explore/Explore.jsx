import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchUpdatedHomeFeed } from "../../services/parentServices"
import {
    updateHomeFeed
} from "../../actions/index"
import { 
    Sidebar,
    UserPost,
    WhatsHappeningCard,
    ActiveContacts 
} from '../../components'
import './Explore.css'

function Explore()
{
    const homeFeed = useSelector((state)=> state.homeFeedReducer)
    const dispatch = useDispatch()

    const { pathname } = useLocation()
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(()=>{
        if(homeFeed.length===0)
        {
            (async()=>{
                let updatedHomeFeed = await fetchUpdatedHomeFeed()
                dispatch(updateHomeFeed(updatedHomeFeed.data.homefeed))
            })()
        }
    },[])

    return (
        <div className='page-container'>
            <Sidebar/>
            <div className='explore-page-container'>
                <div className='explore-feed-container'>
                    {
                        homeFeed
                        .map(userPostDetails => 
                            <UserPost 
                                key={userPostDetails._id} 
                                userPostDetails={userPostDetails}
                            />
                        )
                    }
                </div>

                <div className='explore-suggestion-container'>
                    
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

export { Explore }