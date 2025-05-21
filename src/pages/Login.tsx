
import React from 'react';
import { LoginCard } from '@/components/auth/login-card';
import { LoginHeader } from '@/components/auth/login-header';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-light p-4">
      <div className="w-full max-w-md">
        <LoginHeader />
        <LoginCard />
      </div>
    </div>
  );
};

export default Login;
