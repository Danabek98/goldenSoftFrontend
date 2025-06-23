import React from 'react';
import { RegistrationContainer } from '../features/auth/index';
import { useRegister } from '../features/auth/hooks/useRegister';

const LoginPage = () => {
  const { values, errors, validateForm } = useRegister();
  return (
    <div className="login-page">
      <RegistrationContainer />
    </div>
  );
};

export default LoginPage;
