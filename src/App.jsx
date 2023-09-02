import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PageHome from './pages/PageHome';
import PageLogin from './pages/PageLogin';
import PageRegister from './pages/PageRegister';
import PageMyListing from './pages/PageMyListing';
import PageCreateListing from './pages/PageCreateListing';
import PageEditListing from './pages/PageEditListing';
import PageListingDetail from './pages/PageListingDetail';
import PageManageBooking from './pages/PageManageBooking';

function App () {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PageHome />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/register" element={<PageRegister />} />

        <Route path="/mylistings" element={<PageMyListing />} />
        <Route path="/mylistings/create" element={<PageCreateListing />} />
        <Route path="/mylistings/edit/:id" element={<PageEditListing />} />

        <Route path="/listings/:id" element={<PageListingDetail />} />
        <Route path="/bookings" element={<PageManageBooking />} />
      </Routes>
    </Router>
  );
}

export default App;
