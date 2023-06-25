import { useState, useContext, createContext } from "react"

const EditPostContext = createContext(null)

const EditPostContextProvider = ({children}) => {
    const [ showEditPostModal, setShowEditModal ] = useState(false)
    const [ editPostDetails, setEditPostDetails ] = useState({})

    return (
        <EditPostContext.Provider 
            value={{ 
                showEditPostModal, 
                setShowEditModal, 
                editPostDetails, 
                setEditPostDetails
            }}
        >
            {children}
        </EditPostContext.Provider>
    )
}

const useEditPostModal = () => useContext(EditPostContext)

export { EditPostContextProvider, useEditPostModal }