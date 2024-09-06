import './App.css'
// import NavBar from './components/header/NavBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/home/Home';
import DrAdmin from './pages/admin/DrAdmin';
import AddDoctor from './pages/admin/AddDoctor';
// import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSideBar from './pages/admin/AdminSideBar';
import AddSchedule from './pages/admin/AddSchedule';
import AddPatients from './pages/admin/AddPatients';
import DoctorList from './pages/admin/DoctorList';
import PatientsList from './pages/admin/PatientsList';
import ScheduleList from './pages/admin/ScheduleList';
import AddLabPerson from './pages/admin/AddLabPerson';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import SideBar from './pages/doctor/SideBar';
import NavBar from './components/header/NavBar';
import ForgotPassword from './pages/auth/ForgotPassword';
import Verification from './pages/auth/Verification';
import AddDoctorSchedule from './pages/doctor/AddDoctorSchedule';
import EditSchedule from './pages/doctor/EditSchedule';
import EditPatient from './pages/admin/EditPatient';
import EditDoctor from './pages/admin/EditDoctor';
import EditAdminSchedule from './pages/admin/EditAdminSchedule';
import EditLabPerson from './pages/admin/EditLabPerson';
import PatientDetailsPage from './pages/doctor/PatientDetailsPage';
import SideBarLabPerson from './pages/labPerson/SideBarLabPerson';
import MedicalDashboard from './pages/patients/PatientDashboard';
import PatientLabDashboard from './pages/patients/PatientLabDashboard';
import HomePage from './pages/home/HomePage';

function App() {

  return (
    <div>

      <Router>
        <Routes>

          <Route exact path='/' element={<HomePage />} />
          <Route path='/' element={<SignIn />} />
          <Route path='/DrAdmin' element={<DrAdmin />} />
          <Route path='/AddSchedule' element={<AddSchedule />} />
          <Route path='/AddDoctor' element={<AddDoctor />} />
          <Route path='/AddPatients' element={<AddPatients />} />
          <Route path='/DoctorList' element={<DoctorList />} />
          <Route path='/PatientsList' element={<PatientsList />} />
          <Route path='/ScheduleList' element={<ScheduleList />} />
          <Route path='/AdminSideBar' element={<AdminSideBar />} />
          <Route path='/AddLabPerson' element={<AddLabPerson />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/SideBar' element={<SideBar />} />
          <Route path='/NavBar' element={<NavBar />} />
          <Route path='/ForgotPassword' element={<ForgotPassword />} />
          <Route path='/Verification' element={<Verification />} />
          <Route path='/AddDoctorSchedule' element={<AddDoctorSchedule />} />
          <Route path='/EditSchedule' element={<EditSchedule />} />
          <Route path='/AddDoctor' element={<AddDoctor />} />
          <Route path='/EditPatient' element={<EditPatient />} />
          <Route path='/EditDoctor' element={<EditDoctor />} />
          <Route path='/EditLabPerson' element={<EditLabPerson />} />
          <Route path='/EditAdminSchedule' element={<EditAdminSchedule />} />
          <Route path='/PatientDetailsPage' element={<PatientDetailsPage />} />
          <Route path='/SideBarLabPerson' element={<SideBarLabPerson />} />
          <Route path='/MedicalDashboard' element={<MedicalDashboard />} />
          <Route path='/PatientLabDashboard' element={<PatientLabDashboard/>}/>

        </Routes>

      </Router>
    </div>
  )
}

export default App

