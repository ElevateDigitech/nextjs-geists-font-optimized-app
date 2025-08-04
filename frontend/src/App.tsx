import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EventDetailPage from './pages/EventDetailPage';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/events/:id" element={<EventDetailPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      {/* Add more routes for profile, admin panel */}
    </Routes>
  );
};

export default App;
