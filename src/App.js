import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './components/UserComponent/RegisterPageComponent/RegisterPage';
import UserDashBoard from './components/UserComponent/UserDashBoard/UserDashBoard';
import LoginPage from './components/UserComponent/LoginPageComponent/LoginPage';
import AddFlight from './components/AdminComponent/AddFlightComponent/AddFlightAdmin';
import AdminDashBoard from './components/AdminComponent/AdminDashBoard/flightDashboard';
import ViewBookings from './components/AdminComponent/viewBooking/ViewBookings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserDashBoard />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/add-flight' element={<AddFlight />} />
        <Route path='/dashboard' element={<AdminDashBoard />} />
        <Route path='/view-booking/:id' element={<ViewBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
