import { SearchBar } from './components/SearchBar'
import { productsData } from './data/productsData'
import "./styles/App.css"

function App() {
  return (
    <div className='app'>
      <main>
        <SearchBar data={productsData}/>
      </main>
    </div>
  )
}

export default App
