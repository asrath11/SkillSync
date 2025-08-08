import React from 'react';
import { useAuth } from '@/context/authProvider';
import { Navigate } from 'react-router-dom';

function Protect({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className='text-center mt-10'>Loading...</div>; // or spinner
  }

  if (!user) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
}

export default Protect;
