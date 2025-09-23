import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorMessage] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
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

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      return navigate("/profile");
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
          <h2 className="card-title justify-center">
            {
              isLoginForm ?
                "Login" :
                "Sign Up"
            }
          </h2>
          <div>

            {/* Show the First Name and Last Name on the Sign Up Page Only */}
            {
              !isLoginForm &&
              <>
                {/* First Name */}
                < div className="w-full max-w-xs my-4">
                  <label className="form-control w-full max-w-xs my-4">
                    <div className="label">
                      <span className="label-text">First Name</span>
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                </div>

                {/* Last Name */}
                <div className="w-full max-w-xs my-4">
                  <label className="form-control w-full max-w-xs my-4">
                    <div className="label">
                      <span className="label-text">Last Name</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                </div>
              </>
            }

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

          <p className="cursor-pointer" onClick={() => setIsLoginForm(!isLoginForm)}>
            {isLoginForm ? "New User? Sign Up" : "Existing User? Login"}
          </p>

          {isLoginForm &&
            <div>
              {/* Login Button */}
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary cursor-pointer" onClick={handleLogin}>Login</button>
              </div>
            </div>
          }

          {!isLoginForm &&
            <div>
              {/* Sign Up Button */}
              < div className="card-actions justify-center m-2">
                <button className="btn btn-secondary cursor-pointer" onClick={handleSignUp}>Sign Up</button>
              </div>
            </div>
          }
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
    </div >
  )
}

export default Login
