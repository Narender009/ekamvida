// Import necessary modules
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SchedulePage from './components/SchedulePage';
import ServicePage from './components/ServicePage'; // Adjust the path as needed
import BookingForm from './components/BookingForm';
import BookingSummary from './components/BookingSummary';
import BookSummary from './components/BookSummary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import PrivateClass from './components/PrivateClass';
import Schedule from './components/Schedule';
import Price from './components/Price';
import Contactus from './components/Contactus';
import Faqs from './components/Faqs';
import Events from './components/Events';
import Blog from './components/Blog';
import BookClasses from './components/BookClasses';
import ConfirmBooking from './components/ConfirmBooking';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/reset-password';
import Profile from './components/Profile';
import './index.css';
import ChatQueryForm from './components/ChatQueryForm';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import AccountPage from './components/AccountPage';
import BookingManagement from './components/BookingManagement';
import MyBookings from './components/MyBookings';




// Define your routes
const App = () => {
  const handleSubmit = (formData) => {
    // Handle form submission logic here, e.g., send data to backend
    console.log('Form data submitted:', formData);
  };

  return (
    <Router>
      {/* <Navbar />  */}
      <Routes>
        {/* Other routes can be added here */}
    
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login/>} /> */}
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uid/:token"  element={<ResetPassword />} />
        <Route path="/ServicePage" element={<ServicePage />} />
        <Route path="/schedule/:serviceName" element={<SchedulePage />} />
        <Route path="/booking/:serviceName" element={<BookingForm onSubmit={handleSubmit} />} />
        <Route path="/bookingform/:serviceName" element={<BookingSummary />} />
        <Route path="/privateclass" element={<PrivateClass />} />
        <Route path="/Schedule" element={<Schedule />} />
        <Route path="/price" element={<Price />} />
        <Route path="/Contactus" element={<Contactus />} />
        <Route path="/Faqs" element={<Faqs />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/book" element={<BookClasses />} />
        <Route path="/confirm-booking" element={<ConfirmBooking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ChatQueryForm" element={<ChatQueryForm />} />
        <Route path="/Header" element={<Header />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/ForgotPasswordPage" element={<ForgotPasswordPage />} />
        <Route path="/ResetPasswordPage/:token" element={<ResetPasswordPage />} />
        <Route path="/AccountPage" element={<AccountPage />} />
        <Route path="/BookSummary" element={<BookSummary />} />
        <Route path="/BookingManagement" element={<BookingManagement />} />
        <Route path="/MyBookings" element={<MyBookings />} />
        

       
        
        {/* Add more routes as needed */}
       
      </Routes>
      
    </Router>
  );
};

export default App;
