import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
    fetchUserFollowers,
    createNewChat
} from "../../services/parentServices"
import {
    CgClose
} from "../../assets/react-icons"
import {
    useChatModal
} from "../../context/index"
import { Image } from "cloudinary-react"
import "./CreateChatModal.css"

const CreateChatModal = () => {

    const { setIsCreatingNewChatModal, setCurrentUserChatData } = useChatModal()
    const [ newChatUsers, setNewChatUsers] = useState([])
    const [ searchInput, setSearchInput ] = useState('')

    const userDetails = useSelector(state => state.userDetailsReducer)
    const { loggedInUserEmail } = userDetails
    const [ loggedInUserFollowers, setLoggedInUserFollowers ] = useState([])

    useEffect(()=>{
        document.body.style.overflow = 'hidden'

        return ()=>{
            document.body.style.overflow = 'visible'
        }
    },[])

    useEffect(()=>{
        (async()=>{
            await fetchUserFollowers(loggedInUserEmail) 
            .then(res=>{
                setLoggedInUserFollowers(res.data.followers)
            })
        })()
    },[])

    function onChatUserSearchHandler(event) 
    {
        setSearchInput(event.target.value)
    }

    function addUserToNewChatList(userDetails)
    {
        let newChatUsersSet = new Set(newChatUsers)
        newChatUsersSet.add(userDetails)
        setNewChatUsers(Array.from(newChatUsersSet))
    }

    function removeUserFromNewChatList(userDetails)
    {
        let updatedNewChatUsersList = newChatUsers.filter(user=>user.email!==userDetails.email)
        setNewChatUsers(updatedNewChatUsersList)
    }

    async function createChatHandler()
    {
        let createNewChatResponse = await createNewChat({newChatUsers: newChatUsers})

        if(createNewChatResponse.data.status==='ok')
        {
            setIsCreatingNewChatModal(false)
            setCurrentUserChatData(prevChatList=>{
                return [...prevChatList, createNewChatResponse.data.chatDetails]
            })
        }
    }

    let filteredFollowers = loggedInUserFollowers?.filter(followerDetail=>{
        const searchTerm = searchInput.toLowerCase()
        const followerName = followerDetail.name.toLowerCase()
        const followerEmail = followerDetail.email.toLowerCase()

        return (followerName.startsWith(searchTerm) || followerEmail.startsWith(searchTerm))
    })
    
    return (
        <div className="create-chat-modal-container">
            
            <div className="create-chat-modal">
                <div className="create-chat-modal-header">
                    <h3>Create Chat</h3>
                    <div 
                        className="close-edit-modal-btn"
                        onClick={()=>setIsCreatingNewChatModal(false)}
                    >
                        <CgClose className="close-edit-modal-btn-icon"/>
                    </div>
                </div>
                <hr></hr>

                <div className="create-new-chat-container">
                    <div style={{width:'100%'}}>                  
                        <div className="create-chat-detail-header">
                            {/* <label htmlFor='search-new-chat-user-input'><h3>Add users to chat</h3></label> */}
                        </div>

                        <div className="search-container">
                            <input 
                                placeholder="Search User"
                                id="search-new-chat-user-input"
                                onChange={onChatUserSearchHandler}
                            />
                            {
                                searchInput!=='' && (
                                    <div className="search-suggestions-container">
                                        {
                                            filteredFollowers.length === 0
                                            ? <p>No followers found</p>
                                            : filteredFollowers.map(userDetail=>{
                                                return (
                                                    <div onClick={()=>addUserToNewChatList(userDetail)} className="chat-user-suggestion">
                                                        <li className='chat-card'>
                                                            <div className="avatar avatar-x-small">
                                                                <img 
                                                                    className="avatar-img" 
                                                                    src={userDetail.profilePicSrc===''?'https://api.iconify.design/ph:user-circle-thin.svg':userDetail.profilePicSrc} 
                                                                    alt="avatar"
                                                                />
                                                            </div>
                                                            <div className='chat-info-container'>
                                                                <p className='chat-name'>{userDetail.name}</p>
                                                                <p className='chat-preview'>{userDetail.email}</p>
                                                            </div>
                                                        </li>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }        
                        </div>
                    </div>

                    <div style={{width:'100%'}}>  
                        {
                            newChatUsers.length!==0 && 
                            (
                                <div className="new-chat-users-chips-container">
                                {
                                    newChatUsers.map(userDetails=>{
                                        return (
                                            <div className="new-chat-user-chip">
                                                <p>{userDetails.name}</p>
                                                <div className="">
    
                                                </div>
                                                <div 
                                                    className="close-create-chat-modal-btn"
                                                    onClick={()=>removeUserFromNewChatList(userDetails)}
                                                >
                                                    <CgClose className="close-create-chat-modal-btn-icon"/>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            )
                        }  
                        
                        <button 
                            className="solid-success-btn"
                            id="create-chat-btn"
                            onClick={()=>createChatHandler()}
                            disabled={newChatUsers.length!==0?"":true}
                        >
                            Create Chat
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export { CreateChatModal }