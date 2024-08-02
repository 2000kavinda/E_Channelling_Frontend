import './App.css'
import NavBar from './components/header/NavBar'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import HomePage from './pages/home/Home';

function App() {

  return (
    <div>
      <Router>
      <Routes>
        <Route exact path='/' element={<NavBar/>}/>
        <Route path='/' element={<HomePage />} />
      </Routes>

      </Router>
    </div>
  )
}

export default App
