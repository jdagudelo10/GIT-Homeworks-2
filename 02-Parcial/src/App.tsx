import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { RouteProtect} from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';
import { Navbar } from './components/Navbar';
import { Home } from './pages/MainPage';
import { TreeProvider } from './contexts/TreeContext';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <TreeProvider>
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
                <Route path="*" element={<h2 className="not-found">404 - No tienes permiso o la página no existe</h2>} />
              </Routes>
            </div>
          </TreeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;