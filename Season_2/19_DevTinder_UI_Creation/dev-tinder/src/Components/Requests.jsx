import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const requests = useSelector((store) => store.request);
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try {
            await axios.post(
                BASE_URL + "/request/review/" + status + "/" + _id,
                {},
                { withCredentials: true }
            );
            dispatch(removeRequest(_id));
        }
        catch (err) {
            setError(err.message);
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 1000);
        }
    };

    const fetchRequests = async () => {
        try {
            const res = await axios.get(
                BASE_URL + "/user/requests/received",
                { withCredentials: true }
            );
            console.log("fetchRequests", res);
            dispatch(addRequest(res.data.data));
        }
        catch (err) {
            setError(err.message);
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 1000);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);


    if (requests.length == 0)
        return (
            <div>
                <h1 className="flex justify-center text-2xl my-10 text-green-300">
                    No requests found!!!
                </h1>
            </div>
        );

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <h1 className="font-extrabold text-white text-5xl mb-10 text-center drop-shadow-lg">
                Requests
            </h1>

            {requests.map((req) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } = req.fromUserId;
                return (
                    <div
                        key={_id}
                        className="flex items-center justify-between m-6 p-6 rounded-2xl bg-base-200 shadow-lg hover:shadow-xl transition duration-300 w-full"
                    >
                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                            <img
                                src={photoUrl}
                                alt="photo"
                                className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-md"
                            />
                        </div>

                        {/* User Details */}
                        <div className="flex-1 text-left mx-6">
                            <h2 className="text-xl font-bold text-white">
                                {firstName + " " + lastName}
                            </h2>
                            {age && gender && (
                                <p className="text-sm text-gray-400 mt-1">
                                    {age + " years, " + gender}
                                </p>
                            )}
                            <p className="text-sm text-gray-300 mt-2 line-clamp-2">{about}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                className="btn btn-error px-5 py-2 rounded-lg shadow-md hover:scale-105 transition"
                                onClick={() => reviewRequest("rejected", req._id)}
                            >
                                Reject
                            </button>
                            <button
                                className="btn btn-success px-5 py-2 rounded-lg shadow-md hover:scale-105 transition"
                                onClick={() => reviewRequest("accepted", req._id)}
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                );
            })}

            {/* Toast Notification */}
            {showError && (
                <div className="toast toast-top toast-start">
                    <div className="alert alert-error shadow-lg">
                        <span>{error}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Requests
