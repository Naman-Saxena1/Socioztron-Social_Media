import { 
    Sidebar,
    UserPost,
    WhatsHappeningCard,
    ActiveContacts 
} from '../../components'
import './Home.css'

function Home()
{
    return (
        <div className='page-container'>
            <Sidebar/>
            <div className='home-page-container'>
                <div className='home-feed-container'>
                    
                    <UserPost/>
                    
                    <UserPost/>

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
                            contactName="Alexa"
                        />

                        <ActiveContacts
                            imgSrc="https://raw.githubusercontent.com/Naman-Saxena1/Enztron-Component_Library/development/Icons-and-Images/Avatars/pexels-burst-374044.jpg"
                            contactName="Max"
                        />

                        <ActiveContacts
                            imgSrc="https://raw.githubusercontent.com/Naman-Saxena1/Enztron-Component_Library/development/Icons-and-Images/Avatars/pexels-andrea-piacquadio-3978586.jpg"
                            contactName="Jane"
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}

export { Home }