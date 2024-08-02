import React, { useEffect, ReactNode } from 'react';
import { useAppSelector } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

interface ProtectedProps {
  authenticated: boolean;
  children: ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ authenticated, children }) => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && authenticated) {
      navigate("/login");
    } else if (user && !authenticated) {
      navigate("/blogs");
    }
  }, [user, navigate, authenticated]);

  return <>{children}</>;
};

export default Protected;
