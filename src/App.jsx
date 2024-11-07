import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import AboutPage from './Pages/AboutPage'
import Categories from './Pages/Categories'
import CreatePostPage from './Pages/CreatePostPage'
import Dashboard from './Pages/Dashboard'
import PostPage from './Pages/PostPage'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import UserDishesPage from './Pages/UserDishesPage'
import ViewPage from './Pages/ViewPage'
import UpdatePost from './Pages/UpdatePost'
import ViewCategory from './Pages/ViewCategory'
import SearchPage from './Pages/SearchPage'
import { tokenAuthenticationContext } from './Context API/TokenAuth'
import { useContext } from 'react'



function App() {
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthenticationContext)
  return (
    <>
    <Header/>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/aboutpage' element={<AboutPage/>}/>
    <Route path='/sign-in' element={<SignIn/>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
    <Route path='/categories' element={<Categories/>}/>
    <Route path='/view-categories/:category' element={isAuthorized?<ViewCategory/>:<SignIn/>}/>
    <Route path='/createpost' element={isAuthorized?<CreatePostPage/>:<SignIn/>}/>
    <Route path='/dashboard' element={isAuthorized?<Dashboard/>:<SignIn/>}/>
    <Route path='/postpage' element={isAuthorized?<PostPage/>:<SignIn/>}/>
    <Route path='/userdishespage' element={isAuthorized?<UserDishesPage/>:<SignIn/>}/>
    <Route path='/view/:pId' element={isAuthorized?<ViewPage/>:<SignIn/>}/>
    <Route path='/update-post/:pId' element={isAuthorized?<UpdatePost/>:<SignIn/>}/>
    <Route path='/search' element={isAuthorized?<SearchPage/>:<SignIn/>}/>
    <Route path='/*' element={<Navigate to={'/'}/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App