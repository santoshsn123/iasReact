import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContextProvider } from "./AuthContext";


const AdminMenu = () => {
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
        <div className="sidebar bg-dark text-white p-3" style={{ width: 250, height: '100vh' }}>
            <h4 className="text-center">Admin Panel</h4>
            <ul className="nav flex-column mt-4">
                <li className="nav-item">
                    {/* <a className="nav-link text-white" href="#">
                        <i className="bi bi-house-door" /> Dashboard
                    </a> */}
                    <Link  className="nav-link text-white" to="/admin">Dashboard</Link>
                </li>
                <li className="nav-item">
                    {/* <a className="nav-link text-white" href="#">
                        <i className="bi bi-gear" /> Settings
                    </a> */}
                    <Link  className="nav-link text-white" to="tests">Tests</Link>
                </li>
                <li className="nav-item">
                <Link  className="nav-link text-white" to="test-series">Test Series</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white" href="#">
                        <i className="bi bi-box" /> Products
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white" href="#">
                        <i className="bi bi-envelope" /> Messages
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white" href="#">
                        <i className="bi bi-bar-chart" /> Reports
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white" href="#" onClick={logOutAction}>
                        <i className="bi bi-power" /> Logout
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default AdminMenu
