import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {

    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(
                BASE_URL + "/logout",
                {},
                { withCredentials: true }
            );
            dispatch(removeUser());
            return navigate("/login");
        }
        catch (err) {
            /* Error logic : redirect to error page */
            console.log("Error: " + err.message);
            dispatch(removeUser());
            navigate("/login");
        }
    }

    return (
        <div>
            <div>
                <div className="navbar bg-neutral shadow-sm">
                    <div className="flex-1">
                        <Link to={"/"} className="btn btn-ghost text-xl"> Dev Tinder 😈</Link>
                    </div>

                    {user &&
                        <div className="flex gap-2">
                            <div className="dropdown dropdown-end mx-5 flex">
                                <div className='items-center'>
                                    Welcome {user.firstName} {user.lastName} !!!
                                </div>

                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="User Photo"
                                            src={user.photoUrl} />
                                    </div>
                                </div>

                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <li>
                                        <Link to="/profile" className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/connections" className="justify-between">
                                            Connections
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/requests" className="justify-between">
                                            Requests
                                        </Link>
                                    </li>
                                    <li>
                                        <Link>
                                            Settings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={handleLogout}>
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default NavBar
