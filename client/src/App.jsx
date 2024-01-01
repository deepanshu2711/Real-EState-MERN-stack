
import {BrowserRouter ,Routes,Route} from "react-router-dom";
import Home from './pages/Home.jsx';
import SignIn from './pages/SignIn.jsx';
import About from './pages/About.jsx';
import Profile from './pages/Profile.jsx';
import SignUp from './pages/SignUp.jsx';
import Header from './pages/Header.jsx';
import PrivateRoute from "./components/PrivateRoute.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import UpdateListing from "./pages/updateListing.jsx";
import Listing from "./pages/listing.jsx";
import Search from "./pages/Search.jsx";




function App() {
  

  return (
    <BrowserRouter >
    <Header />
      <Routes>
        <Route path='/' element ={<Home />} />
        <Route path='/signin' element ={<SignIn />} />
        <Route path='/signup' element ={<SignUp />} />
        <Route element ={<PrivateRoute />}>
        <Route path='/profile' element ={<Profile />} />
        <Route path='/createListing' element ={<CreateListing />} />
        <Route path='/createListing' element ={<CreateListing />} />
        <Route path='/updateListing/:listingId' element ={<UpdateListing />} />

        </Route>
        <Route path='/about' element ={<About />} />
        <Route path='/listing/:listingId' element ={<Listing />} />
        <Route path='/search' element ={<Search />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
