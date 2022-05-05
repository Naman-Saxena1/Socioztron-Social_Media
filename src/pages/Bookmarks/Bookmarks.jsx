import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import Lottie from "react-lottie"
import { 
    Sidebar,
    UserPost
} from '../../components'
import './Bookmarks.css'
import ManInParkLottie from "../../assets/lottie/man-in-the-park.json"

function Bookmarks()
{
    const manInParkObj = {
        loop: true,
        autoplay: true,
        animationData : ManInParkLottie,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    }

    const homeFeed = useSelector((state)=> state.homeFeedReducer)
    const loggedInUserBookmarks = useSelector((state)=> state.userBookmarksReducer)

    const { pathname } = useLocation()
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='page-container'>
            <Sidebar/>
            {
                ( 
                    homeFeed
                    .filter(post=>loggedInUserBookmarks.includes(post._id))
                    .length===0 
                ) ? (
                    <div className={`bookmarks-page-container no-bookmarks-container`}>
                        <h2 className="no-bookmarks-header">No Bookmarks present</h2>
                        <Lottie options={manInParkObj}
                            height={605}
                            style={{ 
                                width: "auto", 
                                height: "fit-content",
                                minHeight: "590px",
                                margin: "auto",
                                position: "absolute"
                            }}
                        />
                    </div>
                ) : (
                        <div className={`bookmarks-page-container`}>
                            <h2>Your Bookmarks</h2>
                            <div className='explore-feed-container'>
                                {
                                    homeFeed
                                    .filter(post=>loggedInUserBookmarks.includes(post._id))
                                    .map(userPostDetails => 
                                        <UserPost 
                                            key={userPostDetails._id} 
                                            userPostDetails={userPostDetails}
                                        />
                                    )
                                }
                            </div>
                        </div>
                )
            }          
        </div>
    )
}

export { Bookmarks }