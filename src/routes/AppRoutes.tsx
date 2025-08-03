// src/routes/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/loginPage';
import RegistrationPage from '../pages/registrationPage';
import HomePage from '../pages/homePage';
import CreateProductPage from '../pages/createProductPage';
// import NotFound from '../pages/NotFound'; // опционально

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="/" element={<HomePage />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
