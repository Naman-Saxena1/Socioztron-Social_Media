import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { 
  Navbar,
  Toast,
  EditPostModal
} from './components/index'
import {
  useEditModal
} from "./context/index"
import {
  Signup,
  Login,
  Home,
  Explore,
  Messages,
  Bookmarks,
  UserProfilePage
} from './pages/index'
import './App.css';

function App() {
  const { showEditModal } = useEditModal()

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/"         exact element={<Home/>} />
          <Route path="/login"          element={<Login/>} />
          <Route path="/signup"         element={<Signup/>} />
          <Route path="/explore"        element={<Explore/>} />
          <Route path="/messages"       element={<Messages/>} />
          <Route path="/bookmarks"      element={<Bookmarks/>} />
          <Route path="/profile"        element={<UserProfilePage/>} />
        </Routes>
        {
          showEditModal && (<EditPostModal/>)
        }
        <Toast position="bottom-right"/>
      </div>
    </Router>
  );
}

export default App;