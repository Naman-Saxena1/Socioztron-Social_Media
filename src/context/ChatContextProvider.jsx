import { useState, useContext, createContext } from "react"

const ChatContext = createContext(null)

const ChatContextProvider = ({children}) => {
    const [isCreatingNewChatModal, setIsCreatingNewChatModal] = useState(false)
    const [currentUserChatData, setCurrentUserChatData] = useState([])

    return (
        <ChatContext.Provider 
            value={{ 
                isCreatingNewChatModal, 
                setIsCreatingNewChatModal,
                currentUserChatData,
                setCurrentUserChatData
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

const useChatModal = () => useContext(ChatContext)

export { ChatContextProvider, useChatModal }