import { useState, useContext, createContext } from "react"

const EditPostContext = createContext(null)

const EditPostContextProvider = ({children}) => {
    const [ showEditModal, setShowEditModal ] = useState(false)
    const [ editPostDetails, setEditPostDetails ] = useState({})

    return (
        <EditPostContext.Provider 
            value={{ 
                showEditModal, 
                setShowEditModal, 
                editPostDetails, 
                setEditPostDetails
            }}
        >
            {children}
        </EditPostContext.Provider>
    )
}

const useEditModal = () => useContext(EditPostContext)

export { EditPostContextProvider, useEditModal }