import React, { useState, useEffect } from "react"
import jwt_decode from "jwt-decode"
import "./UserAuth.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { 
    useToast, 
    useUserLogin
} from "../../context/index"

function Login()
{
    const { setUserLoggedIn }       = useUserLogin()
    const { showToast }             = useToast()

    const [userEmail    , setUserEmail]    = useState('')
    const [userPassword , setUserPassword] = useState('')

    useEffect(()=>{
        const token=localStorage.getItem('socioztron-user-token')

        if(token)
        {
            const user = jwt_decode(token)
            if(!user)
            {
                localStorage.removeItem('socioztron-user-token')
            }
            else
            {
                (async function getUpdatedWishlistAndCart()
                {
                    let updatedUserInfo = await axios.get(
                    "http://localhost:1337/api/user",
                    {
                        headers:
                        {
                        'x-access-token': localStorage.getItem('socioztron-user-token'),
                        }
                    })

                    if(updatedUserInfo.data.status==="ok")
                    {

                    }
                })()
            }
        }   
    },[])

    const navigate = useNavigate()

    function loginUser(event)
    {
        event.preventDefault();
        axios.post(
            "http://localhost:1337/api/login",
            {
                userEmail,
                userPassword
            }
        )
        .then(res => {
            
            if(res.data.user)
            {
                localStorage.setItem('socioztron-user-token',res.data.user)
                showToast("success","","Logged in successfully")
                setUserLoggedIn(true)
                navigate('/home')
            }
            else
            {
                throw new Error("Error in user login")
            }

        })
        .catch(err=>{
            showToast("error","","Error logging in user. Please try again")
        })
    }

    return (
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
    )
}

export { Login }