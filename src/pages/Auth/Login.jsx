import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [auth, setAuth] = useAuth();
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res = await response.json();

      if (res.success) {
        toast.success(res.message);
        setAuth({ ...auth, user: res.user, token: res.token });
        localStorage.setItem("auth", JSON.stringify(res));
        navigate(location.state || "/");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
    }
  };
  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="p-2 text-center">Login Form</h1>

          <div className="mb-3">
            <input
              type="email"
              className="form-control shadow-none"
              placeholder="Email Id"
              name="email"
              value={user.email}
              onChange={handleInput}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control shadow-none"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleInput}
              required
            />
          </div>
          <div className="mb-3">
          <a type="submit" className="btn text-primary w-100" onClick={()=>navigate('/forgot-password')}>
            Forgot Password?
          </a>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
