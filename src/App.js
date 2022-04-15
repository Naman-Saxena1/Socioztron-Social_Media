import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { 
  Navbar,
  Toast
} from './components/index'
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
import { useEffect } from "react";

function App() {

  useEffect(()=>{
    let userAuthToken = localStorage.getItem("socioztron-user-token")

    if(userAuthToken)
    {
      
    }
  },[])

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
        <Toast position="bottom-right"/>
      </div>
    </Router>
  );
}

export default App;
