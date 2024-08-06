import {createContext, useContext, useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../FirebaseConfig.js";


const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthenticated(!!user);
      setIsLoading(false);
      if (user) {
        user.getIdToken().then((token) => {
          setAccessToken(token);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const value = {user, isAuthenticated, isLoading, accessToken};

  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  );
}

export {AuthContext, AuthProvider};
