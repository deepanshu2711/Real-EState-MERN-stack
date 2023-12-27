
import {BrowserRouter ,Routes,Route} from "react-router-dom";
import Home from './pages/Home.jsx';
import SignIn from './pages/SignIn.jsx';
import About from './pages/About.jsx';
import Profile from './pages/Profile.jsx';
import SignUp from './pages/SignUp.jsx';
import Header from './pages/Header.jsx';



function App() {
  

  return (
    <BrowserRouter >
    <Header />
      <Routes>
        <Route path='/' element ={<Home />} />
        <Route path='/signin' element ={<SignIn />} />
        <Route path='/signup' element ={<SignUp />} />
        <Route path='/profile' element ={<Profile />} />
        <Route path='/about' element ={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
