import { Link } from "react-router-dom"
import "./ActiveContacts.css"

function ActiveContacts({ imgSrc, userName, userEmail, userProfilePic })
{
    return (
        <Link 
            to={`/profile/${userName}`} 
            state={{
                profileUserName: userName,
                profileUserEmail: userEmail,
                profileUserProfile: userProfilePic
            }}
        >
            <div className="active-connections">
                <div className="active-connections-header-container">
                    <div className="avatar avatar-x-small">
                        <img 
                            className="avatar-img" 
                            src={imgSrc} 
                            alt="avatar"
                        />
                        <span className="status-badge-x status-online"></span>
                    </div>
                    <h4>{userName}</h4>
                </div>
            </div>
        </Link>
    )
}

export { ActiveContacts }