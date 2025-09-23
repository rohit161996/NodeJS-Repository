import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';
import { useDispatch } from 'react-redux';

const UserCard = ({ user }) => {

    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            axios.post(
                BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                { withCredentials: true }
            );

            dispatch(removeUserFromFeed(userId));
        }
        catch (err) {
            setError(err.message);
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 1000);
        }
    }

    return (
        <div className="card bg-base-300 w-96 shadow-sm">

            {/* Profile Image */}
            <div className="relative">
                <img
                    src={photoUrl || "/default-avatar.png"}
                    alt={`${firstName} ${lastName}`}
                    className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full p-4">
                    <h2 className="text-xl font-bold text-white">
                        {firstName} {lastName}
                    </h2>
                    {age && gender && (
                        <p className="text-sm text-gray-200">
                            {age}, {gender}
                        </p>
                    )}
                </div>
            </div>

            {/* Card Body */}
            <div className="p-4">
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    {about || "No description available."}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-between gap-3">
                    <button
                        className="flex-1 py-2 px-4 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition cursor-pointer"
                        onClick={() => handleSendRequest("ignored",_id)}
                    >
                        Ignore
                    </button>
                    <button
                        className="flex-1 py-2 px-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-medium transition cursor-pointer"
                        onClick={() => handleSendRequest("interested", _id)}
                    >
                        Interested
                    </button>
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

export default UserCard
