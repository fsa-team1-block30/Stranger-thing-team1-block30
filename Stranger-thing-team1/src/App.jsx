import {  Routes, Route, } from 'react-router-dom';
import Home from "./component/Home"
import Posts from "./component/Posts"
import Login from "./component/Login"
import NavBar from "./component/NavBar"
import Profile from "./component/Profile"
import Register from "./component/Register"
import NewListingForm from "./component/NewListingForm"


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
 <Route path="/NewListing" element={<NewListingForm/>}/>

</Routes>
      </div>
      
    </>
  )
}


