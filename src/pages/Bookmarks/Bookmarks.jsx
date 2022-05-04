import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { 
    Sidebar,
    UserPost
} from '../../components'
import './Bookmarks.css'

function Bookmarks()
{
    const homeFeed = useSelector((state)=> state.homeFeedReducer)
    const loggedInUserBookmarks = useSelector((state)=> state.userBookmarksReducer)

    const { pathname } = useLocation()
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='page-container'>
            <Sidebar/>
            <div className='bookmarks-page-container'>
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
        </div>
    )
}

export { Bookmarks }