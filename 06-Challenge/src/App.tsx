import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import "./Styles/login.css"
import { AuthContextProv } from './Contexts/AuthContextProv'
import Login from './Components/Login'
import ProtectRoutes from './Components/ProtectRoutes'
import Home from './Components/Home'
import BookSection from './Components/BookSection'
import Cajero from './Components/Cajero'
import './App.css'

function App() {
  return (
    <AuthContextProv>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>

          <Route element={<ProtectRoutes/>}>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/library' element={<BookSection/>}></Route>
            <Route path='/atm' element={<Cajero/>}></Route>
          </Route>

          <Route path='*' element={<Navigate to="/login"/>}/>
        </Routes>
      </BrowserRouter>
    </AuthContextProv>
  )
}

export default App
