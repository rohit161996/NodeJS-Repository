import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { BASE_URL } from '../utils/constants';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      const user = await axios.get(BASE_URL + '/profile/view', {
        withCredentials: true
      });
      console.log("Body ",user.data);
      dispatch(addUser(user.data));
    }
    catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.log(err);
    }
  }

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
