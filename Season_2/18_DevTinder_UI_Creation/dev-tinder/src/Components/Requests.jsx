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
            console.log("fetchRequests",res);
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
            <>
                <h1 className="flex justify-center text-2xl my-10 text-green-300">
                    No requests found!!!
                </h1>
            </>
        );

    return (
        <div className="text-center m-10">
            <h1 className="text-bold text-white text-5xl">
                Requests
            </h1>

            {requests.map((req) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } = req.fromUserId;
                return (
                    <div
                        key={_id}
                        className="flex m-4 p-4 rounded-lg bg-base-300 w-4/5 mx-auto"
                    >
                        <div>
                            <img
                                src={photoUrl}
                                alt="photo"
                                className="w-32 h-32 object-cover rounded-full mx-auto"
                            />
                        </div>
                        <div className="text-left mx-">
                            <h2 className="text-lg font-bold  mx-2">
                                {firstName + " " + lastName}
                            </h2>
                            {age && gender &&
                                <p className="text-sm text-gray-600 mx-2">
                                    {age + ", " + gender}
                                </p>
                            }
                            <p className="text-sm text-gray-600 mx-2">
                                {about}
                            </p>
                        </div>
                        <div>
                            <button
                                className="btn btn-primary mx-2"
                                onClick={() => reviewRequest("rejected", req._id)}
                            >
                                Reject
                            </button>
                            <button
                                className="btn btn-secondary mx-2"
                                onClick={() => reviewRequest("accepted", req._id)}
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                )
            })
            }

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

export default Requests
