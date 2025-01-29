import  { useContext, useEffect } from 'react'
import  { AuthContextProvider } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  useEffect(()=>{
    console.log("inside dashboard screen");
  },[])
  
    const { logout }:any = useContext(AuthContextProvider);
    const navigate = useNavigate();
   
    const logOutAction = () =>{
      console.log('logout called')
        console.log('logout');
        localStorage.removeItem('user');
        logout();
        navigate('/login');
    }
  return (
    <div>
      Dashboard  Here
      <a onClick={logOutAction}>Logout</a>
    </div>
  )
}

export default Dashboard
