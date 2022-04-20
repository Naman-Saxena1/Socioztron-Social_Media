import React, { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import jwt_decode from "jwt-decode";
import { 
    AiOutlineHome,
    AiOutlineBell 
} from "../../assets/react-icons"
import { useUserLogin, useToast } from "../../context/index"
import {
    refreshHomeFeed
} from "../../actions/index"
import {
    updateAllUserLikedPosts,
    updateUserDetails
} from "../../actions/index"
import './Navbar.css'

function Navbar() {

    const dispatch = useDispatch()

    const { setUserLoggedIn } = useUserLogin(false)
    const { showToast } = useToast()

    useEffect(()=>{
        const token=localStorage.getItem('socioztron-user-token')
        if(token)
        {
            const user = jwt_decode(token)
            
            if(!user)
            {
                localStorage.removeItem('socioztron-user-token')
                setUserLoggedIn(false)
            }
            else
            {
                setUserLoggedIn(true)
            }
        }
    },[])

    function logoutUser()
    {
        dispatch(updateUserDetails({
            loggedInUserName: "", 
            loggedInUserEmail: "", 
            loggedInUserProfile: "https://enztron-dev-branch.netlify.app/Icons-and-Images/Avatars/blue-illustration-avatar.svg"
        }))
        dispatch(updateAllUserLikedPosts([]))
        localStorage.removeItem('socioztron-user-token')
        setUserLoggedIn(false)
        localStorage.clear()
        dispatch(refreshHomeFeed())
        showToast("success","Logged out successfully")
    }
    
    return (
        <div className="top-bar">
            <div className="left-topbar-container">
                {/* <button id="top-bar-ham-menu-btn" className="icon-btn"><i className="fa fa-bars" aria-hidden="true"></i></button> */}
                <Link to="/">
                    <h2 className="top-bar-brand-name">Socioztron</h2>
                </Link>
                <div className="search-bar">
                    <input className="search-bar-input" placeholder="Search Socioztron"/>
                    <button id="search-bar-btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <div className="right-topbar-container">
                {
                    localStorage.getItem('socioztron-user-token')!==null
                    ? (
                        <button onClick={logoutUser} className="navbar-login-btn solid-primary-btn">Logout</button>
                    )
                    : (
                        <Link to="/login">
                            <button className="navbar-login-btn solid-primary-btn">Login</button>
                        </Link>
                    )
                }
                <Link to="/">
                    <button className="icon-btn">
                        <div>
                            <AiOutlineHome/>
                        </div>
                    </button>
                </Link>
                <button className="icon-btn">
                    <div className="icon-count-badge">
                        <AiOutlineBell/>
                        {
                            // userNotifications.length!==0 &&
                            (<span className="count-badge-x">{4}</span>)
                        }
                    </div>
                </button>
            </div>
        </div>
    )
}

export {Navbar};