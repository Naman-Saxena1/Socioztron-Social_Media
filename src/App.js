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
  Messages
} from './pages/index'
import './App.css';

function App() {
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
        </Routes>
        <Toast position="bottom-right"/>
      </div>
    </Router>
  );
}

export default App;
