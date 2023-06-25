import "./Sidebar.css"
import { useSelector } from "react-redux"
import {
    AiOutlineHome,
    AiOutlineUser,
    MdOutlineExplore,
    MdOutlineBookmarkBorder,
    BiEnvelope
} from "../../assets/react-icons"
import { Link, useLocation } from "react-router-dom"

function Sidebar()
{
    let location = useLocation()
    let urlPath  = location.pathname

    const userDetails = useSelector(state => state.userDetailsReducer)
    const {
        loggedInUserName,
        loggedInUserEmail,
        loggedInUserProfile
    } = userDetails

    return (
        <div className="sidebar">
            <Link to="/">
                <div className={urlPath==="/"?`sidebar-options active-sidebar-option`:`sidebar-options`}>
                    <AiOutlineHome className="sidebar-options-icons"/>
                    <p className="sidebar-options-text">Home</p>
                </div>
            </Link>
            <Link to="/explore">
                <div className={urlPath==="/explore"?`sidebar-options active-sidebar-option`:`sidebar-options`}>
                    <MdOutlineExplore className="sidebar-options-icons"/>
                    <p className="sidebar-options-text">Explore</p>
                </div>
            </Link>
            <Link to="/chats">
                <div className={urlPath==="/chats"?`sidebar-options active-sidebar-option`:`sidebar-options`}>
                    <BiEnvelope className="sidebar-options-icons"/>
                    <p className="sidebar-options-text">Chats</p>
                </div>
            </Link>
            <Link to="/bookmarks">
                <div className={urlPath==="/bookmarks"?`sidebar-options active-sidebar-option`:`sidebar-options`}>
                    <MdOutlineBookmarkBorder className="sidebar-options-icons"/>
                    <p className="sidebar-options-text">Bookmarks</p>
                </div>
            </Link>
            <Link 
                to={`/profile/${loggedInUserName}`}
                state={{
                    profileUserName: loggedInUserName,
                    profileUserEmail: loggedInUserEmail,
                    profileUserProfile: loggedInUserProfile
                }}
            >
                <div className={urlPath===`/profile/${loggedInUserName}`?`sidebar-options active-sidebar-option`:`sidebar-options`}>
                    <AiOutlineUser className="sidebar-options-icons"/>
                    <p className="sidebar-options-text">Profile</p>
                </div>
            </Link>
        </div>
    )
}

export { Sidebar }