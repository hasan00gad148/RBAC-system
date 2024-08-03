import React, { useEffect, ReactNode } from 'react';
import { useAppSelector } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

interface ProtectedProps {
  authenticated: boolean;
  role: string;
  children: ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ authenticated, role,children }) => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLoggedIn && authenticated ) {
      navigate("/login");
    } else if (user.isLoggedIn && !authenticated || user.Role.roleName !== role) {
      navigate("/home");
    }
  }, [user, navigate, authenticated, role]);

  return <>{children}</>;
};

export default Protected;
