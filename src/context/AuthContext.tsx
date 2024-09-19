import { createContext, ReactNode, useEffect, useState } from "react";

type props = {
    children?: ReactNode;
}

type IAuthContext = {
    authenticated: boolean;
    authToken: string;
    setAuthenticated: (newState: boolean) => void;
    storeToken: (token: string) => void;
    getToken: () => string | unknown;
}

const initialValue = {
  authenticated: false,
  authToken: '',
  setAuthenticated: () => {},
  storeToken: () => {},
  getToken: () => '',
}

 const AuthContext = createContext<IAuthContext>(initialValue);

 const AuthProvider = ({ children }: props) => {  

  const [authenticated, setAuthenticated ] = useState( initialValue.authenticated);
  const [authToken, setAuthToken]  = useState( initialValue.authToken);

  useEffect(()=>{
    let token = getToken();

    if(token && token != null && token.length > 0)
      setAuthenticated(true);
  },[])

  const storeToken = (token: string) =>{    
    if(token.length > 0) {
        localStorage.setItem("auth-token", token);
        setAuthToken(token)
      }
  }
  

  const getToken = () =>{
      let token = localStorage.getItem("auth-token");
      return token;
  }
  return (
    <AuthContext.Provider value={{authenticated, authToken, setAuthenticated, storeToken, getToken}} >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider}