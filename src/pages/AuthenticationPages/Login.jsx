import React, { useState } from "react"
import jwt_decode from "jwt-decode"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"
import {
    updateUserDetails
} from "../../actions/index"
import { 
    useToast, 
    useUserLogin
} from "../../context/index"
import "./UserAuth.css"

function Login()
{
    const dispatch = useDispatch()
    const { setUserLoggedIn } = useUserLogin()
    const { showToast } = useToast()

    const [userEmail    , setUserEmail]    = useState('')
    const [userPassword , setUserPassword] = useState('')

    const navigate = useNavigate()

    function loginUser(event)
    {
        event.preventDefault();
        axios.post(
            "https://socioztron.herokuapp.com/api/login",
            {
                userEmail,
                userPassword
            }
        )
        .then(res => {
            if(res.data.user)
            {
                localStorage.setItem('socioztron-user-token',res.data.user)
                let loggedInUserDetails = jwt_decode(res.data.user)
                dispatch(updateUserDetails({
                    loggedInUserName: loggedInUserDetails.name, 
                    loggedInUserEmail: loggedInUserDetails.email, 
                    loggedInUserProfile: loggedInUserDetails.userProfilePic,
                    loggedInUserFollowing: res.data.userDetails.following
                }))
                showToast("success","Logged in successfully")
                setUserLoggedIn(true)
                navigate('/')
            }
            else
            {
                throw new Error("Error in user login")
            }
        })
        .catch(err=>{
            showToast("error","Error logging in user. Please try again")
        })
    }

    return (
        <div className="user-auth-page">
        <div className="user-auth-content-container">
            <form onSubmit={loginUser} className="user-auth-form">
                <h2>Login</h2>
                
                <div className="user-auth-input-container">
                    <label htmlFor="user-auth-input-email"><h4>Email address</h4></label>
                    <input 
                        id="user-auth-input-email" 
                        className="user-auth-form-input" 
                        type="email" 
                        placeholder="Email" 
                        value={userEmail}
                        onChange={(event)=>setUserEmail(event.target.value)}
                        required/>
                </div>

                <div className="user-auth-input-container">
                    <label htmlFor="user-auth-input-password"><h4>Password</h4></label>
                    <input 
                        id="user-auth-input-password" 
                        className="user-auth-form-input" 
                        type="password" 
                        placeholder="Password" 
                        value={userPassword}
                        onChange={(event)=>setUserPassword(event.target.value)}
                        required/>
                </div>

                <div className="user-options-container">
                    <div className="remember-me-container">
                        <input type="checkbox" id="remember-me"/>
                        <label htmlFor="remember-me">Remember Me</label>
                    </div>
                    <div>
                        <Link to="#" className="links-with-blue-underline" id="forgot-password">
                            Forgot Password?
                        </Link>
                    </div>
                </div>

                <button type="submit" className="solid-success-btn form-user-auth-submit-btn">Login</button>

                <div className="new-user-container">
                    <Link to="/signup" className="links-with-blue-underline" id="new-user-link">
                        Create new account &nbsp; 
                    </Link>
                </div>

            </form>
        </div>
        </div>
    )
}

export { Login }