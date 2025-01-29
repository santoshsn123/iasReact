import { createContext, useContext, useState } from 'react'

export const AuthContextProvider: any = createContext({ isAuthenticated: false, login: () => { }, logout: () => { } });
// {isAuthenticated:boolean,login:()=>void,logout:()=>void,} 
const AuthContext = ({ children }: { children: React.ReactNode }) => {
  console.log('checking it here',localStorage.getItem('user'));
  
 const localData = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user') || ''):{}
  const [isAuthenticated, setIsAuthenticated] = useState(localData.token?true:false);

  const login = () => {
    setIsAuthenticated(true);
  } // Login function
  const logout = () => setIsAuthenticated(false); // Logout function

  return (
    <AuthContextProvider.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContextProvider.Provider>
  )
}

export default AuthContext;

export function useAuth() {
  return useContext(AuthContextProvider);
}