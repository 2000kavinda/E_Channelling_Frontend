import './App.css'
import NavBar from './components/header/NavBar'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import HomePage from './pages/home/Home';
import DrAdmin from './pages/admin/DrAdmin';
import ImageUpload from './components/admin/ImageUpload';


function App() {

  return (
    <div>
      <Router>
      <Routes>
        
        <Route exact path='/' element={<ImageUpload/>}/>
        <Route path='/' element={<HomePage />} />
        <Route path='/DrAdmin' element={<DrAdmin/>}/>
      </Routes>

      </Router>
    </div>
  )
}

export default App
