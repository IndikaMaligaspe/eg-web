import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const PrivateRoute: React.FC = () => {
    const {authenticated, getToken  } = useContext (AuthContext)
    if(authenticated || getToken() != null)
      return  <Outlet />
    return <Navigate to="/signin" />

  }

export default PrivateRoute;