import React from 'react';
import { LoginContainer } from '../features/auth/index';
import { Header } from '../shared/ui/header/Header';

const LoginPage = () => {
  return (
    <div className="login-page">
      <Header />
      <LoginContainer />
    </div>
  );
};

export default LoginPage;
