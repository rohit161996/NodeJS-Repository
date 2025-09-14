import React from 'react'
import axios from "axios";
import { useState } from 'react';
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);
    const [showError, setShowError] = useState(false);

    const saveProfile = async () => {
        /* Clear the error before saving the profile */
        setError("");
        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                {
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    about,
                },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2000);
        }
        catch (err) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 1000);
            setError(err.response?.data);
        }
    }

    return (
        <div className="flex justify-center my-10">
            <div className="flex justify-center my-10 mx-10 card card-border bg-neutral w-96">
                {/* Edit Form */}
                <div className="card-body">
                    <h2 className="card-title justify-center">Edit Profile</h2>
                    <div>
                        {/* First Name */}
                        <div className="w-full max-w-xs my-4">
                            <label className="form-control w-full max-w-xs my-4">
                                <div className="label my-3">
                                    <span className="label-text">First Name :</span>
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
                            <label className="form-control ">
                                <div className="label my-3">
                                    <span className="label-text">Last Name :</span>
                                </div>
                                <input
                                    type="text"
                                    value={lastName}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </label>
                        </div>

                        {/* Photo URL */}
                        <div className="w-full max-w-xs my-4">
                            <label className="form-control ">
                                <div className="label my-3">
                                    <span className="label-text">Photo URL :</span>
                                </div>
                                <input
                                    type="text"
                                    value={photoUrl}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </label>
                        </div>

                        {/* Age */}
                        <div className="w-full max-w-xs my-4">
                            <label className="form-control ">
                                <div className="label my-3">
                                    <span className="label-text">Age :</span>
                                </div>
                                <input
                                    type="text"
                                    value={age}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </label>
                        </div>

                        {/* Gender */}
                        <div className="w-full max-w-xs my-4">
                            <label className="form-control ">
                                <div className="label my-3">
                                    <span className="label-text">Gender :</span>
                                </div>
                                {/* Dropdown menu */}
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </label>
                        </div>

                        {/* About */}
                        <div className="w-full max-w-xs my-4">
                            <label className="form-control ">
                                <div className="label my-3">
                                    <span className="label-text">About :</span>
                                </div>
                                {/* Textarea */}
                                <textarea
                                    value={about}
                                    className="textarea textarea-bordered w-full"
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </label>
                        </div>

                    </div>

                    {/* Error */}
                    {
                        error &&
                        <p className="text-red-500 text-sm">{error}</p>
                    }

                    {/* Save Profile Button */}
                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-primary cursor-pointer" onClick={saveProfile}>Save Profile</button>
                    </div>
                </div>
            </div>

            <div className='my-10'>
                {/* User Card */}
                <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
            </div>

            {showToast &&
                <div className="toast toast-top toast-start">
                    <div className="alert alert-success">
                        <span>Profile updated successfully</span>
                    </div>
                </div>
            }

            {showError &&
                <div className="toast toast-top toast-start">
                    <div className="alert alert-error">
                        <span>{error}</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default EditProfile
