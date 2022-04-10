import "./ActiveContacts.css"

function ActiveContacts({ imgSrc, contactName })
{
    return (
        <div class="active-connections">
            <div class="active-connections-header-container">
                <div class="avatar avatar-x-small">
                    <img 
                        class="avatar-img" 
                        src={imgSrc} 
                        alt="avatar"
                    />
                    <span class="status-badge-x status-online"></span>
                </div>
                <h4>{contactName}</h4>
            </div>
        </div>
    )
}

export { ActiveContacts }