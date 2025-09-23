import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection, removeConnection } from '../utils/connectionSlice';

const Connections = () => {
    const connection = useSelector((store) => store.connection);
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            dispatch(removeConnection());
            const res = await axios.get(
                BASE_URL + "/user/connections",
                { withCredentials: true }
            );
            dispatch(addConnection(res.data.data));
        }
        catch (err) {
            setError(err.message);
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 1000);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (connection.length == 0)
        return (
            <>
                <h1 className="flex justify-center text-2xl my-10 text-green-300">
                    No connections found!!!
                </h1>
            </>
        );

    return (
        <div className="text-center m-10">
            <h1 className="text-bold text-white text-5xl">
                Connections
            </h1>

            {connection.map((conn) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } = conn;
                return (
                    <div key={_id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
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
                    </div>
                )
            }
            )
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

export default Connections
