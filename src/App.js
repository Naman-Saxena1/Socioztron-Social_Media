import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { 
  Navbar,
  Toast,
  EditPostModal,
  EditProfileModal,
  CreateChatModal
} from './components/index'
import {
  useEditPostModal,
  useEditProfileModal,
  useChatModal
} from "./context/index"
import {
  Signup,
  Login,
  Home,
  Explore,
  Chats,
  Bookmarks,
  UserProfilePage
} from './pages/index'
import './App.css';

function App() {
  const { showEditPostModal } = useEditPostModal()
  const { showEditProfileModal } = useEditProfileModal()
  const { isCreatingNewChatModal } = useChatModal()

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/"         exact element={<Home/>} />
          <Route path="/login"          element={<Login/>} />
          <Route path="/signup"         element={<Signup/>} />
          <Route path="/explore"        element={<Explore/>} />
          <Route path="/chats"          element={<Chats/>} />
          <Route path="/bookmarks"      element={<Bookmarks/>} />
          <Route path="/profile"        element={<UserProfilePage/>} />
          <Route path="/profile/:other_user_profile"        element={<UserProfilePage/>} />
        </Routes>
        {
          showEditPostModal && (<EditPostModal/>)
        }
        {
          showEditProfileModal && (<EditProfileModal/>)
        }
        {
          isCreatingNewChatModal && (<CreateChatModal/>)
        }
        <Toast position="bottom-right"/>
      </div>
    </Router>
  );
}

export default App;