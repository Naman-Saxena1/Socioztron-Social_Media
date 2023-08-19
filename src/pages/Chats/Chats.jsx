import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux"
import Lottie from "react-lottie"
import {
    fetchUserChatList,
    fetchChatDetails,
    sendMessage
} from '../../services/parentServices'
import { 
    Sidebar
} from '../../components'
import {
    useUserLogin,
    useChatModal
} from "../../context/index"
import {
    BiMessageSquareAdd,
    BiImageAdd,
    BsEmojiSmile,
    AiOutlineSend
} from "../../assets/react-icons"
import Picker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react';
import loginLottie from "../../assets/lottie/authentication.json"
import io from "socket.io-client"
import './Chats.css'

const ENDPOINT = "https://socioztron.co.in";
var socket, currentlyOpenedChatCompare, hasUserJoined= false;

function Chats()
{
    const { userLoggedIn } = useUserLogin()
    const [currentlyOpenedChat, setCurrentlyOpenedChat] = useState({})
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)
    const [ newMessage, setNewMessage ] = useState("")

    const authLottie = {
        loop: true,
        autoplay: true, 
        animationData: loginLottie,
        rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}
    }

    const { pathname } = useLocation();
    useEffect(() => {  
        if(userLoggedIn)
        {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    const userDetails = useSelector(state => state.userDetailsReducer)
    const {
        loggedInUserId,
        loggedInUserName,
        loggedInUserEmail
    } = userDetails

    const {
        setIsCreatingNewChatModal,
        currentUserChatData,
        setCurrentUserChatData
    } = useChatModal()

    useEffect(()=>{
         
        if(userLoggedIn)
        {
            (async()=>{
                let loggedInUserChatsList = await fetchUserChatList(loggedInUserEmail)

                if(loggedInUserChatsList.data.status==='ok')
                {
                    let updateUserChatsList = loggedInUserChatsList.data.userChatsList
                    setCurrentUserChatData([...updateUserChatsList])
                } 
            })()
        }

        if(!hasUserJoined)
        {
            socket = io(ENDPOINT, {
                path: '/mysocket',
                    withCredentials: true
            });
            socket.emit("setup",userDetails);
            socket.on("connection", () => {
                console.log("User connected to socket")
            })
            hasUserJoined= true
        }

        const chatWindow = document.querySelector('.chat-window-container')
         
        if(userLoggedIn)
        {
            chatWindow.scrollTo({
                top: chatWindow.scrollHeight,
                behavior: 'smooth'
            });
        }  
    },[])

    useEffect(()=>{
        const chatWindow = document.querySelector('.chat-window-container')  
        if(userLoggedIn)
        {
            chatWindow.scrollTo({
                top: chatWindow.scrollHeight,
                behavior: 'smooth'
            });
            currentlyOpenedChatCompare = currentlyOpenedChat      
        }  
    },[currentlyOpenedChat])

    useEffect(() => {
        socket.on("message received", (newReceivedMessage) => {
            if (!currentlyOpenedChatCompare || currentlyOpenedChatCompare._id !== newReceivedMessage.chatId) {
                // Chat not opened, give user notification
                // console.log("Give Notification!");
            } else {
                setCurrentlyOpenedChat(prevState => {
                return {
                    ...prevState,
                    messages: [...prevState.messages, newReceivedMessage]
                };
                });
            }

            setCurrentUserChatData(prevState => {
                let newState = prevState.map(chatInfo=>{
                    if(chatInfo._id === newReceivedMessage.chatId)
                    {
                        chatInfo.lastMessagePreview = newReceivedMessage.message
                    }
                    return {...chatInfo}
                })
                return newState
            })
        });

        return () => {
            socket.off("message received");
        };
    });

    async function openChatHandler(chat)
    {
        if(chat.messages)
        {
            setCurrentlyOpenedChat({...chat})
        }
        else
        {
            let response = await fetchChatDetails({chatId: chat._id, userId: loggedInUserId})

            if(response.data.status==="ok")
            {
                let latestMessages = response.data.userChatsList[0].messages
                let updatedChat = {...chat,messages:[...latestMessages]}
                setCurrentlyOpenedChat(updatedChat)
            }
        }

        socket.emit("join chat",{chatId: chat._id, userId: userDetails.loggedInUserId})
        const chatWindow = document.querySelector('.chat-window-container')
        if(userLoggedIn)
        {
            setTimeout(() => {
                chatWindow.scrollTo({
                    top: chatWindow.scrollHeight,
                    behavior: 'smooth'
                });
            }, 0);
        }      
    }

    function onEmojiClick(event, emojiObject) 
    {
        setNewMessage(prevState => prevState+emojiObject.emoji)
    }

    async function sendMessageHandler()
    {
        let response = await sendMessage({
            chatId      : currentlyOpenedChat._id,
            userId      : loggedInUserId,
            newMessage  : newMessage
        })

        let creationDate = new Date()
        let newMessageDoc = { 
            message:  newMessage,
            chatId:  currentlyOpenedChat._id,
            senderId: loggedInUserId,
            senderName: loggedInUserName,
            creationDate: creationDate
        }

        if(response.data.status==="ok")
        {
            setNewMessage("")
            // socket.emit("new message", newMessageDoc)
            setCurrentlyOpenedChat(prevState => {
                let messagesList = prevState.messages
                let newState = { ...prevState, lastMessagePreview: newMessage,messages: [...messagesList, newMessageDoc]}
                return newState
            })

            setCurrentUserChatData(prevState => {
                let newState = prevState.map(chatInfo=>{
                    if(chatInfo._id == currentlyOpenedChat._id)
                    {
                        chatInfo.lastMessagePreview = newMessage
                    }
                    return {...chatInfo}
                })
                return newState
            })
        }
    }

    return (
        <div className='page-container'>
            <Sidebar/>
            {
                userLoggedIn ? (
                <div className='messages-page-container'>
                    <div className='chats-container'>
                        <div className='chat-header'> 
                            <h3>Chat</h3>
                            <div title='New chat'>
                                <BiMessageSquareAdd onClick={()=>setIsCreatingNewChatModal(prevState=>!prevState)} className="chat-option-icons"/>
                            </div>
                        </div>
                        <ul className='chats-list'>
                            {
                                currentUserChatData.map(chat=>{
                                    return (
                                        <li className='chat-card' key={chat._id} onClick={(event)=>{openChatHandler(chat)}}>
                                            <div className="avatar avatar-x-small">
                                                <img 
                                                    className="avatar-img" 
                                                    src={chat.chatProfilePic?chat.chatProfilePic:'https://api.iconify.design/ph:user-circle-thin.svg'} 
                                                    alt="avatar"
                                                />
                                                <span className="status-badge-x status-online"></span>
                                            </div>
                                            <div className='chat-info-container'>
                                                <p className='chat-name'>{chat.name}</p>
                                                <p className='chat-preview'>
                                                    {
                                                        chat.lastMessagePreview
                                                    }
                                                </p>
                                            </div>
                                            <p className='last-message-timestamp'>
                                                {
                                                    chat.lastUpdatedTime.split('T')[0]
                                                }
                                            </p>
                                        </li>
                                    )
                                })
                            }
                            
                        </ul>
                    </div>
                    <div className='currently-opened-chat-container'>
                        <div className='chat-header'> 
                            <h3>{
                                    currentlyOpenedChat.name?currentlyOpenedChat.name:''
                                }
                            </h3>
                        </div>
                        <div className='chat-window-container' style={{alignItems:currentlyOpenedChat.name?'flex-end':'center'}}>
                            <div className='chat-window'>   
                                        
                                {
                                    currentlyOpenedChat.name?
                                    currentlyOpenedChat.messages.map(messageDetails=>{
                                        return (
                                            messageDetails.senderId === loggedInUserId
                                            ?
                                            <div className='chat-message-grid-area current-users-message'>
                                                <div className='chat-message-container'> 
                                                    <div className='message-text'>
                                                        <p>{messageDetails.message}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className='chat-message-grid-area other-users-message'>
                                                <div className='chat-message-container'> 
                                                    <div className='message-header'>
                                                        <p>{messageDetails.senderName}</p>
                                                    </div>
                                                    <div className='message-text'>
                                                        <p>{messageDetails.message}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <div className='start-message-container'>
                                        <h2>Select a message</h2>
                                        <p>Choose from your existing conversations, start a new one, or just keep swimming.</p>
                                        <button onClick={()=>setIsCreatingNewChatModal(true)} className="navbar-login-btn solid-primary-btn">New message</button>
                                    </div>
                                }
                            </div>
                        </div>
                        {
                            currentlyOpenedChat.name && (
                                <div className='message-box'>
                                    <textarea 
                                        type='text' 
                                        className='message-input' 
                                        placeholder='Type a new message'
                                        value={newMessage}
                                        onChange={(event)=>{
                                            setNewMessage(event.target.value)
                                        }}
                                    />
                                    <div className='chat-options-container'>
                                        <div style={{position:"relative"}}>
                                            {/* <div className='chat-option' title='Add Image'>
                                                <BiImageAdd className="chat-option-icons"/>
                                            </div> */}
                                            {
                                                showEmojiPicker && 
                                                <div
                                                    className="message-emoji-picker-container"
                                                    onClick={event=>{
                                                    event.stopPropagation()
                                                    }}
                                                >
                                                    <Picker 
                                                    className="emoji-picker" 
                                                    onEmojiClick={onEmojiClick} 
                                                    skinTone={SKIN_TONE_NEUTRAL} 
                                                    />
                                                </div>
                                            }
                                            <div className='chat-option' title='Add Emoji' onClick={()=>setShowEmojiPicker(prevState=>!prevState)}>
                                                <BsEmojiSmile className="chat-option-icons"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='chat-option' title='Send message' onClick={sendMessageHandler}>
                                                <AiOutlineSend className="chat-option-icons"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }      
                    </div>
                </div>
            ): (
                <div className="user-profile-auth-lottie-container">
                    <h1>Kindly login</h1>
                    <Lottie options={authLottie}
                        height={400}
                        width={400}
                    />
                </div>
            )
        }
        </div>
    )
}

export { Chats }