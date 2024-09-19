import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import Signout from './pages/auth/Signout';
import MainDashboard from './pages/home/MainDashboard';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/sigout" element={<Signout />}/>
        <Route path="/" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<MainDashboard />}/>
        </Route>

      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
