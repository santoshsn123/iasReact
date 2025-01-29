import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { AuthContextProvider } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login }: any = useContext(AuthContextProvider);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  /**
   * Hide Error message after 2000ms
   */
  useEffect(() => {
    setTimeout(() => setErrorMessage(''), 2000)
  }, [errorMessage]);


  const submitLogin = async (e: any) => {
    e.preventDefault();
    try {
      const apiResponse = await axios.post(`${import.meta.env.VITE_API_URL}admin/login`, { email, password });
      localStorage.setItem('user', JSON.stringify(apiResponse.data));
      login();
      setTimeout(() => { navigate('/admin'); }, 0)
    }
    catch (err: any) {
      setErrorMessage(err.response.data.message)
    }
  }
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card" style={{ width: '100%', maxWidth: 400 }}>
        <div className="card-body">
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <h5 className="card-title text-center mb-4">Login</h5>
          <form onSubmit={submitLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="email" placeholder="Enter your email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="password" placeholder="Enter your password" required />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button type="submit" className="btn btn-primary" >Login</button>
              <a href="#" className="small">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Login
