import { 
    Sidebar
} from '../../components'
import './UserProfilePage.css'

function UserProfilePage()
{
    return (
        <div className='page-container'>
            <Sidebar/>
            <div className='user-profile-page-container'>
                <p>User Profile Page &#9924;</p>
            </div>
        </div>
    )
}

export { UserProfilePage }