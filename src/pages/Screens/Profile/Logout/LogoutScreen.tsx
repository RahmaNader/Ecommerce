import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@services/useAuth';

const LogoutScreen: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    navigate('/authentication');
  }, [logout, navigate]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
    </div>
  );
};

export default LogoutScreen;
