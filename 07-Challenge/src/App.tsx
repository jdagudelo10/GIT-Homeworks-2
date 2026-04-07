import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProv } from './Context/AuthContext'
import { LoginPage } from './Pages/Login';
import { RegisterPage } from './Pages/Register';
import { RouteProtect } from './Components/RouteProtect';
import { PublicRoute } from './Components/PublicRoute';
import { Navbar } from './Components/NavBar';
import { Home } from './Pages/MainPage';
import { TaskProv } from './Context/TaskContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProv>
        <TaskProv>
          <div className='App'>
            <Navbar />

            <Routes>
              <Route element={<PublicRoute />}>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/register' element={<RegisterPage />}></Route>
              </Route>
              
              <Route element={<RouteProtect />}>
                <Route path='/home' element={<Home />}></Route>
              </Route>

              <Route path='/' element={<Navigate to='/login' replace />}></Route>
              <Route path="*" element={<h2>404 - No tienes permiso o la página no existe</h2>} />
            </Routes>
          </div>
        </TaskProv>
      </AuthProv>
    </BrowserRouter>
  );
}

export default App;