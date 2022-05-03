import { useState, useContext, createContext } from "react"

const EditProfileContext = createContext(null)

const EditProfileContextProvider = ({children}) => {
    const [ showEditProfileModal, setShowEditProfileModal ] = useState(false)
    const [ editUserProfileDetails, setEditUserProfileDetails ] = useState({
        userName: "",
        userBackgroundPic: "",
        userProfilePic: "",
        userBio: "",
        userPortfolioLink: ""
    })

    return (
        <EditProfileContext.Provider 
            value={{ 
                showEditProfileModal, 
                setShowEditProfileModal, 
                editUserProfileDetails, 
                setEditUserProfileDetails
            }}
        >
            {children}
        </EditProfileContext.Provider>
    )
}

const useEditProfileModal = () => useContext(EditProfileContext)

export { EditProfileContextProvider, useEditProfileModal }