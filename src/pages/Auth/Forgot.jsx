import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
const Forgot = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    newPassword: "",
    answer: "",
  });
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const res = await response.json();
      console.log(response);
      if (res.success) {
        toast.success(res.message);
        navigate("/login");
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
          <h1 className="p-2 text-center">Reset Form</h1>

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
              placeholder="New Password"
              name="newPassword"
              value={user.newPassword}
              onChange={handleInput}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control shadow-none"
              placeholder="what is your best friend?"
              name="answer"
              value={user.answer}
              onChange={handleInput}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Forgot;
