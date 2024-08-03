import React, { useEffect, ReactNode } from 'react';
import { useAppSelector } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

interface ProtectedProps {
  authenticated: boolean;
  roles: string[];
  children: ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ authenticated, roles,children }) => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if ((!user.isLoggedIn && authenticated)) {
      navigate("/login");
    }
    else if (!roles.includes(user.Role.roleName)){
      navigate("/home");
    } 
    else if ((user.isLoggedIn && !authenticated) ) {
      navigate("/home");
    }
  }, [user, navigate, authenticated, roles]);

  return <>{children}</>;
};

export default Protected;
