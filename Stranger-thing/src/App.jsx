import {  Routes, Route, } from 'react-router-dom';
import Home from './Components/Home';
import Posts from "./Components/Posts"
import Login from "./Components/Login"
import NavBar from "./Components/NavBar"
import Profile from "./Components/Profile"
import Register from "./Components/Register"


export default function App() {

  return (
    <>
      <div>
<NavBar/>

<Routes>
<Route path="/" element={ <Home />} />
<Route path="/Posts" element={  <Posts />} />
<Route path="/Profile" element={ <Profile />} />
<Route path="/Login" element={  <Login />} />
 <Route path="/Register" element={<Register />} />

</Routes>
      </div>
      
    </>
  )
}