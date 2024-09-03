import './App.css'
// import NavBar from './components/header/NavBar'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import HomePage from './pages/home/Home';
// import AddService from './pages/labPerson/AddService';
import SideBar from './pages/labPerson/SideBar';
// import ServiceList from './pages/labPerson/ServiceList';
// import LabAppointment from './pages/labPerson/LabAppointment';
import EditService from './pages/labPerson/EditService';


function App() {

  return (
    <div>
      <Router>
      <Routes>
        
        {/* <Route exact path='/' element={<AddService/>}/> */}
        {/* <Route exact path='/' element={<ServiceList/>}/> */}
        <Route path='/' element={<HomePage />} />
        <Route path='/LabAdmin' element={<SideBar/>}/>
        <Route path="/EditService" element={<EditService />} />
        {/* <Route path='/DrAdmin' element={<ServiceList/>}/> */}
      </Routes>

      </Router>
    </div>
  )
}

export default App
