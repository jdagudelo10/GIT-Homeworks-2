import { Routes, Route } from 'react-router-dom'
import { root } from "./Data/NodesData"
import './Styles/Menu.css'
import { Menu } from './Pages/Menu'
import { Home } from './Pages/Home'
import { Signatures } from './Pages/Signatures'
import { NewSignatures } from './Pages/NewSignatures'
import { Activate } from './Pages/Activate'
import { Account } from './Pages/Account'
import { About } from './Pages/About'

function App() {

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Menu root={root} />
      </aside>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/subjects" element={<Signatures />} />
          <Route path="/NewSubjects" element={<NewSignatures />} />
          <Route path="/activate-matricula" element={<Activate />} />
          <Route path="/support" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
