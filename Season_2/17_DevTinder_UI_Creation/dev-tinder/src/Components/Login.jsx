import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [emailId, setEmailId] = useState("rohit.ramchandani16@gmail.com");
  const [password, setPassword] = useState("Ramch@1234");
  const [error, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );

      console.log("Login", res.data);
      dispatch(addUser(res.data));
      navigate("/");
    }
    catch (err) {
      setErrorMessage(err?.response?.data || "Something went wrong");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 1000);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-neutral w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            {/* Email Id */}
            <div className="w-full max-w-xs my-4">
              <label className="form-control w-full max-w-xs my-4">
                <div className="label">
                  <span className="label-text">Email ID</span>
                </div>
                <input
                  type="text"
                  value={emailId}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>
            </div>

            {/* Password */}
            <div className="w-full max-w-xs my-4">
              <label className="form-control ">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="password"
                  value={password}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
          </div>

          <p className='text-red-500'>
            {error}
          </p>

          {/* Login Button */}
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary cursor-pointer" onClick={handleLogin}>Login</button>
          </div>

        </div>
      </div>


      {
        showError &&
        <div className="toast toast-top toast-start">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      }
    </div>
  )
}

export default Login
