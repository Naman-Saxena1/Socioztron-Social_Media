import "./ActiveContacts.css"

function ActiveContacts({ imgSrc, contactName })
{
    return (
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
                <h4>{contactName}</h4>
            </div>
        </div>
    )
}

export { ActiveContacts }